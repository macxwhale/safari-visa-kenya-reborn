
import { Input } from "@/components/ui/input";

interface PassportStepProps {
  form: {
    passport: string;
    nationality: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function PassportStep({ form, onChange }: PassportStepProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="font-medium">Passport Number</label>
        <Input
          required
          placeholder="e.g. A1234567"
          value={form.passport}
          onChange={(e) => onChange('passport', e.target.value)}
        />
      </div>
      <div>
        <label className="font-medium">Nationality</label>
        <Input
          required
          placeholder="e.g. United States"
          value={form.nationality}
          onChange={(e) => onChange('nationality', e.target.value)}
        />
      </div>
    </div>
  );
}
