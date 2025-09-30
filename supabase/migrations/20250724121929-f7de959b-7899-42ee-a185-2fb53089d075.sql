-- Create donations table to track real donation data
CREATE TABLE public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_name TEXT NOT NULL,
  donor_email TEXT NOT NULL,
  amount INTEGER NOT NULL, -- Amount in cents/minor units
  currency TEXT DEFAULT 'KES',
  category TEXT NOT NULL CHECK (category IN ('pastry', 'photo_video', 'entertainment', 'styling')),
  message TEXT,
  paystack_reference TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view completed donations (for public progress tracking)
CREATE POLICY "Anyone can view completed donations" 
ON public.donations 
FOR SELECT 
USING (status = 'completed');

-- Allow inserting new donations (for payment processing)
CREATE POLICY "Anyone can insert donations" 
ON public.donations 
FOR INSERT 
WITH CHECK (true);

-- Allow updating donation status (for payment processing)
CREATE POLICY "Anyone can update donation status" 
ON public.donations 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_donations_updated_at
BEFORE UPDATE ON public.donations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for the donations table
ALTER TABLE public.donations REPLICA IDENTITY FULL;
ALTER publication supabase_realtime ADD TABLE public.donations;