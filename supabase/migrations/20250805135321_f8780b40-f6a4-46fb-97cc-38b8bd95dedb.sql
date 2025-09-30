-- Create support_offers table for non-monetary wedding support
CREATE TABLE public.support_offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  support_type TEXT NOT NULL,
  description TEXT NOT NULL,
  availability TEXT,
  contact_preference TEXT DEFAULT 'email',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create guest_information table for collecting guest data
CREATE TABLE public.guest_information (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  dietary_restrictions TEXT,
  accessibility_needs TEXT,
  plus_one_name TEXT,
  plus_one_dietary TEXT,
  special_requests TEXT,
  accommodation_needed BOOLEAN DEFAULT false,
  transport_needed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.support_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guest_information ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (wedding guests don't need accounts)
CREATE POLICY "Anyone can view support offers" 
ON public.support_offers 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create support offers" 
ON public.support_offers 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can view guest information" 
ON public.guest_information 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create guest information" 
ON public.guest_information 
FOR INSERT 
WITH CHECK (true);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_support_offers_updated_at
BEFORE UPDATE ON public.support_offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_guest_information_updated_at
BEFORE UPDATE ON public.guest_information
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();