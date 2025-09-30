import { google } from 'googleapis';

// Extract spreadsheet ID from the URL
const SPREADSHEET_ID = '13T8IK1eKfP-dy7tiXVU3iY4wMn_pAASSpx-u7q5pzJg';

// Service account authentication for Google Sheets
export async function authenticateGoogleSheets() {
  // For now, we'll use API key authentication
  // Later, we can set up service account credentials
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    credentials: {
      // We'll need to ask for Google Service Account credentials
      type: 'service_account',
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_PROJECT_ID,
    },
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

// Function to write pledge data to Google Sheets (Pledges sheet)
export async function writePledgeToSheets(pledgeData: {
  guestName: string;
  guestEmail: string;
  phone?: string;
  supportType: string;
  description: string;
  availability?: string;
  contactPreference: string;
}) {
  try {
    const sheets = await authenticateGoogleSheets();
    
    // Prepare the row data for pledges
    const rowData = [
      new Date().toISOString(), // Timestamp
      pledgeData.guestName,
      pledgeData.guestEmail,
      pledgeData.phone || '',
      pledgeData.supportType,
      pledgeData.description,
      pledgeData.availability || '',
      pledgeData.contactPreference,
    ];

    // Append the data to the Pledges sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Pledges!A:H', // Pledges sheet
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error writing pledge to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

// Function to write donation data to Google Sheets (Donations sheet for successful donations)
export async function writeDonationToSheets(donationData: {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  category: string;
  message?: string;
  paystackReference?: string;
}) {
  try {
    const sheets = await authenticateGoogleSheets();
    
    // Prepare the row data for successful donations
    const rowData = [
      new Date().toISOString(), // Timestamp
      donationData.donorName,
      donationData.donorEmail,
      donationData.amount,
      donationData.currency,
      donationData.category,
      donationData.message || '',
      donationData.paystackReference || '',
      'Completed' // Status
    ];

    // Append the data to the Donations sheet for successful donations
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Donations!A:I', // Donations sheet for successful payments
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error writing donation to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

// Function to write gift data to Google Sheets (Gifts sheet)
export async function writeGiftToSheets(giftData: {
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  category: string;
  message?: string;
  paystackReference?: string;
}) {
  try {
    const sheets = await authenticateGoogleSheets();
    
    // Prepare the row data for gift donations
    const rowData = [
      new Date().toISOString(), // Timestamp
      giftData.donorName,
      giftData.donorEmail,
      giftData.amount,
      giftData.currency,
      giftData.category,
      giftData.message || '',
      giftData.paystackReference || '',
      'Gift' // Type
    ];

    // Append the data to the Gifts sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Gifts!A:I', // Gifts sheet for gift donations
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error writing gift to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}

// Function to write monetary pledge data to Google Sheets (Pledges sheet)
export async function writeMonetaryPledgeToSheets(pledgeData: {
  pledgerName: string;
  pledgerEmail: string;
  pledgerPhone?: string;
  amount: number;
  currency: string;
  category: string;
  message?: string;
}) {
  try {
    const sheets = await authenticateGoogleSheets();
    
    // Prepare the row data for monetary pledges
    const rowData = [
      new Date().toISOString(), // Timestamp
      pledgeData.pledgerName,
      pledgeData.pledgerEmail,
      pledgeData.pledgerPhone || '',
      `${pledgeData.amount} ${pledgeData.currency}`,
      pledgeData.category,
      pledgeData.message || '',
      'MONETARY_PLEDGE', // Type indicator
    ];

    // Append the data to the Pledges sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Pledges!A:H', // Pledges sheet
      valueInputOption: 'RAW',
      requestBody: {
        values: [rowData],
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error writing monetary pledge to Google Sheets:', error);
    return { success: false, error: error.message };
  }
}