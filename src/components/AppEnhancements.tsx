
import { useEffect } from 'react';
import { AccessibilityMenu } from '@/components/ui/AccessibilityMenu';
import { useServiceWorker } from '@/hooks/useServiceWorker';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useBiometric } from '@/hooks/useBiometric';

export const AppEnhancements = () => {
  const { isOnline, updateAvailable, updateApp } = useServiceWorker();
  const { checkSupport: checkNotificationSupport } = usePushNotifications();
  const { checkSupport: checkBiometricSupport } = useBiometric();

  useEffect(() => {
    // Initialize all advanced features
    checkNotificationSupport();
    checkBiometricSupport();
  }, [checkNotificationSupport, checkBiometricSupport]);

  useEffect(() => {
    // Show offline indicator
    if (!isOnline) {
      document.body.classList.add('offline');
    } else {
      document.body.classList.remove('offline');
    }
  }, [isOnline]);

  return (
    <>
      <AccessibilityMenu />
      
      {/* Offline indicator */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 bg-destructive text-destructive-foreground text-center py-2 text-sm z-50">
          You're offline. Some features may be limited.
        </div>
      )}

      {/* Update notification */}
      {updateAvailable && (
        <div className="fixed top-0 left-0 right-0 bg-info text-info-foreground text-center py-2 text-sm z-50">
          <button onClick={updateApp} className="underline">
            Update available - Click to refresh
          </button>
        </div>
      )}
    </>
  );
};
