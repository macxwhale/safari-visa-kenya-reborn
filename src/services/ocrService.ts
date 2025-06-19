
// OCR Service for passport text extraction
export interface OCRResult {
  fullName: string;
  documentNumber: string;
  dateOfBirth: string;
  validityDate: string;
  confidence: number;
}

export interface OCRResponse {
  success: boolean;
  data?: OCRResult;
  error?: string;
}

// Mock OCR function for demonstration - replace with actual OCR service
export const extractPassportData = async (file: File): Promise<OCRResponse> => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data - in production, this would come from an actual OCR service
    const mockData: OCRResult = {
      fullName: "JOHN MICHAEL SMITH",
      documentNumber: "A12345678",
      dateOfBirth: "1990-05-15",
      validityDate: "2030-03-20",
      confidence: 0.95
    };
    
    return {
      success: true,
      data: mockData
    };
  } catch (error) {
    console.error('OCR extraction failed:', error);
    return {
      success: false,
      error: 'Failed to extract passport data'
    };
  }
};

// Function to validate extracted passport data
export const validatePassportData = (data: OCRResult): boolean => {
  const { fullName, documentNumber, dateOfBirth, validityDate } = data;
  
  if (!fullName || !documentNumber || !dateOfBirth || !validityDate) {
    return false;
  }
  
  // Basic validation
  const birthDate = new Date(dateOfBirth);
  const expiryDate = new Date(validityDate);
  const today = new Date();
  
  // Check if dates are valid and make sense
  if (isNaN(birthDate.getTime()) || isNaN(expiryDate.getTime())) {
    return false;
  }
  
  // Check if birth date is not in the future
  if (birthDate > today) {
    return false;
  }
  
  // Check if passport is not expired
  if (expiryDate < today) {
    return false;
  }
  
  return true;
};
