
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export const useServiceWorker = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check support
    const supported = 'serviceWorker' in navigator;
    setIsSupported(supported);

    // Check online status
    setIsOnline(navigator.onLine);
    
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (supported) {
      registerServiceWorker();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      setIsRegistered(true);

      // Check for updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setUpdateAvailable(true);
              toast({
                title: "Update Available",
                description: "A new version is available. Refresh to update.",
              });
            }
          });
        }
      });

      console.log('Service Worker registered successfully');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const updateApp = async () => {
    if (updateAvailable) {
      window.location.reload();
    }
  };

  return {
    isSupported,
    isRegistered,
    isOnline,
    updateAvailable,
    updateApp
  };
};
