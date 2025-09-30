-- Add phone column to support_offers table
ALTER TABLE public.support_offers 
ADD COLUMN phone text;