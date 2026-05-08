// App configuration

// Configuration schema
export interface AppConfig {
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

// Get configuration from environment variables
const getConfig = (): AppConfig => {
  return {
    // Crypto wallet configuration
    SOLANA_WALLET_ADDRESS: import.meta.env.VITE_SOLANA_WALLET_ADDRESS || '',
    
    // Business configuration
    COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'DePIN Document Registry',
    COMPANY_TAGLINE: import.meta.env.VITE_COMPANY_TAGLINE || 'Revolutionizing Corporate Transparency',
    FUNDING_TARGET: import.meta.env.VITE_FUNDING_TARGET || '$800K - $10M',
    CURRENT_FUNDING: import.meta.env.VITE_CURRENT_FUNDING || '$0',
    
    // Contact and support
    SUPPORT_EMAIL: import.meta.env.VITE_SUPPORT_EMAIL || 'hello@depin-registry.io',
    COMPANY_LOCATION: import.meta.env.VITE_COMPANY_LOCATION || 'Vietnam'
  };
};

// For direct usage in components
export const useConfig = (): AppConfig => {
  return getConfig();
};
