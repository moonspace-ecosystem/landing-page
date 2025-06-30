import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useFormState } from '../hooks/useFormState';
import { useConfig } from '../config/appConfig';

const EarlyAccessForm: React.FC = () => {
  const config = useConfig();
  const {
    formData,
    setFormData,
    isSubmitting,
    submitted,
    submitError,
    handleSubmit,
    handleFileChange
  } = useFormState(config);

  return (
    <section id="early-access" className="py-20 bg-black/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-6">Get Early Access</h2>
          <p className="text-xl text-gray-300">
            Join 500+ companies already interested in our platform. Be first to access when we launch.
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
          {submitError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-red-400">{submitError}</p>
            </div>
          )}
          
          {!submitted ? (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="your.email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    placeholder="Your Company"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Your Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select your role</option>
                    <option value="Investment Manager">Investment Manager</option>
                    <option value="Financial Analyst">Financial Analyst</option>
                    <option value="Accountant">Accountant</option>
                    <option value="Corporate Development">Corporate Development</option>
                    <option value="CEO/Founder">CEO/Founder</option>
                    <option value="Investor">Investor</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Primary Interest</label>
                  <select
                    value={formData.usecase}
                    onChange={(e) => setFormData({...formData, usecase: e.target.value})}
                    className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Select primary interest</option>
                    <option value="Platform Access">Early Platform Access</option>
                    <option value="Investment Opportunity">Investment Opportunity</option>
                    <option value="Partnership">Partnership Opportunity</option>
                    <option value="Data Licensing">Data Licensing</option>
                    <option value="API Integration">API Integration</option>
                    <option value="Custom Solution">Custom Solution</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Investment Interest (Optional)</label>
                <select
                  value={formData.investment}
                  onChange={(e) => setFormData({...formData, investment: e.target.value})}
                  className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                >
                  <option value="">Not interested in investing</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                  <option value="$50,000+">$50,000+</option>
                </select>
              </div>

              {/* Crypto Donation Verification Section */}
              <div className="border-t border-white/10 pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">Crypto Donation Verification (Optional)</h4>
                <p className="text-gray-400 text-sm mb-4">
                  If you've made a donation via USDC or USDT, please provide transaction details for verification and acknowledgment.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Transaction Hash</label>
                    <input
                      type="text"
                      value={formData.transactionHash}
                      onChange={(e) => setFormData({...formData, transactionHash: e.target.value})}
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Enter transaction hash"
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Donation Amount</label>
                    <input
                      type="text"
                      value={formData.donationAmount}
                      onChange={(e) => setFormData({...formData, donationAmount: e.target.value})}
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="e.g., 50 USDC"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-white font-medium mb-2">Transaction Screenshot (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                    />
                    {formData.transactionScreenshot && (
                      <p className="text-green-400 text-sm mt-2">
                        ✓ Screenshot uploaded: {formData.transactionScreenshot.name}
                      </p>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-2">
                    Upload a screenshot of your wallet transaction for verification purposes. This helps us track and acknowledge your contribution.
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.email}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Get Early Access</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p className="text-gray-300 mb-4">
                We've received your application. Our team will contact you within 48 hours with next steps.
              </p>
              {formData.transactionHash && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
                  <p className="text-green-400 font-semibold">Donation Received!</p>
                  <p className="text-gray-300 text-sm">
                    Thank you for your crypto donation. We'll verify the transaction and send you a confirmation email.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EarlyAccessForm;
