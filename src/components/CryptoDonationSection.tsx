import React from 'react';
import { DollarSign } from 'lucide-react';
import { useConfig } from '../config/appConfig';
import { copyToClipboard } from '../effects/clipboardEffects';
import { Effect } from 'effect';

const CryptoDonationSection: React.FC = () => {
  const config = useConfig();
  
  const handleCopyAddress = (address: string = config.SOLANA_WALLET_ADDRESS) => {
    Effect.runPromise(copyToClipboard(address))
      .then(() => {
        // TODO: Replace alert with elegant toast notification
        alert('Address copied to clipboard!');
      })
      .catch((error) => {
        alert(`Failed to copy: ${error.message}`);
      });
  };
  
  return (
    <section className="py-20 bg-gradient-to-br from-green-500/10 to-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Support Our Vision</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of financial data intelligence. Every contribution accelerates our development and brings us closer to revolutionizing the industry.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* USDC Donation */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">USDC Donation</h3>
            <p className="text-gray-300 mb-6">Stable, reliable donations via USDC on Solana network</p>
            
            {/* QR Code placeholder - replace with actual QR code image */}
            <div className="bg-white p-4 rounded-lg inline-block mb-6">
              <div className="w-48 h-48 bg-black/10 rounded flex items-center justify-center">
                <span className="text-gray-600 text-sm text-center">
                  USDC QR Code<br/>
                  (Replace with actual QR image)
                </span>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-400 mb-2">Solana Network Address:</p>
              <p className="text-white font-mono text-sm break-all">
                {config.SOLANA_WALLET_ADDRESS}
              </p>
            </div>
            
            <button
              onClick={() => handleCopyAddress()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Copy Address
            </button>
          </div>

          {/* USDT Donation */}
          <div className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">USDT Donation</h3>
            <p className="text-gray-300 mb-6">Global standard for crypto donations via USDT on Solana</p>
            
            {/* QR Code placeholder - replace with actual QR code image */}
            <div className="bg-white p-4 rounded-lg inline-block mb-6">
              <div className="w-48 h-48 bg-black/10 rounded flex items-center justify-center">
                <span className="text-gray-600 text-sm text-center">
                  USDT QR Code<br/>
                  (Replace with actual QR image)
                </span>
              </div>
            </div>
            
            <div className="bg-black/20 rounded-lg p-4 mb-4">
              <p className="text-xs text-gray-400 mb-2">Solana Network Address:</p>
              <p className="text-white font-mono text-sm break-all">
                {config.SOLANA_WALLET_ADDRESS}
              </p>
            </div>
            
            <button
              onClick={() => handleCopyAddress()}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Copy Address
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h4 className="text-lg font-semibold text-white mb-2">Why Crypto Donations?</h4>
            <p className="text-gray-300 text-sm">
              Cryptocurrency donations allow for instant, global transactions with full transparency on the blockchain. 
              Every donation is recorded and verifiable, ensuring complete accountability for how funds are used in building {config.COMPANY_NAME}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoDonationSection;
