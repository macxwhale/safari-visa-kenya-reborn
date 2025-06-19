
import { useState } from 'react';
import { extractPassportData, OCRResult, validatePassportData } from '@/services/ocrService';

export interface OCRState {
  isProcessing: boolean;
  result: OCRResult | null;
  error: string | null;
  isValidated: boolean;
}

export const useOCR = () => {
  const [ocrState, setOcrState] = useState<OCRState>({
    isProcessing: false,
    result: null,
    error: null,
    isValidated: false
  });

  const processPassportImage = async (file: File) => {
    setOcrState(prev => ({
      ...prev,
      isProcessing: true,
      error: null,
      result: null
    }));

    try {
      const response = await extractPassportData(file);
      
      if (response.success && response.data) {
        const isValid = validatePassportData(response.data);
        
        setOcrState({
          isProcessing: false,
          result: response.data,
          error: null,
          isValidated: isValid
        });
        
        return { success: true, data: response.data, isValid };
      } else {
        setOcrState({
          isProcessing: false,
          result: null,
          error: response.error || 'Failed to process passport image',
          isValidated: false
        });
        
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = 'An error occurred while processing the passport image';
      setOcrState({
        isProcessing: false,
        result: null,
        error: errorMessage,
        isValidated: false
      });
      
      return { success: false, error: errorMessage };
    }
  };

  const clearOCRResult = () => {
    setOcrState({
      isProcessing: false,
      result: null,
      error: null,
      isValidated: false
    });
  };

  return {
    ocrState,
    processPassportImage,
    clearOCRResult
  };
};
