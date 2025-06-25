
import { Button } from "@/components/ui/button";

type Mode = 'air' | 'sea' | 'land';

interface ModeButtonProps {
  label: string;
  value: Mode;
  currentValue: Mode;
  onClick: (value: Mode) => void;
  children: React.ReactNode;
}

export const ModeButton: React.FC<ModeButtonProps> = ({ 
  label, 
  value, 
  currentValue, 
  onClick, 
  children 
}) => (
  <Button
    variant={currentValue === value ? "default" : "outline"}
    onClick={() => onClick(value)}
    className={`flex-1 flex-col h-20 ${currentValue === value ? 'bg-green-600 hover:bg-green-700' : ''}`}
  >
    {children}
    <span>{label}</span>
  </Button>
);
