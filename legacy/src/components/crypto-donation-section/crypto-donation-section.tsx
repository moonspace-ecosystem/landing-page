import { component$, $, useSignal } from '@builder.io/qwik';
import { DollarSign } from '../icons/icons';
import { useConfig } from '../../config/appConfig';

export const CryptoDonationSection = component$(() => {
  const config = useConfig();
  const copiedStates = useSignal<{[key: string]: boolean}>({});
  
  const handleCopyAddress = $((buttonId: string) => {
    console.log('Copy button clicked, wallet address:', config.SOLANA_WALLET_ADDRESS);
    
    // Fallback method for older browsers or HTTPS issues
    const fallbackCopy = (text: string) => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        if (successful) {
          showCopiedFeedback(buttonId);
          console.log('Copy successful via fallback method');
        } else {
          console.log('Copy failed via fallback method');
        }
      } catch (err) {
        document.body.removeChild(textArea);
        console.error('Copy error:', err);
      }
    };

    const showCopiedFeedback = (buttonId: string) => {
      copiedStates.value = { ...copiedStates.value, [buttonId]: true };
      const timeout = parseInt(import.meta.env.VITE_COPY_FEEDBACK_TIMEOUT) || 2000;
      setTimeout(() => {
        copiedStates.value = { ...copiedStates.value, [buttonId]: false };
      }, timeout);
    };

    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(config.SOLANA_WALLET_ADDRESS)
        .then(() => {
          showCopiedFeedback(buttonId);
          console.log('Copy successful via navigator.clipboard');
        })
        .catch((error) => {
          console.log('Navigator.clipboard failed, trying fallback:', error);
          fallbackCopy(config.SOLANA_WALLET_ADDRESS);
        });
    } else {
      console.log('Navigator.clipboard not available, using fallback');
      fallbackCopy(config.SOLANA_WALLET_ADDRESS);
    }
  });
  
  return (
    <section class="py-20 bg-gradient-to-br from-green-500/10 to-blue-500/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white mb-6">Support Our Vision</h2>
          <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Help us build the future of financial data intelligence. Every contribution accelerates our development and brings us closer to revolutionizing the industry.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          {/* USDC Donation */}
          <div class="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign class="w-8 h-8 text-blue-400" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">USDC Donation</h3>
            <p class="text-gray-300 mb-6">Stable, reliable donations via USDC on Solana network</p>
            
            {/* QR Code placeholder - replace with actual QR code image */}
            <div class="bg-white p-4 rounded-lg inline-block mb-6">
              <div class="w-48 h-48 bg-black/10 rounded flex items-center justify-center">
                <span class="text-gray-600 text-sm text-center">
                  USDC QR Code<br/>
                  (Replace with actual QR image)
                </span>
              </div>
            </div>
            
            <div class="bg-black/20 rounded-lg p-4 mb-4">
              <p class="text-xs text-gray-400 mb-2">Solana Network Address:</p>
              <p class="text-white font-mono text-sm break-all">
                {config.SOLANA_WALLET_ADDRESS}
              </p>
            </div>
            
            <button
              onClick$={() => handleCopyAddress('usdc')}
              class={`relative bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 overflow-hidden ${
                copiedStates.value.usdc ? 'bg-green-600' : ''
              }`}
            >
              <span class={`transition-all duration-300 ${
                copiedStates.value.usdc ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                Copy Address
              </span>
              <span class={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                copiedStates.value.usdc ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                ✓ Copied!
              </span>
            </button>
          </div>

          {/* USDT Donation */}
          <div class="bg-gradient-to-br from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
            <div class="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <DollarSign class="w-8 h-8 text-green-400" />
            </div>
            <h3 class="text-2xl font-bold text-white mb-4">USDT Donation</h3>
            <p class="text-gray-300 mb-6">Global standard for crypto donations via USDT on Solana</p>
            
            {/* QR Code placeholder - replace with actual QR code image */}
            <div class="bg-white p-4 rounded-lg inline-block mb-6">
              <div class="w-48 h-48 bg-black/10 rounded flex items-center justify-center">
                <span class="text-gray-600 text-sm text-center">
                  USDT QR Code<br/>
                  (Replace with actual QR image)
                </span>
              </div>
            </div>
            
            <div class="bg-black/20 rounded-lg p-4 mb-4">
              <p class="text-xs text-gray-400 mb-2">Solana Network Address:</p>
              <p class="text-white font-mono text-sm break-all">
                {config.SOLANA_WALLET_ADDRESS}
              </p>
            </div>
            
            <button
              onClick$={() => handleCopyAddress('usdt')}
              class={`relative bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-all duration-300 overflow-hidden ${
                copiedStates.value.usdt ? 'bg-green-500' : ''
              }`}
            >
              <span class={`transition-all duration-300 ${
                copiedStates.value.usdt ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
              }`}>
                Copy Address
              </span>
              <span class={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                copiedStates.value.usdt ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}>
                ✓ Copied!
              </span>
            </button>
          </div>
        </div>

        <div class="mt-12 text-center">
          <div class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6 max-w-2xl mx-auto">
            <h4 class="text-lg font-semibold text-white mb-2">Why Crypto Donations?</h4>
            <p class="text-gray-300 text-sm">
              Cryptocurrency donations allow for instant, global transactions with full transparency on the blockchain. 
              Every donation is recorded and verifiable, ensuring complete accountability for how funds are used in building {config.COMPANY_NAME}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});