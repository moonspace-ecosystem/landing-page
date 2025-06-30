import { Effect } from 'effect';
import { FormData, FormSubmissionRequest, FormSubmissionResponse } from '../types';

// Error types
export class FormValidationError extends Error {
  readonly _tag = 'FormValidationError';
  constructor(message: string) {
    super(message);
    this.name = 'FormValidationError';
  }
}

export class NetworkError extends Error {
  readonly _tag = 'NetworkError';
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Validate form data
export const validateFormData = (data: FormData): Effect.Effect<never, FormValidationError, FormData> => {
  if (!data.email) {
    return Effect.fail(new FormValidationError('Email is required'));
  }
  
  // Add more validation as needed
  
  return Effect.succeed(data);
};

// Submit form data to Google Forms
export const submitFormData = (
  request: FormSubmissionRequest
): Effect.Effect<never, NetworkError | FormValidationError, FormSubmissionResponse> => {
  return Effect.gen(function* (_) {
    // First validate the form data
    const validData = yield* _(validateFormData(request.formData));
    
    try {
      // Construct form data for submission
      const formBody = new URLSearchParams();
      
      // Core user information fields
      formBody.append(request.emailEntry, validData.email);
      formBody.append(request.companyEntry, validData.company);
      formBody.append(request.roleEntry, validData.role);
      formBody.append(request.usecaseEntry, validData.usecase);
      formBody.append(request.investmentEntry, validData.investment);
      
      // Crypto donation tracking fields (optional)
      if (validData.transactionHash) {
        formBody.append(request.transactionEntry, validData.transactionHash);
      }
      if (validData.donationAmount) {
        formBody.append(request.donationEntry, validData.donationAmount);
      }

      // Submit to Google Forms using configured endpoint
      return yield* _(Effect.tryPromise({
        try: async () => {
          const response = await fetch(request.formUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Google Forms cross-origin requests
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody
          });
          
          // Due to no-cors mode, we can't actually read the response
          // So we'll just assume success if no error is thrown
          return { success: true };
        },
        catch: (error) => new NetworkError(`Form submission failed: ${String(error)}`)
      }));
    } catch (error) {
      return yield* _(Effect.fail(new NetworkError(`Unexpected error: ${String(error)}`)));
    }
  });
};

// Handle file upload
export const handleFileUpload = (
  file: File | undefined
): Effect.Effect<never, FormValidationError, File | null> => {
  return Effect.gen(function* (_) {
    if (!file) {
      return null;
    }

    // Validate file type and size
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(file.type)) {
      return yield* _(Effect.fail(new FormValidationError('Please upload only PNG or JPEG images')));
    }
    
    if (file.size > maxSize) {
      return yield* _(Effect.fail(new FormValidationError('File size must be less than 5MB')));
    }
    
    return file;
  });
};
