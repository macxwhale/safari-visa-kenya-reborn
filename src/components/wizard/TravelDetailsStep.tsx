
import { Input } from "@/components/ui/input";

interface TravelDetailsStepProps {
  form: {
    travelFrom: string;
    entryDate: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function TravelDetailsStep({ form, onChange }: TravelDetailsStepProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="font-medium">Visiting From</label>
        <Input
          required
          placeholder="Your country of departure"
          value={form.travelFrom}
          onChange={(e) => onChange('travelFrom', e.target.value)}
        />
      </div>
      <div>
        <label className="font-medium">Entry Date</label>
        <Input
          required
          type="date"
          value={form.entryDate}
          onChange={(e) => onChange('entryDate', e.target.value)}
        />
      </div>
    </div>
  );
}
