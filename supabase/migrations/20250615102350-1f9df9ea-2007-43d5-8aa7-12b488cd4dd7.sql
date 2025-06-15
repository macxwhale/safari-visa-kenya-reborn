
-- Table to store ETA applications
CREATE TABLE public.eta_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  passport TEXT NOT NULL,
  nationality TEXT NOT NULL,
  travel_from TEXT NOT NULL,
  entry_date DATE NOT NULL,
  doc_url TEXT,
  status TEXT NOT NULL DEFAULT 'Under Review',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for user privacy
ALTER TABLE public.eta_applications ENABLE ROW LEVEL SECURITY;

-- Allow users to view ONLY their own applications
CREATE POLICY "Users can view their own applications"
  ON public.eta_applications
  FOR SELECT
  USING (auth.uid() = user_id);

-- Allow users to insert their own applications
CREATE POLICY "Users can insert their own applications"
  ON public.eta_applications
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Allow users to update ONLY their own applications (optional, e.g. for cancel or update before review)
CREATE POLICY "Users can update their own applications"
  ON public.eta_applications
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Allow users to delete ONLY their own applications (optional)
CREATE POLICY "Users can delete their own applications"
  ON public.eta_applications
  FOR DELETE
  USING (auth.uid() = user_id);

-- Storage bucket for application docs (passport etc)
INSERT INTO storage.buckets (id, name, public)
VALUES ('eta-documents', 'eta-documents', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public upload/read for demo; tighten permissions for production
