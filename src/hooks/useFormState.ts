import { useState } from 'react';
import { Effect, Exit } from 'effect';
import { FormData, FormSubmissionRequest, FormSubmissionResponse } from '../types';
import { submitFormData, handleFileUpload, FormValidationError, NetworkError } from '../effects/formEffects';
import { AppConfig } from '../config/appConfig';

// Initial form data
const initialFormData: FormData = {
  email: '',
  company: '',
  role: '',
  usecase: '',
  investment: '',
  transactionHash: '',
  donationAmount: '',
  transactionScreenshot: null
};

// Hook return type
interface UseFormStateReturn {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  isSubmitting: boolean;
  submitted: boolean;
  submitError: string | null;
  handleSubmit: () => void;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Form state hook
export const useFormState = (config: AppConfig): UseFormStateReturn => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const request: FormSubmissionRequest = {
      formUrl: config.GOOGLE_FORM_URL,
      emailEntry: config.GOOGLE_FORM_EMAIL_ENTRY,
      companyEntry: config.GOOGLE_FORM_COMPANY_ENTRY,
      roleEntry: config.GOOGLE_FORM_ROLE_ENTRY,
      usecaseEntry: config.GOOGLE_FORM_USECASE_ENTRY,
      investmentEntry: config.GOOGLE_FORM_INVESTMENT_ENTRY,
      transactionEntry: config.GOOGLE_FORM_TRANSACTION_ENTRY,
      donationEntry: config.GOOGLE_FORM_DONATION_ENTRY,
      formData
    };

    // Run the effect
    Effect.runPromise(submitFormData(request))
      .then((response) => {
        setSubmitted(true);
        
        // Optional: Track successful submission for analytics
        if (window.gtag) {
          window.gtag('event', 'form_submit', {
            event_category: 'engagement',
            event_label: 'early_access_form'
          });
        }
      })
      .catch((error) => {
        if (error instanceof FormValidationError || error instanceof NetworkError) {
          setSubmitError(error.message);
        } else {
          setSubmitError('An unexpected error occurred');
          console.error('Form submission error:', error);
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      Effect.runPromise(handleFileUpload(file))
        .then((validatedFile) => {
          if (validatedFile) {
            setFormData(prev => ({ ...prev, transactionScreenshot: validatedFile }));
          }
        })
        .catch((error) => {
          if (error instanceof FormValidationError) {
            alert(error.message);
          } else {
            alert('Failed to process file');
            console.error('File processing error:', error);
          }
        });
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    submitted,
    submitError,
    handleSubmit,
    handleFileChange
  };
};
