
import { supabase } from "@/integrations/supabase/client";
import { safeAsync, withTimeout } from "@/utils/asyncHelpers";

const UPLOAD_TIMEOUT = 60000; // Increased to 60 seconds
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];

interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

const sanitizeFileName = (fileName: string): string => {
  // Get file extension
  const lastDotIndex = fileName.lastIndexOf('.');
  const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
  const extension = lastDotIndex > 0 ? fileName.substring(lastDotIndex) : '';
  
  // Replace problematic characters with safe alternatives
  const sanitizedName = name
    .replace(/[\[\](){}]/g, '_') // Replace brackets and parentheses with underscores
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/[^a-zA-Z0-9._-]/g, '') // Remove any other special characters
    .replace(/_+/g, '_') // Replace multiple underscores with single
    .replace(/^_|_$/g, ''); // Remove leading/trailing underscores
  
  // Ensure we have a valid name
  const finalName = sanitizedName || 'document';
  
  console.log(`Sanitized filename: "${fileName}" -> "${finalName}${extension}"`);
  
  return `${finalName}${extension}`;
};

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

  // Sanitize the original filename
  const sanitizedOriginalName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}_${type}_${sanitizedOriginalName}`;
  console.log('Generated sanitized filename:', fileName);

  const { data, error } = await safeAsync(async () => {
    return uploadWithRetry(file, fileName);
  }, `Failed to upload ${type} document`);

  if (error) {
    console.error(`Critical upload failed for ${type}:`, error);
    
    // Provide more specific error messages based on the error type
    if (error.toString().includes('400') || error.toString().includes('Bad Request')) {
      throw new Error(`${type} upload failed: Invalid file name or format. Please try renaming your file.`);
    } else if (error.toString().includes('413') || error.toString().includes('too large')) {
      throw new Error(`${type} upload failed: File is too large. Maximum size is 10MB.`);
    } else {
      throw new Error(`${type} upload failed: ${error}`);
    }
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

  // Sanitize the original filename
  const sanitizedOriginalName = sanitizeFileName(file.name);
  const fileName = `${Date.now()}_${type}_${sanitizedOriginalName}`;
  console.log('Generated sanitized filename for optional file:', fileName);
  
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
