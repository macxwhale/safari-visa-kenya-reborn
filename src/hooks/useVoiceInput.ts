
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputOptions {
  language?: string;
  continuous?: boolean;
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

export const useVoiceInput = (options: VoiceInputOptions = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  const isSupported = typeof window !== 'undefined' && 
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast({
        title: "Voice Input Not Supported",
        description: "Your browser doesn't support voice input",
        variant: "destructive"
      });
      return false;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = options.continuous || false;
      recognition.interimResults = true;
      recognition.lang = options.language || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          if (result.isFinal) {
            finalTranscript += result[0].transcript;
          }
        }

        if (finalTranscript) {
          setTranscript(finalTranscript);
          options.onResult?.(finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        setIsListening(false);
        const errorMessage = `Voice recognition error: ${event.error}`;
        options.onError?.(errorMessage);
        toast({
          title: "Voice Input Error",
          description: errorMessage,
          variant: "destructive"
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
      return true;
    } catch (error) {
      console.error('Voice recognition setup failed:', error);
      setIsListening(false);
      return false;
    }
  }, [options, toast, isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
  }, []);

  return {
    isListening,
    transcript,
    startListening,
    stopListening,
    isSupported,
    clearTranscript: () => setTranscript('')
  };
};
