
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface TripInfoStepProps {
  form: {
    purposeOfVisit: string;
    accommodationAddress: string;
    contactInKenya: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function TripInfoStep({ form, onChange }: TripInfoStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purpose of Visit *
          </label>
          <Input
            required
            placeholder="e.g. Tourism, Business, Transit"
            value={form.purposeOfVisit}
            onChange={(e) => onChange('purposeOfVisit', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accommodation Address in Kenya *
          </label>
          <Textarea
            required
            placeholder="Enter the full address where you will be staying in Kenya"
            value={form.accommodationAddress}
            onChange={(e) => onChange('accommodationAddress', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Person in Kenya
          </label>
          <Input
            placeholder="Name and phone number of contact person (if applicable)"
            value={form.contactInKenya}
            onChange={(e) => onChange('contactInKenya', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
