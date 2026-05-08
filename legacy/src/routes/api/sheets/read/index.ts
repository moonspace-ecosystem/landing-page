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
      scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
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

export const onGet: RequestHandler = async ({ json, status }) => {
  try {
    console.log('API Route called: /api/sheets/read');

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

    // Get access token
    console.log('Getting access token...');
    const accessToken = await getAccessToken(config.serviceAccount);
    console.log('Access token obtained');

    // Read data from Google Sheets - columns A to K (now includes hash column A + original data B-J + validation K)
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values/${config.sheetName}!A:K`;
    console.log('Google Sheets URL:', url);

    console.log('Making request to Google Sheets...');
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
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
    console.log('Success! Google Sheets response rows:', result.values?.length || 0);
    console.log('Raw Google Sheets data:', JSON.stringify(result, null, 2));

    // Calculate validated donations
    const rows = result.values || [];
    let totalValidatedDonations = 0;
    let validatedCount = 0;

    console.log('Processing rows:', rows.length);
    console.log('Row 0:', JSON.stringify(rows[0]));

    // Detect data format: check if first data row has hash pattern in column A
    let hasHashColumn = false;
    let hasHeader = false;
    let startIndex = 0;

    if (rows.length > 0 && rows[0]) {
      // Check if first row is a header
      hasHeader = rows[0][0] &&
        (rows[0][0].toLowerCase().includes('hash') ||
         rows[0][1] && rows[0][1].toLowerCase().includes('email') ||
         rows[0][1] && rows[0][1].toLowerCase().includes('name') ||
         rows[0][2] && rows[0][2].toLowerCase().includes('name'));

      startIndex = hasHeader ? 1 : 0;

      // Check if data format has hash column by examining first data row
      if (rows.length > startIndex) {
        const firstDataRow = rows[startIndex];
        // Hash should be a 16-character hexadecimal string in column A
        hasHashColumn = firstDataRow[0] &&
          typeof firstDataRow[0] === 'string' &&
          firstDataRow[0].length === 16 &&
          /^[a-f0-9]{16}$/i.test(firstDataRow[0]);
      }
    }

    console.log('Data format detection:', { hasHeader, hasHashColumn, startIndex });
    console.log('First few rows for analysis:', rows.slice(0, 3));

    // Process data rows with duplicate detection
    const seenHashes = new Map<string, { rowIndex: number, data: any }>();
    let duplicateCount = 0;

    for (let i = startIndex; i < rows.length; i++) {
      const row = rows[i];
      console.log(`Processing row ${i}:`, JSON.stringify(row));

      let donationAmount, isValidated, email, hash, timestamp;

      if (hasHashColumn) {
        // New format: Hash in A, Email in B, Amount in H, Validation in K, Timestamp in J
        hash = row[0]; // Column A: Hash
        email = row[1]; // Column B: Email
        donationAmount = row[7]; // Column H: Donation Amount
        timestamp = row[9]; // Column J: Timestamp
        isValidated = row[10]; // Column K: Validation
        console.log(`Row ${i} (NEW FORMAT): Hash="${hash}", Email="${email}", Amount="${donationAmount}", Validated="${isValidated}"`);
      } else {
        // Old format: Email in A, Amount in G, Validation in J, Timestamp in I
        email = row[0]; // Column A: Email
        donationAmount = row[6]; // Column G: Donation Amount
        timestamp = row[8]; // Column I: Timestamp
        isValidated = row[9]; // Column J: Validation
        hash = 'legacy'; // No hash for old data
        console.log(`Row ${i} (OLD FORMAT): Email="${email}", Amount="${donationAmount}", Validated="${isValidated}"`);
      }

      // Handle duplicate detection for entries with hash
      let shouldProcessForValidation = true;

      if (hash && hash !== 'legacy') {
        if (seenHashes.has(hash)) {
          duplicateCount++;
          console.log(`🔄 DUPLICATE DETECTED: Hash "${hash}" already seen. Skipping duplicate entry at row ${i}.`);
          shouldProcessForValidation = false; // Skip validation processing for duplicates
        } else {
          seenHashes.set(hash, {
            rowIndex: i,
            data: { email, donationAmount, isValidated, timestamp }
          });
        }
      }

      // Only process for validation if not a duplicate
      if (shouldProcessForValidation) {
        // Check if donation is validated (true) and has an amount - case insensitive
        if (isValidated === 'true' || isValidated === 'TRUE' || isValidated === true || isValidated === 'True') {
          const amount = parseFloat(donationAmount);
          if (!isNaN(amount) && amount > 0) {
            totalValidatedDonations += amount;
            validatedCount++;
            console.log(`✅ VALID: Added $${amount} to total`);
          } else {
            console.log(`⚠️ INVALID AMOUNT: "${donationAmount}" cannot be parsed`);
          }
        } else {
          console.log(`❌ NOT VALIDATED: "${isValidated}" !== "true"`);
        }
      }
    }

    console.log(`🔍 Duplicate detection results: Found ${duplicateCount} duplicate entries`);

    console.log('Final results:', {
      totalValidatedDonations,
      validatedCount,
      totalRows: rows.length - (hasHeader ? 1 : 0),
      duplicateCount,
      uniqueEntries: seenHashes.size
    });

    json(200, {
      success: true,
      data: {
        totalRows: rows.length - (hasHeader ? 1 : 0), // Exclude header if exists
        validatedCount,
        totalValidatedDonations,
        duplicateCount, // Number of duplicate entries found
        uniqueEntries: seenHashes.size, // Number of unique entries after deduplication
        rawData: result.values // Include raw data for debugging if needed
      }
    });

  } catch (error) {
    console.error('Error in API route:', error);
    status(500);
    json(500, {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};