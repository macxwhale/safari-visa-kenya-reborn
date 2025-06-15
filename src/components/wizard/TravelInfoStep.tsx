
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import * as React from "react";

interface TravelInfoStepProps {
  form: {
    tripFinancedByThirdParty: boolean | null;
    countryOfBirth: string;
    nationalityAtBirth: string;
    convictedInPast5Years: boolean | null;
    deniedEntryToKenya: boolean | null;
  };
  onChange: (field: string, value: any) => void;
}

const QuestionRadioGroup: React.FC<{
  label: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  idPrefix: string;
}> = ({ label, value, onChange, idPrefix }) => (
  <div className="space-y-2">
    <Label className="font-normal text-gray-700">{label}</Label>
    <RadioGroup
      value={value === null ? "" : value ? "yes" : "no"}
      onValueChange={(val) => onChange(val === "yes")}
      className="flex items-center space-x-6 pt-2"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id={`${idPrefix}-yes`} />
        <Label htmlFor={`${idPrefix}-yes`} className="font-normal">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id={`${idPrefix}-no`} />
        <Label htmlFor={`${idPrefix}-no`} className="font-normal">No</Label>
      </div>
    </RadioGroup>
  </div>
);

export default function TravelInfoStep({ form, onChange }: TravelInfoStepProps) {
  return (
    <div className="space-y-8 animate-fade-in max-w-2xl">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Traveller Information</h2>
        <p className="text-sm text-gray-600 mt-1">Answer a few questions related to the traveller.</p>
      </div>
      
      <div className="space-y-6">
        <QuestionRadioGroup
          label="Is your trip financed by a third party, which is not your employer nor a government?"
          value={form.tripFinancedByThirdParty}
          onChange={(value) => onChange('tripFinancedByThirdParty', value)}
          idPrefix="financed"
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

        <QuestionRadioGroup
          label="Have you ever been convicted of any offence, under any system of law, in the past 5 years?"
          value={form.convictedInPast5Years}
          onChange={(value) => onChange('convictedInPast5Years', value)}
          idPrefix="convicted"
        />

        <QuestionRadioGroup
          label="Have you ever been previously denied entry to Kenya?"
          value={form.deniedEntryToKenya}
          onChange={(value) => onChange('deniedEntryToKenya', value)}
          idPrefix="denied"
        />
      </div>
    </div>
  );
}
