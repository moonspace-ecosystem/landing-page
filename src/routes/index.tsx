import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { 
  ArrowRight, 
  BarChart3, 
  Globe, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  DollarSign, 
  CheckCircle, 
  Star, 
  Building, 
  Target, 
  Rocket 
} from '../components/icons/icons';
import { useConfig } from '../config/appConfig';
import { EarlyAccessForm } from '../components/early-access-form/early-access-form';
import { CryptoDonationSection } from '../components/crypto-donation-section/crypto-donation-section';
import { fetchValidatedDonations, calculateFundingProgress, formatCurrency } from '../services/funding';
import type { FundingData } from '../services/funding';

export default component$(() => {
  const config = useConfig();

  // Funding data signals
  const fundingData = useSignal<FundingData | null>(null);
  const isLoadingFunding = useSignal(true);
  const fundingError = useSignal<string | null>(null);
  const lastUpdated = useSignal<string>('');
  const refreshCount = useSignal(0);

  // Function to load funding data - wrapped in $
  const loadFundingData = $(async () => {
    try {
      console.log('Loading funding data...');
      isLoadingFunding.value = true;
      fundingError.value = null;

      const { totalValidatedDonations, validatedCount } = await fetchValidatedDonations();
      const calculatedData = calculateFundingProgress(config, totalValidatedDonations);
      calculatedData.validatedCount = validatedCount;

      fundingData.value = calculatedData;
      lastUpdated.value = new Date().toLocaleTimeString();
      console.log('Funding data loaded:', calculatedData);
    } catch (error) {
      console.error('Error loading funding data:', error);
      fundingError.value = error instanceof Error ? error.message : 'Failed to load funding data';

      // Set fallback funding data
      fundingData.value = calculateFundingProgress(config, 0);
    } finally {
      isLoadingFunding.value = false;
    }
  });

  // Manual refresh function - wrapped in $
  const refreshFundingData = $(async () => {
    refreshCount.value += 1;
    await loadFundingData();
  });

  // Load funding data when component becomes visible + auto-refresh
  useVisibleTask$(({ cleanup }) => {
    // Initial load
    loadFundingData();

    // Set up auto-refresh every 30 seconds
    const intervalId = setInterval(() => {
      console.log('Auto-refreshing funding data...');
      loadFundingData();
    }, 30000); // 30 seconds

    // Cleanup interval on component unmount
    cleanup(() => {
      clearInterval(intervalId);
    });
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header class="relative z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-4">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe class="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {config.COMPANY_NAME}
                </h1>
                <p class="text-xs text-gray-400">{config.COMPANY_TAGLINE}</p>
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-6">
              <a href="#problem" class="text-gray-300 hover:text-white transition-colors">Problem</a>
              <a href="#solution" class="text-gray-300 hover:text-white transition-colors">Solution</a>
              <a href="#market" class="text-gray-300 hover:text-white transition-colors">Market</a>
              <a href="#investment" class="text-gray-300 hover:text-white transition-colors">Investment</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section class="relative overflow-hidden pt-20 pb-32">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
              <Rocket class="w-4 h-4 text-purple-400" />
              <span class="text-purple-300 text-sm font-medium">
                Now Raising Pre-Seed • {fundingData.value ? formatCurrency(fundingData.value.fundingTarget) : config.FUNDING_TARGET} Target
              </span>
            </div>
            
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              DePIN Document
              <br />
              <span class="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Registry
              </span>
            </h1>
            
            <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first DePIN-powered platform combining crowdsourcing, AI validation, and blockchain verification
              for corporate document transparency. <span class="text-purple-400 font-semibold">Community-driven, blockchain-secured.</span>
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#early-access" class="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                <span>Join Early Access</span>
                <ArrowRight class="w-5 h-5" />
              </a>
              <a href="#investment" class="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm">
                Investment Opportunity
              </a>
            </div>

            {/* Market metrics */}
            <div class="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div class="text-center">
                <div class="text-3xl font-bold text-white">$47B</div>
                <div class="text-gray-400 text-sm">Global Document Management</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">$12B</div>
                <div class="text-gray-400 text-sm">Corporate Transparency Market</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">95%</div>
                <div class="text-gray-400 text-sm">AI Validation Accuracy</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-white">0</div>
                <div class="text-gray-400 text-sm">DePIN Document Platforms</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" class="py-20 bg-black/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-6">The Multi-Billion Problem</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Businesses and investors lose millions of hours searching for and verifying corporate documents. 60% of financial reports are not properly digitized.
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8">
            <div class="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
              <div class="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp class="w-6 h-6 text-red-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Time-Consuming Search</h3>
              <p class="text-gray-300">
                Investors waste millions of hours searching for corporate documents across fragmented sources.
                Manual verification processes are slow and unreliable.
              </p>
            </div>

            <div class="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
              <div class="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield class="w-6 h-6 text-yellow-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Information Asymmetry</h3>
              <p class="text-gray-300">
                60% of financial reports are not properly digitized, creating information asymmetry
                and lack of transparency in markets.
              </p>
            </div>

            <div class="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
              <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 class="w-6 h-6 text-blue-400" />
              </div>
              <h3 class="text-xl font-bold text-white mb-4">Trust & Verification Issues</h3>
              <p class="text-gray-300">
                No reliable system to verify document authenticity and accuracy.
                Lack of incentives for quality data contribution and maintenance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-6">DePIN-Powered Solution</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              {config.COMPANY_NAME} combines crowdsourcing, AI validation, and blockchain verification for complete document transparency
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div class="space-y-8">
                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap class="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white mb-2">Crowdsourced Document Collection</h3>
                    <p class="text-gray-300">
                      Community-driven platform incentivizes users with tokens to collect and verify corporate documents.
                      Smart algorithms ensure quality and completeness.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building class="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white mb-2">AI + Blockchain Validation</h3>
                    <p class="text-gray-300">
                      95%+ accuracy AI validation combined with blockchain verification ensures document authenticity.
                      Immutable audit trail for all verifications.
                    </p>
                  </div>
                </div>

                <div class="flex items-start space-x-4">
                  <div class="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign class="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-white mb-2">Token Incentive System</h3>
                    <p class="text-gray-300">
                      Built on Solana for fast, low-cost transactions. Token rewards create sustainable incentives
                      for community participation and quality contributions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 class="text-2xl font-bold text-white mb-6 text-center">Platform Features</h3>
              <div class="space-y-4">
                {[
                  'Crowdsourced document collection',
                  'AI + Blockchain validation system',
                  'Hybrid search (text + AI semantic)',
                  'Enterprise API integrations',
                  'Token-based incentive system',
                  'Solana blockchain infrastructure'
                ].map((feature, index) => (
                  <div key={index} class="flex items-center space-x-3">
                    <CheckCircle class="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span class="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section id="market" class="py-20 bg-black/30">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-6">Massive Market Opportunity</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              First-mover advantage in DePIN document space with multiple revenue streams and network effects
            </p>
          </div>

          <div class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="text-center">
              <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users class="w-8 h-8 text-purple-400" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Investment Firms</h3>
              <p class="text-gray-300 mb-4">Global investment firms need verified corporate documents for due diligence</p>
              <div class="text-purple-400 font-semibold">$10K-$50K/year</div>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building class="w-8 h-8 text-green-400" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">Financial Institutions</h3>
              <p class="text-gray-300 mb-4">Banks and lenders need verified documents for credit analysis</p>
              <div class="text-green-400 font-semibold">API Licensing Fees</div>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target class="w-8 h-8 text-blue-400" />
              </div>
              <h3 class="text-2xl font-bold text-white mb-2">ESG & Compliance</h3>
              <p class="text-gray-300 mb-4">Regulatory bodies and compliance firms need transparency tools</p>
              <div class="text-blue-400 font-semibold">Platform Transaction Fees</div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
            <h3 class="text-2xl font-bold text-white mb-6 text-center">Market Size & Opportunity</h3>
            <div class="grid md:grid-cols-2 gap-8">
              <div>
                <h4 class="text-lg font-semibold text-purple-400 mb-4">Market Size</h4>
                <div class="space-y-2 text-gray-300">
                  <div class="flex justify-between">
                    <span>TAM:</span>
                    <span class="font-semibold">$47B Global</span>
                  </div>
                  <div class="flex justify-between">
                    <span>SAM:</span>
                    <span class="font-semibold">$12B Compliance</span>
                  </div>
                  <div class="flex justify-between">
                    <span>SOM:</span>
                    <span class="font-semibold text-green-400">$800M Vietnam + SEA</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 class="text-lg font-semibold text-pink-400 mb-4">12-Month Targets</h4>
                <div class="space-y-2 text-gray-300">
                  <div class="flex justify-between">
                    <span>Active Users:</span>
                    <span class="font-semibold">10,000+</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Documents Verified:</span>
                    <span class="font-semibold">100,000+</span>
                  </div>
                  <div class="flex justify-between">
                    <span>ARR:</span>
                    <span class="font-semibold text-green-400">$100K+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" class="py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-white mb-6">Investment Opportunity</h2>
            <p class="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us in building the future of corporate transparency. DePIN-powered, blockchain-secured, community-driven.
            </p>
          </div>

          <div class="grid lg:grid-cols-2 gap-12">
            <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 class="text-2xl font-bold text-white mb-6">Why Invest Now?</h3>
              <div class="space-y-4">
                {[
                  { icon: <Star class="w-5 h-5 text-yellow-400" />, text: "First-mover advantage in DePIN document space" },
                  { icon: <TrendingUp class="w-5 h-5 text-green-400" />, text: "Network effects with token economics" },
                  { icon: <Globe class="w-5 h-5 text-blue-400" />, text: "Global scalability on Solana blockchain" },
                  { icon: <Zap class="w-5 h-5 text-purple-400" />, text: "AI + blockchain technology moats" },
                  { icon: <DollarSign class="w-5 h-5 text-green-400" />, text: "Multiple revenue streams and exit paths" }
                ].map((item, index) => (
                  <div key={index} class="flex items-center space-x-3">
                    {item.icon}
                    <span class="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div class="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8">
              <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-white">Investment Details</h3>
                <button
                  onClick$={refreshFundingData}
                  disabled={isLoadingFunding.value}
                  class="px-3 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-lg text-purple-300 hover:text-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>{isLoadingFunding.value ? 'Refreshing...' : 'Refresh'}</span>
                </button>
              </div>
              <div class="space-y-6">
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-300">Funding Target</span>
                    <span class="text-2xl font-bold text-white">
                      {fundingData.value ? formatCurrency(fundingData.value.fundingTarget) : config.FUNDING_TARGET}
                    </span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{
                        width: `${fundingData.value?.progressPercentage || 0}%`
                      }}
                    ></div>
                  </div>
                  <p class="text-sm text-gray-400 mt-1">
                    {isLoadingFunding.value ? (
                      'Loading funding data...'
                    ) : fundingError.value ? (
                      'Unable to load funding data • Using fallback values'
                    ) : fundingData.value ? (
                      `${formatCurrency(fundingData.value.currentFundingAmount)} raised • ${Math.round(fundingData.value.remainingPercentage)}% remaining • ${fundingData.value.validatedCount} validated donations`
                    ) : (
                      '$0 raised • 100% remaining'
                    )}
                  </p>

                  {fundingData.value && fundingData.value.totalValidatedDonations > 0 && (
                    <p class="text-xs text-green-400 mt-1">
                      {formatCurrency(fundingData.value.totalValidatedDonations)} from community donations
                    </p>
                  )}

                  {/* Last updated indicator */}
                  {lastUpdated.value && (
                    <p class="text-xs text-gray-500 mt-1">
                      Last updated: {lastUpdated.value}
                    </p>
                  )}
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <div class="text-gray-400 text-sm">Round</div>
                    <div class="text-xl font-bold text-white">Pre-Seed</div>
                  </div>
                  <div>
                    <div class="text-gray-400 text-sm">Expected ROI</div>
                    <div class="text-xl font-bold text-green-400">10-25x</div>
                  </div>
                </div>

                {/* Debug information - only show if there's an error */}
                {fundingError.value && (
                  <div class="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p class="text-yellow-300 text-xs">
                      ⚠️ Funding data unavailable: Using fallback values
                    </p>
                    <p class="text-yellow-200 text-xs mt-1">
                      {fundingError.value}
                    </p>
                  </div>
                )}

                <div>
                  <div class="text-gray-400 text-sm mb-2">Use of Funds (Revised for Global Market)</div>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-300">Product Development</span>
                      <span class="text-white">35%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-300">Legal & Compliance</span>
                      <span class="text-white font-medium text-yellow-300">25%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-300">Team Expansion</span>
                      <span class="text-white">22%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-300">Go-to-Market</span>
                      <span class="text-white">13%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-300">Operations</span>
                      <span class="text-white">5%</span>
                    </div>
                  </div>
                  <div class="mt-3 pt-3 border-t border-gray-600">
                    <div class="text-xs text-gray-400">
                      <div class="font-medium text-yellow-300 mb-1">Legal & Compliance Focus:</div>
                      <div>• Global regulatory compliance</div>
                      <div>• Enterprise partnerships</div>
                      <div>• IP protection & patents</div>
                      <div>• International expansion prep</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crypto Donation Section */}
      <CryptoDonationSection />

      {/* Early Access Form */}
      <EarlyAccessForm />

      {/* Footer */}
      <footer class="bg-black/50 border-t border-white/10 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="flex items-center space-x-3 mb-4 md:mb-0">
              <div class="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-xl font-bold text-white">{config.COMPANY_NAME}</h3>
                <p class="text-gray-400 text-sm">{config.COMPANY_TAGLINE}</p>
              </div>
            </div>
            <div class="text-gray-400 text-sm">
              © 2025 {config.COMPANY_NAME}. Built with 🚀 in {config.COMPANY_LOCATION}.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'DePIN Document Registry | Revolutionizing Corporate Transparency',
  meta: [
    {
      name: 'description',
      content: 'The first DePIN-powered platform combining crowdsourcing, AI validation, and blockchain verification for corporate document transparency.',
    },
  ],
};