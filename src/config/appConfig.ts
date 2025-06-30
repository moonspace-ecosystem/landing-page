// App configuration with Environment variables support
import { Effect } from 'effect';

// Configuration schema
export interface AppConfig {
  // Google Form configuration
  GOOGLE_FORM_URL: string;
  GOOGLE_FORM_EMAIL_ENTRY: string;
  GOOGLE_FORM_COMPANY_ENTRY: string;
  GOOGLE_FORM_ROLE_ENTRY: string;
  GOOGLE_FORM_USECASE_ENTRY: string;
  GOOGLE_FORM_INVESTMENT_ENTRY: string;
  GOOGLE_FORM_TRANSACTION_ENTRY: string;
  GOOGLE_FORM_DONATION_ENTRY: string;
  
  // Crypto wallet configuration
  SOLANA_WALLET_ADDRESS: string;
  
  // Business configuration
  COMPANY_NAME: string;
  COMPANY_TAGLINE: string;
  FUNDING_TARGET: string;
  CURRENT_FUNDING: string;
  
  // Contact and support
  SUPPORT_EMAIL: string;
  COMPANY_LOCATION: string;
}

// Default configuration values
const defaultConfig: AppConfig = {
  // Google Form configuration
  GOOGLE_FORM_URL: 'https://docs.google.com/forms/d/e/1FAIpQLSfin8fzNPq_k42wydqTuPve9_eHAoO0APupuXt4Dgfu_bKDlw/formResponse',
  GOOGLE_FORM_EMAIL_ENTRY: 'entry.325136474',
  GOOGLE_FORM_COMPANY_ENTRY: 'entry.1110046701', 
  GOOGLE_FORM_ROLE_ENTRY: 'entry.380287407',
  GOOGLE_FORM_USECASE_ENTRY: 'entry.1758330325',
  GOOGLE_FORM_INVESTMENT_ENTRY: 'entry.1081291411',
  GOOGLE_FORM_TRANSACTION_ENTRY: 'entry.886262740',
  GOOGLE_FORM_DONATION_ENTRY: 'entry.1830846495',
  
  // Crypto wallet configuration
  SOLANA_WALLET_ADDRESS: '8duTg8T3GfXPH8RzFvcDTvDvCvXpAiBd3AWKaDnwRy5J',
  
  // Business configuration
  COMPANY_NAME: 'Moonspace',
  COMPANY_TAGLINE: 'Financial Intelligence Platform',
  FUNDING_TARGET: '$100,000',
  CURRENT_FUNDING: '$33,000',
  
  // Contact and support
  SUPPORT_EMAIL: 'hello@moonspace.io',
  COMPANY_LOCATION: 'Vietnam'
};

// Get configuration with environment variables override
export const getConfig = Effect.gen(function* (_) {
  // This would merge environment variables in a real app
  // For now, we'll just return the default config
  return defaultConfig;
});

// For direct usage in components
export const useConfig = (): AppConfig => {
  return defaultConfig;
};
