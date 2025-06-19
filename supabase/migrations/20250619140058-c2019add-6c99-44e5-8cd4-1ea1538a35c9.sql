
-- Add columns to store OCR-extracted passport information
ALTER TABLE public.eta_applications 
ADD COLUMN ocr_full_name TEXT,
ADD COLUMN ocr_document_number TEXT,
ADD COLUMN ocr_date_of_birth DATE,
ADD COLUMN ocr_validity_date DATE,
ADD COLUMN ocr_extracted_at TIMESTAMP WITH TIME ZONE;

-- Add index for better query performance
CREATE INDEX idx_eta_applications_ocr_document_number ON public.eta_applications(ocr_document_number);
