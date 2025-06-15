
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TravelInfoStepProps {
  form: {
    tripFinancedByThirdParty: boolean | null;
    countryOfBirth: string;
    nationalityAtBirth: string;
    convictedInPast5Years: boolean | null;
    deniedEntryToKenya: boolean | null;
    maritalStatus: string;
    previouslyTravelledToKenya: boolean | null;
  };
  onChange: (field: string, value: any) => void;
}

const ButtonRadioGroup: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  value: string | boolean | null;
  onChange: (value: any) => void;
  idPrefix: string;
}> = ({ label, options, value, onChange, idPrefix }) => {
  const stringValue = value === null ? "" : typeof value === 'boolean' ? (value ? "yes" : "no") : value;
  return (
    <div className="space-y-2">
      <Label className="font-normal text-gray-700">{label}</Label>
      <RadioGroup
        value={stringValue}
        onValueChange={onChange}
        className="flex flex-wrap items-center gap-3 pt-2"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <RadioGroupItem value={option.value} id={`${idPrefix}-${option.value}`} className="peer sr-only" />
            <Label
              htmlFor={`${idPrefix}-${option.value}`}
              className={cn(
                "flex items-center justify-center rounded-md border bg-white px-4 py-2 font-medium text-gray-800 shadow-sm hover:bg-gray-50 cursor-pointer transition-all",
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

export default function TravelInfoStep({ form, onChange }: TravelInfoStepProps) {
  const maritalStatusOptions = [
    { value: 'single', label: 'Single' },
    { value: 'married', label: 'Married' },
    { value: 'divorced', label: 'Divorced' },
    { value: 'widowed', label: 'Widowed' },
  ];

  const yesNoOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Traveller Information</h2>
        <p className="text-sm text-gray-600 mt-1">Answer a few questions related to the traveller.</p>
      </div>
      
      <div className="space-y-6">
        <ButtonRadioGroup
          label="Is your trip financed by a third party, which is not your employer nor a government?"
          options={yesNoOptions}
          value={form.tripFinancedByThirdParty}
          onChange={(value) => onChange('tripFinancedByThirdParty', value === 'yes')}
          idPrefix="financed"
        />

        <ButtonRadioGroup
          label="What is your marital status?"
          options={maritalStatusOptions}
          value={form.maritalStatus}
          onChange={(value) => onChange('maritalStatus', value)}
          idPrefix="marital"
        />

        <ButtonRadioGroup
          label="Have you previously travelled to Kenya?"
          options={yesNoOptions}
          value={form.previouslyTravelledToKenya}
          onChange={(value) => onChange('previouslyTravelledToKenya', value === 'yes')}
          idPrefix="travelled"
        />
        
        <div className="space-y-2">
          <Label htmlFor="countryOfBirth" className="font-normal text-gray-700">What is your country of birth?</Label>
          <Select onValueChange={(value) => onChange('countryOfBirth', value)} value={form.countryOfBirth}>
            <SelectTrigger id="countryOfBirth"><SelectValue placeholder="Select country" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="SWE">Sweden</SelectItem>
                <SelectItem value="DNK">Denmark</SelectItem>
                <SelectItem value="DEU">Germany</SelectItem>
                <SelectItem value="USA">United States</SelectItem>
                <SelectItem value="GBR">United Kingdom</SelectItem>
                <SelectItem value="KEN">Kenya</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="nationalityAtBirth" className="font-normal text-gray-700">What was your nationality at birth?</Label>
          <Select onValueChange={(value) => onChange('nationalityAtBirth', value)} value={form.nationalityAtBirth}>
            <SelectTrigger id="nationalityAtBirth"><SelectValue placeholder="Select nationality" /></SelectTrigger>
            <SelectContent>
                <SelectItem value="Swedish">Swedish</SelectItem>
                <SelectItem value="Danish">Danish</SelectItem>
                <SelectItem value="German">German</SelectItem>
                <SelectItem value="American">American</SelectItem>
                <SelectItem value="British">British</SelectItem>
                <SelectItem value="Kenyan">Kenyan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ButtonRadioGroup
          label="Have you ever been convicted of any offence, under any system of law, in the past 5 years?"
          options={yesNoOptions}
          value={form.convictedInPast5Years}
          onChange={(value) => onChange('convictedInPast5Years', value === 'yes')}
          idPrefix="convicted"
        />

        <ButtonRadioGroup
          label="Have you ever been previously denied entry to Kenya?"
          options={yesNoOptions}
          value={form.deniedEntryToKenya}
          onChange={(value) => onChange('deniedEntryToKenya', value === 'yes')}
          idPrefix="denied"
        />
      </div>
    </div>
  );
}
