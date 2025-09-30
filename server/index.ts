import express from 'express';
import cors from 'cors';
import path from 'path';
import { db } from './db';
import { donations, pledges, supportOffers, guestInformation } from '../shared/schema';
import { eq, and } from 'drizzle-orm';
import { writePledgeToSheets, writeDonationToSheets, writeGiftToSheets, writeMonetaryPledgeToSheets } from './google-sheets';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

// Enable CORS for all origins in development
const corsOptions = {
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files from the build directory with proper caching headers
app.use(express.static(path.join(process.cwd(), 'dist'), {
  maxAge: process.env.NODE_ENV === 'production' ? '1y' : '0',
  setHeaders: (res, path) => {
    // Disable caching for HTML files to ensure client-side routing works
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
    }
  }
}));

// CORS is handled by the cors middleware above

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Get all donations
app.get('/api/donations', async (req, res) => {
  try {
    console.log('Fetching all donations...');
    const allDonations = await db
      .select()
      .from(donations)
      .orderBy(donations.createdAt);

    console.log('All donations fetched:', allDonations.length, 'records');
    res.json(allDonations);
  } catch (error) {
    console.error('Error fetching all donations:', error);
    res.status(500).json({ error: 'Failed to fetch donations', details: error.message });
  }
});

// Get donation amounts by category
app.get('/api/donations/amounts', async (req, res) => {
  try {
    console.log('Fetching donation amounts...');
    const donationData = await db
      .select({
        category: donations.category,
        amount: donations.amount,
      })
      .from(donations)
      .where(eq(donations.status, 'completed'));

    console.log('Donation data fetched:', donationData.length, 'records');

    const amounts = {
      pastry: 0,
      photo_video: 0,
      entertainment: 0,
      styling: 0
    };

    donationData.forEach((donation) => {
      amounts[donation.category as keyof typeof amounts] += donation.amount;
    });

    console.log('Amounts calculated:', amounts);
    res.json(amounts);
  } catch (error) {
    console.error('Error fetching donation amounts:', error);
    console.error('Error details:', error.message, error.stack);
    res.status(500).json({ error: 'Failed to fetch donation amounts', details: error.message });
  }
});

// Create a new donation
app.post('/api/donations', async (req, res) => {
  try {
    const donationData = req.body;
    
    const newDonation = await db
      .insert(donations)
      .values({
        donorName: donationData.donor_name,
        donorEmail: donationData.donor_email,
        amount: donationData.amount,
        currency: donationData.currency || 'KES',
        category: donationData.category,
        message: donationData.message,
        paystackReference: donationData.paystack_reference,
        status: donationData.status || 'pending',
      })
      .returning();

    // Also write to Google Sheets if donation is completed
    if (donationData.status === 'completed') {
      try {
        // Check if this is a gift donation or regular donation based on category or other criteria
        const isGift = donationData.message && donationData.message.toLowerCase().includes('gift');
        
        if (isGift) {
          await writeGiftToSheets({
            donorName: donationData.donor_name,
            donorEmail: donationData.donor_email,
            amount: donationData.amount,
            currency: donationData.currency || 'KES',
            category: donationData.category,
            message: donationData.message,
            paystackReference: donationData.paystack_reference,
          });
        } else {
          await writeDonationToSheets({
            donorName: donationData.donor_name,
            donorEmail: donationData.donor_email,
            amount: donationData.amount,
            currency: donationData.currency || 'KES',
            category: donationData.category,
            message: donationData.message,
            paystackReference: donationData.paystack_reference,
          });
        }
      } catch (error) {
        console.log('Failed to write to Google Sheets, but donation saved to database');
      }
    }

    res.json(newDonation[0]);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// Get all support offers
app.get('/api/support-offers', async (req, res) => {
  try {
    console.log('Fetching all support offers...');
    const allOffers = await db
      .select()
      .from(supportOffers)
      .orderBy(supportOffers.createdAt);

    console.log('All support offers fetched:', allOffers.length, 'records');
    res.json(allOffers);
  } catch (error) {
    console.error('Error fetching all support offers:', error);
    res.status(500).json({ error: 'Failed to fetch support offers', details: error.message });
  }
});

// Create a new support offer
app.post('/api/support-offers', async (req, res) => {
  try {
    const offerData = req.body;
    
    const newOffer = await db
      .insert(supportOffers)
      .values({
        guestName: offerData.guest_name,
        guestEmail: offerData.guest_email,
        supportType: offerData.support_type,
        description: offerData.description,
        availability: offerData.availability,
        contactPreference: offerData.contact_preference || 'email',
        phone: offerData.phone,
      })
      .returning();

    // Also write to Google Sheets
    try {
      await writePledgeToSheets({
        guestName: offerData.guest_name,
        guestEmail: offerData.guest_email,
        phone: offerData.phone,
        supportType: offerData.support_type,
        description: offerData.description,
        availability: offerData.availability,
        contactPreference: offerData.contact_preference || 'email',
      });
    } catch (error) {
      console.log('Failed to write to Google Sheets, but support offer saved to database');
    }

    res.json(newOffer[0]);
  } catch (error) {
    console.error('Error creating support offer:', error);
    res.status(500).json({ error: 'Failed to create support offer' });
  }
});

// Get all pledges
app.get('/api/pledges', async (req, res) => {
  try {
    console.log('Fetching all pledges...');
    const allPledges = await db
      .select()
      .from(pledges)
      .orderBy(pledges.createdAt);

    console.log('All pledges fetched:', allPledges.length, 'records');
    res.json(allPledges);
  } catch (error) {
    console.error('Error fetching all pledges:', error);
    res.status(500).json({ error: 'Failed to fetch pledges', details: error.message });
  }
});

// Get pledge amounts by category
app.get('/api/pledges/amounts', async (req, res) => {
  try {
    console.log('Fetching pledge amounts...');
    const pledgeData = await db
      .select({
        category: pledges.category,
        amount: pledges.amount,
      })
      .from(pledges)
      .where(eq(pledges.status, 'pending'));

    console.log('Pledge data fetched:', pledgeData.length, 'records');

    const amounts = {
      pastry: 0,
      photo_video: 0,
      entertainment: 0,
      styling: 0
    };

    pledgeData.forEach((pledge) => {
      amounts[pledge.category as keyof typeof amounts] += pledge.amount;
    });

    console.log('Pledge amounts calculated:', amounts);
    res.json(amounts);
  } catch (error) {
    console.error('Error fetching pledge amounts:', error);
    res.status(500).json({ error: 'Failed to fetch pledge amounts', details: error.message });
  }
});

// Create a new pledge
app.post('/api/pledges', async (req, res) => {
  try {
    const pledgeData = req.body;
    
    const newPledge = await db
      .insert(pledges)
      .values({
        pledgerName: pledgeData.pledger_name,
        pledgerEmail: pledgeData.pledger_email,
        pledgerPhone: pledgeData.pledger_phone,
        amount: pledgeData.amount,
        currency: pledgeData.currency || 'KES',
        category: pledgeData.category,
        message: pledgeData.message,
        status: 'pending',
      })
      .returning();

    // Also write to Google Sheets
    try {
      await writeMonetaryPledgeToSheets({
        pledgerName: pledgeData.pledger_name,
        pledgerEmail: pledgeData.pledger_email,
        pledgerPhone: pledgeData.pledger_phone,
        amount: pledgeData.amount,
        currency: pledgeData.currency || 'KES',
        category: pledgeData.category,
        message: pledgeData.message,
      });
    } catch (error) {
      console.log('Failed to write pledge to Google Sheets, but pledge saved to database');
    }

    res.json(newPledge[0]);
  } catch (error) {
    console.error('Error creating pledge:', error);
    res.status(500).json({ error: 'Failed to create pledge' });
  }
});

// Create guest information
app.post('/api/guest-information', async (req, res) => {
  try {
    const guestData = req.body;
    
    const newGuest = await db
      .insert(guestInformation)
      .values({
        fullName: guestData.full_name,
        email: guestData.email,
        phone: guestData.phone,
        dietaryRestrictions: guestData.dietary_restrictions,
        accessibilityNeeds: guestData.accessibility_needs,
        plusOneName: guestData.plus_one_name,
        plusOneDietary: guestData.plus_one_dietary,
        specialRequests: guestData.special_requests,
        accommodationNeeded: guestData.accommodation_needed || false,
        transportNeeded: guestData.transport_needed || false,
      })
      .returning();

    res.json(newGuest[0]);
  } catch (error) {
    console.error('Error creating guest information:', error);
    res.status(500).json({ error: 'Failed to create guest information' });
  }
});

// Catch-all handler for React app routes - must be last
app.use((req, res) => {
  // Skip API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'), (err) => {
    if (err) {
      res.status(500).send('Error loading page');
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  console.log(`📱 Frontend available at http://0.0.0.0:${PORT}`);
  console.log(`🔌 API endpoints available at http://0.0.0.0:${PORT}/api/*`);
});

export default app;