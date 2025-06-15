
import { Input } from "@/components/ui/input";

interface PersonalInfoStepProps {
  form: {
    fullName: string;
    email: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function PersonalInfoStep({ form, onChange }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <label className="font-medium">Full Name</label>
        <Input
          required
          placeholder="As in passport"
          value={form.fullName}
          onChange={(e) => onChange('fullName', e.target.value)}
        />
      </div>
      <div>
        <label className="font-medium">Email Address</label>
        <Input
          required
          placeholder="your@email.com"
          value={form.email}
          onChange={(e) => onChange('email', e.target.value)}
          type="email"
        />
      </div>
    </div>
  );
}
