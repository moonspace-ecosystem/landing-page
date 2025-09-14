import { component$, useSignal, $, noSerialize } from '@builder.io/qwik';
import { ArrowRight, CheckCircle } from '../icons/icons';
import { useConfig } from '../../config/appConfig';

export const EarlyAccessForm = component$(() => {
  const config = useConfig();
  const isSubmitted = useSignal(false);
  const isSubmitting = useSignal(false);
  const submitError = useSignal<string | null>(null);
  
  // Use signals for form fields instead of store
  const email = useSignal('');
  const company = useSignal('');
  const role = useSignal('');
  const usecase = useSignal('');
  const investment = useSignal('');
  const transactionHash = useSignal('');
  const donationAmount = useSignal('');
  const transactionScreenshot = useSignal<any>(null);
  const fileName = useSignal('');
  const imageBase64 = useSignal('');

  const handleSubmit = $(async () => {
    console.log('Handle submit called');
    
    if (!email.value) {
      submitError.value = 'Email is required';
      console.log('Email validation failed');
      return;
    }

    if (!imageBase64.value) {
      submitError.value = 'Transaction Screenshot is required';
      console.log('Screenshot validation failed');
      return;
    }

    console.log('Starting form submission...');
    isSubmitting.value = true;
    submitError.value = null;

    try {
      const formData = {
        email: email.value,
        company: company.value,
        role: role.value,
        usecase: usecase.value,
        investment: investment.value,
        transactionHash: transactionHash.value,
        donationAmount: donationAmount.value,
        screenshot: imageBase64.value,
      };

      console.log('Submitting form data:', formData);
      
      // Direct fetch to API endpoint
      const response = await fetch('/api/sheets/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));

        // Handle duplicate submissions
        if (response.status === 409) {
          submitError.value = 'This form has already been submitted with identical information. Please check if you have already applied.';
          console.log('Duplicate submission detected:', errorData);
        } else {
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }

        isSubmitting.value = false;
        return;
      }

      const result = await response.json();
      console.log('Form submission successful:', result);
      isSubmitted.value = true;
    } catch (error) {
      console.error('Form submission error:', error);
      submitError.value = error instanceof Error ? error.message : 'An unexpected error occurred';
    } finally {
      isSubmitting.value = false;
    }
  });

  const handleFileChange = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      // Store file using noSerialize to prevent serialization errors
      transactionScreenshot.value = noSerialize(file);
      fileName.value = file.name;
      
      // Resize and compress image before converting to base64
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = function() {
        // Calculate new dimensions (configurable max size)
        const maxSize = parseInt(import.meta.env.VITE_IMAGE_MAX_SIZE) || 800;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress image
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convert to base64 with compression (configurable quality for JPEG)
        const quality = parseFloat(import.meta.env.VITE_IMAGE_QUALITY) || 0.7;
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        imageBase64.value = compressedBase64;
        console.log('Image resized and compressed, original size:', file.size, 'base64 size:', compressedBase64.length);
      };
      
      // Create object URL for the image
      const objectURL = URL.createObjectURL(file);
      img.src = objectURL;
    }
  });

  return (
    <section id="early-access" class="py-20 bg-black/30">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-6">Get Early Access</h2>
          <p class="text-xl text-gray-300">
            Join 500+ companies already interested in our platform. Be first to access when we launch.
          </p>
        </div>

        <div class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8" style={{ minHeight: '600px' }}>
          {/* Always render error container to prevent layout shift */}
          <div class={`mb-6 transition-opacity duration-200 ${submitError.value ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
            <div class="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p class="text-red-400">{submitError.value || ''}</p>
            </div>
          </div>
          
          {!isSubmitted.value ? (
            <form onSubmit$={$(async (e) => { 
              e.preventDefault(); 
              console.log('Form onSubmit$ triggered');
              await handleSubmit(); 
            })}>
              <div class="space-y-6">
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-white font-medium mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email.value}
                      onInput$={(e) => { email.value = (e.target as HTMLInputElement).value; }}
                      class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="your.email@company.com"
                    />
                  </div>
                  <div>
                    <label class="block text-white font-medium mb-2">Company Name</label>
                    <input
                      type="text"
                      value={company.value}
                      onInput$={(e) => { company.value = (e.target as HTMLInputElement).value; }}
                      class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-white font-medium mb-2">Your Role</label>
                    <select
                      value={role.value}
                      onChange$={(e) => { role.value = (e.target as HTMLSelectElement).value; }}
                      class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    <label class="block text-white font-medium mb-2">Primary Interest</label>
                    <select
                      value={usecase.value}
                      onChange$={(e) => { usecase.value = (e.target as HTMLSelectElement).value; }}
                      class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                  <label class="block text-white font-medium mb-2">Investment Interest (Optional)</label>
                  <select
                    value={investment.value}
                    onChange$={(e) => { investment.value = (e.target as HTMLSelectElement).value; }}
                    class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                  >
                    <option value="">Not interested in investing</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000+">$50,000+</option>
                  </select>
                </div>

                {/* Crypto Donation Verification Section */}
                <div class="border-t border-white/10 pt-6">
                  <h4 class="text-lg font-semibold text-white mb-4">Crypto Donation Verification (Optional)</h4>
                  <p class="text-gray-400 text-sm mb-4">
                    If you've made a donation via USDC or USDT, please provide transaction details for verification and acknowledgment.
                  </p>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block text-white font-medium mb-2">Transaction Hash</label>
                      <input
                        type="text"
                        value={transactionHash.value}
                        onInput$={(e) => { transactionHash.value = (e.target as HTMLInputElement).value; }}
                        class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="Enter transaction hash"
                      />
                    </div>
                    <div>
                      <label class="block text-white font-medium mb-2">Donation Amount</label>
                      <input
                        type="text"
                        value={donationAmount.value}
                        onInput$={(e) => { donationAmount.value = (e.target as HTMLInputElement).value; }}
                        class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        placeholder="e.g., 50 USDC"
                      />
                    </div>
                  </div>

                  <div class="mt-4">
                    <label class="block text-white font-medium mb-2">Transaction Screenshot *</label>
                    <div class="relative">
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange$={handleFileChange}
                        class="w-full px-4 py-3 bg-black/20 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                      />
                      {fileName.value && (
                        <p class="text-green-400 text-sm mt-2">
                          ✓ Screenshot uploaded: {fileName.value}
                        </p>
                      )}
                    </div>
                    <p class="text-gray-400 text-xs mt-2">
                      <strong class="text-red-400">Required:</strong> Upload a screenshot of your wallet transaction for verification purposes. This helps us track and acknowledge your contribution.
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting.value || !email.value || !imageBase64.value}
                  class="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25"
                  style={{ minHeight: '56px' }}
                >
                  {isSubmitting.value ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Get Early Access</span>
                      <ArrowRight class="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div class="text-center py-12">
              <CheckCircle class="w-16 h-16 text-green-400 mx-auto mb-6" />
              <h3 class="text-2xl font-bold text-white mb-4">Thank You!</h3>
              <p class="text-gray-300 mb-4">
                We've received your application. Our team will contact you within 48 hours with next steps.
              </p>
              {transactionHash.value && (
                <div class="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mt-4">
                  <p class="text-green-400 font-semibold">Donation Received!</p>
                  <p class="text-gray-300 text-sm">
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
});