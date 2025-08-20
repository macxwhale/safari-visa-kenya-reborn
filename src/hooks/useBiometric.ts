
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface BiometricOptions {
  challenge?: string;
  allowCredentials?: PublicKeyCredentialDescriptor[];
  timeout?: number;
}

export const useBiometric = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { toast } = useToast();

  // Check if WebAuthn is supported
  const checkSupport = useCallback(async () => {
    const supported = typeof window !== 'undefined' && 
      'navigator' in window && 
      'credentials' in navigator &&
      typeof navigator.credentials.create === 'function';
    
    setIsSupported(supported);
    
    if (supported) {
      // Check if user has registered credentials
      const hasCredentials = localStorage.getItem('biometric-registered') === 'true';
      setIsRegistered(hasCredentials);
    }
    
    return supported;
  }, []);

  const registerBiometric = useCallback(async (userId: string) => {
    if (!isSupported) {
      toast({
        title: "Biometric Not Supported",
        description: "Your device doesn't support biometric authentication",
        variant: "destructive"
      });
      return false;
    }

    try {
      setIsAuthenticating(true);
      
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: new TextEncoder().encode('registration-challenge'),
          rp: {
            name: "Kenya eVisa",
            id: window.location.hostname,
          },
          user: {
            id: new TextEncoder().encode(userId),
            name: userId,
            displayName: "User",
          },
          pubKeyCredParams: [{alg: -7, type: "public-key"}],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required"
          },
          timeout: 60000,
          attestation: "direct"
        }
      }) as PublicKeyCredential;

      if (credential) {
        localStorage.setItem('biometric-registered', 'true');
        localStorage.setItem('biometric-credential-id', credential.id);
        setIsRegistered(true);
        
        toast({
          title: "Biometric Registered",
          description: "You can now use biographic authentication for faster access",
        });
        
        return true;
      }
    } catch (error) {
      console.error('Biometric registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "Failed to register biometric authentication",
        variant: "destructive"
      });
    } finally {
      setIsAuthenticating(false);
    }
    
    return false;
  }, [isSupported, toast]);

  const authenticateWithBiometric = useCallback(async (options: BiometricOptions = {}) => {
    if (!isSupported || !isRegistered) {
      return false;
    }

    try {
      setIsAuthenticating(true);
      
      const credentialId = localStorage.getItem('biometric-credential-id');
      if (!credentialId) {
        throw new Error('No registered credential found');
      }

      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: new TextEncoder().encode(options.challenge || 'auth-challenge'),
          allowCredentials: options.allowCredentials || [{
            id: new TextEncoder().encode(credentialId),
            type: 'public-key',
            transports: ['internal']
          }],
          timeout: options.timeout || 60000,
          userVerification: 'required'
        }
      });

      if (credential) {
        toast({
          title: "Authentication Successful",
          description: "Welcome back!",
        });
        return true;
      }
    } catch (error) {
      console.error('Biometric authentication failed:', error);
      toast({
        title: "Authentication Failed",
        description: "Biometric authentication failed. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAuthenticating(false);
    }
    
    return false;
  }, [isSupported, isRegistered, toast]);

  return {
    isSupported,
    isRegistered,
    isAuthenticating,
    checkSupport,
    registerBiometric,
    authenticateWithBiometric
  };
};
