import type { RequestHandler } from '@builder.io/qwik-city';
import { SignJWT } from 'jose';

// Google Sheets configuration from environment variables (server-side only)
const getConfig = () => ({
  spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
  sheetName: process.env.GOOGLE_SHEETS_NAME || 'Early Access Applications',
  serviceAccount: {
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    projectId: process.env.GOOGLE_SERVICE_ACCOUNT_PROJECT_ID,
  }
});

// JWT token generation for Google Sheets API
async function getAccessToken(serviceAccount: any) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccount.email,
      scope: 'https://www.googleapis.com/auth/spreadsheets',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600,
      iat: now,
    };

    // Create private key from PEM string
    const privateKeyPem = serviceAccount.privateKey;
    if (!privateKeyPem) {
      throw new Error('Private key not found in environment variables');
    }

    const jwt = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'RS256' })
      .sign(await importPrivateKey(privateKeyPem));

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Token request failed: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    if (!data.access_token) {
      throw new Error('No access token received');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

// Helper function to import private key
async function importPrivateKey(privateKeyPem: string) {
  const binaryDer = pemToBinary(privateKeyPem);
  return await crypto.subtle.importKey(
    'pkcs8',
    binaryDer,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );
}

// Convert PEM to binary
function pemToBinary(pem: string): ArrayBuffer {
  const pemHeader = '-----BEGIN PRIVATE KEY-----';
  const pemFooter = '-----END PRIVATE KEY-----';
  const pemContents = pem.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
  const binaryString = atob(pemContents);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export const onPost: RequestHandler = async ({ request, json, status }) => {
  try {
    console.log('API Route called: /api/sheets/submit');

    const formData = await request.json();
    console.log('Received form data keys:', Object.keys(formData));
    console.log('Form data (excluding screenshot):', {
      ...formData,
      screenshot: formData.screenshot ? `[IMAGE_DATA_${formData.screenshot.length}_CHARS]` : null
    });
    
    const config = getConfig();
    console.log('Config loaded:', { 
      spreadsheetId: config.spreadsheetId, 
      sheetName: config.sheetName,
      hasEmail: !!config.serviceAccount.email,
      hasPrivateKey: !!config.serviceAccount.privateKey
    });

    // Validate required configuration
    if (!config.spreadsheetId || !config.serviceAccount.email || !config.serviceAccount.privateKey) {
      console.error('Missing required environment variables');
      status(500);
      json(500, { 
        success: false, 
        error: 'Server configuration error: Missing Google Sheets credentials' 
      });
      return;
    }
    
    // Generate hash from form data for uniqueness (excluding timestamp and screenshot to prevent duplicates)
    // Create a deterministic string by concatenating fields in alphabetical order
    const formDataForHash = [
      'company:', formData.company || '',
      'donationAmount:', formData.donationAmount || '',
      'email:', formData.email || '',
      'investment:', formData.investment || '',
      'role:', formData.role || '',
      'transactionHash:', formData.transactionHash || '',
      'usecase:', formData.usecase || ''
    ].join('|');

    // Debug logging
    console.log('Original form data:', {
      email: formData.email,
      company: formData.company,
      role: formData.role,
      usecase: formData.usecase,
      investment: formData.investment,
      transactionHash: formData.transactionHash,
      donationAmount: formData.donationAmount,
      screenshot: formData.screenshot ? `[${formData.screenshot.length} chars]` : null
    });
    console.log('Hash input string:', formDataForHash);

    // Create SHA-256 hash of form data
    const encoder = new TextEncoder();
    const data = encoder.encode(formDataForHash);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const shortHash = hashHex.substring(0, 16); // Use first 16 characters

    console.log('Generated hash:', shortHash);

    // Check for duplicates before submitting
    try {
      const accessTokenForRead = await getAccessToken(config.serviceAccount);
      const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${config.sheetName}!A:A`;

      const readResponse = await fetch(readUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessTokenForRead}`
        }
      });

      if (readResponse.ok) {
        const readResult = await readResponse.json();
        const existingHashes = readResult.values ? readResult.values.flat() : [];

        if (existingHashes.includes(shortHash)) {
          console.log('🔄 DUPLICATE SUBMISSION BLOCKED:', shortHash);
          status(409); // Conflict status
          json(409, {
            success: false,
            error: 'Duplicate submission detected. This form has already been submitted with identical data.',
            hash: shortHash
          });
          return;
        } else {
          console.log('✅ UNIQUE SUBMISSION:', shortHash, `(checked against ${existingHashes.length} existing hashes)`);
        }
      }
    } catch (duplicateCheckError) {
      console.warn('⚠️ Could not check for duplicates:', duplicateCheckError);
      // Continue with submission even if duplicate check fails
    }

    // Convert form data to array format for Google Sheets (hash first, then shift all data right)
    const rowData = [
      shortHash,                             // Column A: Hash
      formData.email || '',                  // Column B: Email (was A)
      formData.company || '',                // Column C: Company (was B)
      formData.role || '',                   // Column D: Role (was C)
      formData.usecase || '',                // Column E: Use Case (was D)
      formData.investment || '',             // Column F: Investment (was E)
      formData.transactionHash || '',        // Column G: Transaction Hash (was F)
      formData.donationAmount || '',         // Column H: Donation Amount (was G)
      formData.screenshot || '',             // Column I: Screenshot (was H)
      new Date().toISOString()               // Column J: Timestamp (was I)
    ];

    console.log('Row data to insert:', rowData);

    // Get access token
    console.log('Getting access token...');
    const accessToken = await getAccessToken(config.serviceAccount);
    console.log('Access token obtained');

    // Make request to Google Sheets API (now includes screenshot column)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${config.sheetName}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    console.log('Google Sheets URL:', url);
    
    const requestBody = {
      values: [rowData],
      majorDimension: 'ROWS',
    };

    console.log('Making request to Google Sheets...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Google Sheets response status:', response.status);

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Google Sheets API Error:', response.status, errorBody);
      status(500);
      json(500, { 
        success: false, 
        error: `Google Sheets API Error: ${response.status} ${response.statusText} - ${errorBody}` 
      });
      return;
    }

    const result = await response.json();
    console.log('Success! Google Sheets response:', result);
    
    json(200, { success: true, result });

  } catch (error) {
    console.error('Error in API route:', error);
    status(500);
    json(500, { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};