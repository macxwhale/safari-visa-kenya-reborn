
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '@/hooks/useVoiceInput';

interface VoiceInputButtonProps {
  onTranscript: (text: string) => void;
  className?: string;
}

export const VoiceInputButton = ({ onTranscript, className }: VoiceInputButtonProps) => {
  const { isListening, startListening, stopListening, isSupported } = useVoiceInput({
    onResult: onTranscript
  });

  if (!isSupported) {
    return null;
  }

  const handleToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <Button
      type="button"
      variant={isListening ? "destructive" : "outline"}
      size="icon"
      onClick={handleToggle}
      className={className}
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
    >
      {isListening ? (
        <MicOff className="h-4 w-4" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};
