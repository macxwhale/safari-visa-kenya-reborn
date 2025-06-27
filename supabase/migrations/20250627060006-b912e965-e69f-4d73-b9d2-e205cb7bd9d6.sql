
-- Create RLS policy to allow anyone to upload files
CREATE POLICY "Anyone can upload eta documents" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'eta-documents');

-- Create RLS policy to allow anyone to view eta documents
CREATE POLICY "Anyone can view eta documents" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'eta-documents');

-- Create RLS policy to allow anyone to update eta documents
CREATE POLICY "Anyone can update eta documents" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'eta-documents');

-- Create RLS policy to allow anyone to delete eta documents
CREATE POLICY "Anyone can delete eta documents" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'eta-documents');
