
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ButtonRadioGroupProps {
  label: string;
  options: { value: string; label: string }[];
  value: string | boolean | null;
  onChange: (value: any) => void;
  idPrefix: string;
}

export const ButtonRadioGroup: React.FC<ButtonRadioGroupProps> = ({ 
  label, 
  options, 
  value, 
  onChange, 
  idPrefix 
}) => {
  const stringValue = value === null ? "" : typeof value === 'boolean' ? (value ? "yes" : "no") : value;
  
  return (
    <div className="space-y-3">
      <Label className="font-normal text-gray-700 text-sm sm:text-base">{label}</Label>
      <RadioGroup
        value={stringValue}
        onValueChange={onChange}
        className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <RadioGroupItem value={option.value} id={`${idPrefix}-${option.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${idPrefix}-${option.value}`}
              className={cn(
                "flex items-center justify-center rounded-md border bg-white px-3 sm:px-4 py-2 font-medium text-gray-800 shadow-sm hover:bg-gray-50 cursor-pointer transition-all text-sm sm:text-base",
                "peer-data-[state=checked]:border-green-600 peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-green-100"
              )}
            >
              {stringValue === option.value && <Check className="w-4 h-4 mr-2 text-green-600" />}
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
