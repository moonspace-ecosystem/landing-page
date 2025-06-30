// Form data interface
export interface FormData {
  email: string;
  company: string;
  role: string;
  usecase: string;
  investment: string;
  transactionHash: string;
  donationAmount: string;
  transactionScreenshot: File | null;
}

// Form submission request interface
export interface FormSubmissionRequest {
  formUrl: string;
  emailEntry: string;
  companyEntry: string;
  roleEntry: string;
  usecaseEntry: string;
  investmentEntry: string;
  transactionEntry: string;
  donationEntry: string;
  formData: FormData;
}

// Form submission response interface
export interface FormSubmissionResponse {
  success: boolean;
  error?: string;
}
