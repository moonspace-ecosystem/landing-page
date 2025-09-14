// Funding data service
import type { AppConfig } from '../config/appConfig';

export interface FundingData {
  totalValidatedDonations: number;
  validatedCount: number;
  fundingTarget: number;
  currentFundingAmount: number;
  progressPercentage: number;
  remainingPercentage: number;
}

// Fetch validated donations from Google Sheets
export async function fetchValidatedDonations(): Promise<{ totalValidatedDonations: number; validatedCount: number }> {
  try {
    console.log('Fetching validated donations from Google Sheets...');

    const response = await fetch('/api/sheets/read', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Unknown error occurred');
    }

    console.log('Successfully fetched donations:', result.data);

    return {
      totalValidatedDonations: result.data.totalValidatedDonations || 0,
      validatedCount: result.data.validatedCount || 0,
    };

  } catch (error) {
    console.error('Error fetching validated donations:', error);

    // Return fallback values in case of error
    return {
      totalValidatedDonations: 0,
      validatedCount: 0,
    };
  }
}

// Calculate funding progress with validated donations
export function calculateFundingProgress(
  config: AppConfig,
  validatedDonations: number
): FundingData {
  // Parse funding target - handle range format like "$800K - $1.2M"
  let fundingTarget = 1200000; // Default to $1.2M (upper range of "$800K - $1.2M")

  if (config.FUNDING_TARGET.includes(' - ')) {
    // Handle range format "$800K - $1.2M" - use upper bound
    const upperBound = config.FUNDING_TARGET.split(' - ')[1];
    if (upperBound.includes('M')) {
      const num = parseFloat(upperBound.replace(/[\$M]/g, ''));
      fundingTarget = num * 1000000;
    } else if (upperBound.includes('K')) {
      const num = parseFloat(upperBound.replace(/[\$K]/g, ''));
      fundingTarget = num * 1000;
    }
  } else {
    // Handle simple format like "$500,000"
    const fundingTargetStr = config.FUNDING_TARGET.replace(/[\$,]/g, '');
    fundingTarget = parseFloat(fundingTargetStr) || 1200000;
  }

  // Current funding = ONLY validated donations from Google Sheets
  // Remove any hardcoded base funding - only count validated donations
  const currentFundingAmount = validatedDonations;

  // Calculate progress percentage
  const progressPercentage = Math.min((currentFundingAmount / fundingTarget) * 100, 100);
  const remainingPercentage = Math.max(100 - progressPercentage, 0);

  return {
    totalValidatedDonations: validatedDonations,
    validatedCount: 0, // This will be set by the caller
    fundingTarget,
    currentFundingAmount,
    progressPercentage,
    remainingPercentage,
  };
}

// Format currency for display
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}