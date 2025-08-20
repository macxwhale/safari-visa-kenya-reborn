
/**
 * Utility for handling async operations with proper error handling
 */
export const safeAsync = async <T>(
  operation: () => Promise<T>,
  errorMessage?: string
): Promise<{ data: T | null; error: string | null }> => {
  try {
    const data = await operation();
    return { data, error: null };
  } catch (error) {
    // Enhanced error logging with more details
    const errorDetails = {
      originalError: error,
      errorMessage: error instanceof Error ? error.message : 'Unknown error',
      errorStack: error instanceof Error ? error.stack : undefined,
      customMessage: errorMessage
    };
    
    console.error('Async operation failed with details:', errorDetails);
    
    // Return the most specific error message available
    let finalErrorMessage = errorMessage || 'An unexpected error occurred';
    
    if (error instanceof Error) {
      // If we have a custom message, append the original error for context
      finalErrorMessage = errorMessage 
        ? `${errorMessage}: ${error.message}`
        : error.message;
    }
    
    return { data: null, error: finalErrorMessage };
  }
};

/**
 * Utility for retrying async operations
 */
export const retryAsync = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        console.error(`All ${maxRetries} retry attempts failed:`, lastError);
        throw lastError;
      }
      
      console.warn(`Attempt ${attempt} failed, retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
};

/**
 * Utility for adding timeout to async operations
 */
export const withTimeout = <T>(
  operation: Promise<T>,
  timeoutMs: number,
  timeoutMessage: string = 'Operation timed out'
): Promise<T> => {
  return Promise.race([
    operation,
    new Promise<never>((_, reject) => {
      const timeoutId = setTimeout(() => {
        const error = new Error(`${timeoutMessage} (${timeoutMs}ms)`);
        console.error('Operation timed out:', error);
        reject(error);
      }, timeoutMs);
      
      // Clear timeout if operation completes
      operation.finally(() => clearTimeout(timeoutId));
    })
  ]);
};
