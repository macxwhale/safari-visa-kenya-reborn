
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export const usePushNotifications = () => {
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSupported, setIsSupported] = useState(false);
  const { toast } = useToast();

  const checkSupport = useCallback(() => {
    const supported = 'Notification' in window && 'serviceWorker' in navigator;
    setIsSupported(supported);
    
    if (supported) {
      setPermission(Notification.permission);
    }
    
    return supported;
  }, []);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      toast({
        title: "Notifications Not Supported",
        description: "Your browser doesn't support push notifications",
        variant: "destructive"
      });
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      
      if (result === 'granted') {
        toast({
          title: "Notifications Enabled",
          description: "You'll receive updates about your visa application",
        });
        return true;
      } else {
        toast({
          title: "Notifications Disabled",
          description: "You won't receive push notifications",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error('Failed to request notification permission:', error);
      return false;
    }
  }, [isSupported, toast]);

  const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
    if (permission === 'granted' && isSupported) {
      new Notification(title, {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        ...options
      });
    }
  }, [permission, isSupported]);

  const scheduleNotification = useCallback((title: string, delay: number, options?: NotificationOptions) => {
    setTimeout(() => {
      sendNotification(title, options);
    }, delay);
  }, [sendNotification]);

  return {
    permission,
    isSupported,
    checkSupport,
    requestPermission,
    sendNotification,
    scheduleNotification
  };
};
