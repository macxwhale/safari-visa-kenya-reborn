
import { supabase } from "@/integrations/supabase/client";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";

const UPLOAD_TIMEOUT = 60000; // Increased to 60 seconds
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];

interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

const validateFile = (file: File): FileValidationResult => {
  console.log('Validating file:', {
    name: file.name,
    size: file.size,
    type: file.type
  });

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds maximum allowed size of 10MB`
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: `File type "${file.type}" is not supported. Please use JPEG, PNG, GIF, or PDF files.`
    };
  }

  return { isValid: true };
};

const uploadWithRetry = async (file: File, fileName: string, maxRetries: number = 3): Promise<any> => {
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`Upload attempt ${attempt}/${maxRetries} for file: ${fileName}`);
    
    try {
      const uploadResult = await withTimeout(
        supabase.storage
          .from("eta-documents")
          .upload(`public/${fileName}`, file),
        UPLOAD_TIMEOUT,
        `Upload timed out after ${UPLOAD_TIMEOUT / 1000} seconds`
      );

      console.log('Upload result:', uploadResult);
      return uploadResult;
    } catch (error) {
      console.error(`Upload attempt ${attempt} failed:`, error);
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = 1000 * attempt; // Progressive delay
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

export const uploadCriticalFile = async (file: File, type: string): Promise<string> => {
  console.log(`Starting critical file upload for ${type}:`, {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  });

  // Validate file before attempting upload
  const validation = validateFile(file);
  if (!validation.isValid) {
    console.error('File validation failed:', validation.error);
    throw new Error(validation.error);
  }

  const fileName = `${Date.now()}_${type}_${file.name}`;
  console.log('Generated filename:', fileName);

  const { data, error } = await safeAsync(async () => {
    return uploadWithRetry(file, fileName);
  }, `Failed to upload ${type} document`);

  if (error) {
    console.error(`Critical upload failed for ${type}:`, error);
    throw new Error(`${type} upload failed: ${error}`);
  }

  if (!data?.data) {
    console.error('Upload succeeded but no data returned:', data);
    throw new Error(`Upload completed but no file path returned for ${type} document`);
  }

  console.log(`Successfully uploaded ${type} document:`, data.data.path);
  return data.data.path;
};

export const uploadOptionalFile = async (file: File, type: string): Promise<void> => {
  console.log(`Starting optional file upload for ${type}:`, {
    fileName: file.name,
    fileSize: file.size,
    fileType: file.type
  });

  // Validate file before attempting upload
  const validation = validateFile(file);
  if (!validation.isValid) {
    console.warn(`Optional file validation failed for ${type}:`, validation.error);
    return; // Don't throw for optional files, just log and return
  }

  const fileName = `${Date.now()}_${type}_${file.name}`;
  
  const { error } = await safeAsync(async () => {
    return uploadWithRetry(file, fileName, 2); // Fewer retries for optional files
  });

  if (error) {
    console.error(`Optional upload failed for ${type}:`, error);
    // Don't throw for optional files, just log the error
  } else {
    console.log(`Successfully uploaded optional ${type} document`);
  }
};
