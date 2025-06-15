
import { Input } from "@/components/ui/input";

interface TravelInfoStepProps {
  form: {
    travelFrom: string;
    entryDate: string;
    exitDate: string;
    flightNumber: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function TravelInfoStep({ form, onChange }: TravelInfoStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Traveling From *
          </label>
          <Input
            required
            placeholder="Country/City you're traveling from"
            value={form.travelFrom}
            onChange={(e) => onChange('travelFrom', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Entry Date *
          </label>
          <Input
            type="date"
            required
            value={form.entryDate}
            onChange={(e) => onChange('entryDate', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Exit Date *
          </label>
          <Input
            type="date"
            required
            value={form.exitDate}
            onChange={(e) => onChange('exitDate', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Flight Number
          </label>
          <Input
            placeholder="e.g. KQ100"
            value={form.flightNumber}
            onChange={(e) => onChange('flightNumber', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
