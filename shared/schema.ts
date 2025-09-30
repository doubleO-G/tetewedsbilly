import { pgTable, varchar, integer, text, boolean, timestamp, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Donations table for tracking real donation data
export const donations = pgTable('donations', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  donorName: text('donor_name').notNull(),
  donorEmail: text('donor_email').notNull(),
  amount: integer('amount').notNull(), // Amount in cents/minor units
  currency: text('currency').default('KES'),
  category: text('category').notNull(), // Check constraint handled in migration
  message: text('message'),
  paystackReference: text('paystack_reference'),
  status: text('status').default('pending'), // Check constraint handled in migration
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const pledges = pgTable('pledges', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  pledgerName: text('pledger_name').notNull(),
  pledgerEmail: text('pledger_email').notNull(),
  pledgerPhone: text('pledger_phone'),
  amount: integer('amount').notNull(), // Pledged amount in major units (KES)
  currency: text('currency').default('KES'),
  category: text('category').notNull(), // Same categories as donations
  message: text('message'),
  status: text('status').default('pending'), // pending, contacted, fulfilled, cancelled
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Support offers table for non-monetary wedding support
export const supportOffers = pgTable('support_offers', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  guestName: text('guest_name').notNull(),
  guestEmail: text('guest_email').notNull(),
  supportType: text('support_type').notNull(),
  description: text('description').notNull(),
  availability: text('availability'),
  contactPreference: text('contact_preference').default('email'),
  phone: text('phone'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// Guest information table for collecting guest data
export const guestInformation = pgTable('guest_information', {
  id: varchar('id').primaryKey().default(sql`gen_random_uuid()`),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  dietaryRestrictions: text('dietary_restrictions'),
  accessibilityNeeds: text('accessibility_needs'),
  plusOneName: text('plus_one_name'),
  plusOneDietary: text('plus_one_dietary'),
  specialRequests: text('special_requests'),
  accommodationNeeded: boolean('accommodation_needed').default(false),
  transportNeeded: boolean('transport_needed').default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Donation = typeof donations.$inferSelect;
export type NewDonation = typeof donations.$inferInsert;
export type Pledge = typeof pledges.$inferSelect;
export type NewPledge = typeof pledges.$inferInsert;
export type SupportOffer = typeof supportOffers.$inferSelect;
export type NewSupportOffer = typeof supportOffers.$inferInsert;
export type GuestInformation = typeof guestInformation.$inferSelect;
export type NewGuestInformation = typeof guestInformation.$inferInsert;