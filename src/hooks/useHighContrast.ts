
import { useState, useEffect } from 'react';

export const useHighContrast = () => {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    // Check for user preference
    const savedPreference = localStorage.getItem('high-contrast-mode');
    const systemPreference = window.matchMedia('(prefers-contrast: high)').matches;
    
    const shouldUseHighContrast = savedPreference === 'true' || 
      (savedPreference === null && systemPreference);
    
    setIsHighContrast(shouldUseHighContrast);
    
    // Apply high contrast class to document
    if (shouldUseHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, []);

  const toggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('high-contrast-mode', newValue.toString());
    
    if (newValue) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  return {
    isHighContrast,
    toggleHighContrast
  };
};
