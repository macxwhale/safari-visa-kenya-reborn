
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
    const errorMsg = errorMessage || (error instanceof Error ? error.message : 'An unexpected error occurred');
    console.error('Async operation failed:', error);
    return { data: null, error: errorMsg };
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
      lastError = error instanceof Error ? error : new Error('Unknown error');
      
      if (attempt === maxRetries) {
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
    new Promise<never>((_, reject) => 
      setTimeout(() => reject(new Error(timeoutMessage)), timeoutMs)
    )
  ]);
};
