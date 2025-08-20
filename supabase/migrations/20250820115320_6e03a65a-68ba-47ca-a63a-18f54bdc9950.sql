
-- Update RLS policies to allow public access for ETA applications
DROP POLICY IF EXISTS "Users can insert their own applications" ON public.eta_applications;
DROP POLICY IF EXISTS "Users can view their own applications" ON public.eta_applications;
DROP POLICY IF EXISTS "Users can update their own applications" ON public.eta_applications;
DROP POLICY IF EXISTS "Users can delete their own applications" ON public.eta_applications;

-- Create new policies that allow public access
CREATE POLICY "Anyone can insert applications" ON public.eta_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view applications by reference" ON public.eta_applications
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update applications by reference" ON public.eta_applications
  FOR UPDATE USING (true);

-- Update payments table policies to allow public access
DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "Users can update their own payments" ON public.payments;

-- Create new policies that allow public access for payments
CREATE POLICY "Anyone can insert payments" ON public.payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view payments by reference" ON public.payments
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update payments by reference" ON public.payments
  FOR UPDATE USING (true);
