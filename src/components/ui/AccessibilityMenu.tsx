
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Settings, Mic, Eye, Smartphone } from 'lucide-react';
import { useHighContrast } from '@/hooks/useHighContrast';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useBiometric } from '@/hooks/useBiometric';

export const AccessibilityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isHighContrast, toggleHighContrast } = useHighContrast();
  const { permission, requestPermission } = usePushNotifications();
  const { isSupported: biometricSupported, isRegistered, registerBiometric } = useBiometric();

  const handleBiometricToggle = async () => {
    if (!isRegistered) {
      await registerBiometric('current-user-id');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-background border"
          aria-label="Accessibility Settings"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      
      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Accessibility & Features
          </SheetTitle>
        </SheetHeader>
        
        <div className="space-y-6 mt-6">
          {/* Visual Accessibility */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <h3 className="font-medium">Visual</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast" className="flex-1">
                High Contrast Mode
                <span className="block text-sm text-muted-foreground">
                  Improve text visibility
                </span>
              </Label>
              <Switch
                id="high-contrast"
                checked={isHighContrast}
                onCheckedChange={toggleHighContrast}
              />
            </div>
          </div>

          <Separator />

          {/* Voice Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4" />
              <h3 className="font-medium">Voice Input</h3>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Voice input is available in form fields. Look for the microphone icon to start speaking.
            </div>
          </div>

          <Separator />

          {/* Device Features */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <h3 className="font-medium">Device Features</h3>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="flex-1">
                Push Notifications
                <span className="block text-sm text-muted-foreground">
                  Get updates about your application
                </span>
              </Label>
              <Switch
                id="notifications"
                checked={permission === 'granted'}
                onCheckedChange={requestPermission}
              />
            </div>

            {biometricSupported && (
              <div className="flex items-center justify-between">
                <Label htmlFor="biometric" className="flex-1">
                  Biometric Authentication
                  <span className="block text-sm text-muted-foreground">
                    Use fingerprint or face ID
                  </span>
                </Label>
                <Switch
                  id="biometric"
                  checked={isRegistered}
                  onCheckedChange={handleBiometricToggle}
                />
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
