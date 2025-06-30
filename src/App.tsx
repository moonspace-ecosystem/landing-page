import React from 'react';
import { ArrowRight, BarChart3, Globe, Zap, Shield, TrendingUp, Users, DollarSign, CheckCircle, Star, Building, Target, Rocket } from 'lucide-react';
import { useConfig } from './config/appConfig';
import EarlyAccessForm from './components/EarlyAccessForm';
import CryptoDonationSection from './components/CryptoDonationSection';

const App: React.FC = () => {
  const config = useConfig();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {config.COMPANY_NAME}
                </h1>
                <p className="text-xs text-gray-400">{config.COMPANY_TAGLINE}</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#problem" className="text-gray-300 hover:text-white transition-colors">Problem</a>
              <a href="#solution" className="text-gray-300 hover:text-white transition-colors">Solution</a>
              <a href="#market" className="text-gray-300 hover:text-white transition-colors">Market</a>
              <a href="#investment" className="text-gray-300 hover:text-white transition-colors">Investment</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-pink-800/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">
                Now Raising Series Seed • {config.FUNDING_TARGET} Target
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Australian
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                Financial Data
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The first AI-powered platform to automatically convert Australian corporate financial reports 
              to IFRS and US GAAP standards. <span className="text-purple-400 font-semibold">Instant conversion, global compliance.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#early-access" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                <span>Join Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#investment" className="border border-white/20 hover:border-white/40 text-white px-8 py-4 rounded-xl font-semibold transition-all backdrop-blur-sm">
                Investment Opportunity
              </a>
            </div>

            {/* Market metrics with environment-driven data */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$24.15B</div>
                <div className="text-gray-400 text-sm">Global Financial Data Market</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">$473.4B</div>
                <div className="text-gray-400 text-sm">Australia Finance Sector</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-gray-400 text-sm">Direct Competitors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">8-10</div>
                <div className="text-gray-400 text-sm">Months to Break-even</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">The $2 Billion Problem</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              International investors and multinational corporations waste millions on manual financial data conversion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-2xl p-8">
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Manual & Expensive</h3>
              <p className="text-gray-300">
                Big 4 firms charge $50,000-$200,000 for manual IFRS/GAAP conversion projects. 
                Process takes 3-6 months and is prone to human error.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-8">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Compliance Chaos</h3>
              <p className="text-gray-300">
                Australian companies struggle to meet international reporting standards, 
                limiting their access to global capital markets and investment opportunities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <BarChart3 className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Data Fragmentation</h3>
              <p className="text-gray-300">
                Financial data scattered across multiple sources, formats, and standards. 
                No centralized platform for comparative analysis and benchmarking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solution" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">AI-Powered Solution</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {config.COMPANY_NAME} transforms Australian financial data with intelligent automation and global standards
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Instant AI Conversion</h3>
                    <p className="text-gray-300">
                      Advanced machine learning algorithms automatically convert Australian GAAP to IFRS and US GAAP 
                      in minutes, not months. 99.7% accuracy guaranteed.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Complete Data Coverage</h3>
                    <p className="text-gray-300">
                      Access to 2,000+ ASX-listed companies and 50,000+ private company financial reports 
                      through automated ASIC data integration.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <DollarSign className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Crypto Payment Innovation</h3>
                    <p className="text-gray-300">
                      First financial platform to accept USDT/USDC payments, enabling instant international transactions 
                      with lower fees for global fintech clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Platform Features</h3>
              <div className="space-y-4">
                {[
                  'Real-time financial data aggregation',
                  'AI-powered IFRS/GAAP conversion',
                  'Interactive comparison dashboards',
                  'API integration for enterprise clients',
                  'Compliance reporting automation',
                  'Multi-currency and crypto payments'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section id="market" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Massive Market Opportunity</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              First-mover advantage in an underserved niche with proven demand and scalable business model
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Investment Firms</h3>
              <p className="text-gray-300 mb-4">500+ firms managing $2.3T AUD need standardized financial data</p>
              <div className="text-purple-400 font-semibold">$500-$2,000/month</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Accounting Firms</h3>
              <p className="text-gray-300 mb-4">1,200+ firms serving multinational clients requiring compliance</p>
              <div className="text-green-400 font-semibold">$200-$800/month</div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Corporate Development</h3>
              <p className="text-gray-300 mb-4">800+ companies needing M&A and expansion analysis</p>
              <div className="text-blue-400 font-semibold">$300-$1,500/month</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Revenue Projections</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-purple-400 mb-4">Conservative Scenario</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Month 6:</span>
                    <span className="font-semibold">$18,495/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Month 12:</span>
                    <span className="font-semibold">$41,780/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Revenue:</span>
                    <span className="font-semibold text-green-400">$501,360</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-pink-400 mb-4">Optimistic Scenario</h4>
                <div className="space-y-2 text-gray-300">
                  <div className="flex justify-between">
                    <span>Month 6:</span>
                    <span className="font-semibold">$36,940/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Month 12:</span>
                    <span className="font-semibold">$104,400/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Annual Revenue:</span>
                    <span className="font-semibold text-green-400">$1,252,800</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Investment Opportunity</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join us in building the future of financial data intelligence. Early stage, high growth potential.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Why Invest Now?</h3>
              <div className="space-y-4">
                {[
                  { icon: <Star className="w-5 h-5 text-yellow-400" />, text: "First-mover advantage in untapped niche market" },
                  { icon: <TrendingUp className="w-5 h-5 text-green-400" />, text: "Scalable SaaS model with recurring revenue" },
                  { icon: <Globe className="w-5 h-5 text-blue-400" />, text: "Global expansion potential beyond Australia" },
                  { icon: <Zap className="w-5 h-5 text-purple-400" />, text: "AI technology moat with proprietary algorithms" },
                  { icon: <DollarSign className="w-5 h-5 text-green-400" />, text: "Multiple exit opportunities in 3-5 years" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {item.icon}
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Investment Details</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Funding Target</span>
                    <span className="text-2xl font-bold text-white">{config.FUNDING_TARGET}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full w-1/3"></div>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{config.CURRENT_FUNDING} raised • 67% remaining</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-gray-400 text-sm">Minimum Investment</div>
                    <div className="text-xl font-bold text-white">$5,000</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-sm">Expected ROI</div>
                    <div className="text-xl font-bold text-green-400">10-25x</div>
                  </div>
                </div>

                <div>
                  <div className="text-gray-400 text-sm mb-2">Use of Funds</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Development & AI</span>
                      <span className="text-white">40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Marketing & Sales</span>
                      <span className="text-white">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Operations</span>
                      <span className="text-white">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Legal & Compliance</span>
                      <span className="text-white">10%</span>
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
      <footer className="bg-black/50 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{config.COMPANY_NAME}</h3>
                <p className="text-gray-400 text-sm">{config.COMPANY_TAGLINE}</p>
              </div>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 {config.COMPANY_NAME}. Built with 🚀 in {config.COMPANY_LOCATION}.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
