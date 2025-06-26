
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import * as React from "react";
import { ButtonRadioGroup } from "./ButtonRadioGroup";

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
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Traveler Information</h2>
        <p className="text-sm text-gray-600">Answer a few questions related to the traveler.</p>
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
          <Label htmlFor="countryOfBirth" className="font-normal text-gray-700 text-base">What is your country of birth?</Label>
          <Select onValueChange={(value) => onChange('countryOfBirth', value)} value={form.countryOfBirth}>
            <SelectTrigger id="countryOfBirth">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
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
          <Label htmlFor="nationalityAtBirth" className="font-normal text-gray-700 text-base">What was your nationality at birth?</Label>
          <Select onValueChange={(value) => onChange('nationalityAtBirth', value)} value={form.nationalityAtBirth}>
            <SelectTrigger id="nationalityAtBirth">
              <SelectValue placeholder="Select nationality" />
            </SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
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
