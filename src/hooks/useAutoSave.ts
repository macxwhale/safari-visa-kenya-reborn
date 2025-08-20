
import { useEffect, useRef } from 'react';
import { ApplicationFormState } from './useApplicationForm';

interface UseAutoSaveProps {
  data: ApplicationFormState;
  onSave: (data: ApplicationFormState) => void;
  delay?: number;
  enabled?: boolean;
}

export const useAutoSave = ({ 
  data, 
  onSave, 
  delay = 3000, 
  enabled = true 
}: UseAutoSaveProps) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const previousDataRef = useRef<ApplicationFormState>(data);

  useEffect(() => {
    if (!enabled) return;

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Check if data has actually changed
    const hasChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (hasChanged) {
      // Set new timeout for auto-save
      timeoutRef.current = setTimeout(() => {
        onSave(data);
        previousDataRef.current = { ...data };
        console.log('Form auto-saved at:', new Date().toISOString());
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay, enabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
