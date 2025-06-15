
import { Input } from "@/components/ui/input";

interface ContactInfoStepProps {
  form: {
    fullName: string;
    email: string;
    phone: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ContactInfoStep({ form, onChange }: ContactInfoStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <Input
            required
            placeholder="Enter your full name as it appears on your passport"
            value={form.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <Input
            type="email"
            required
            placeholder="your.email@example.com"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <Input
            type="tel"
            required
            placeholder="+1 (555) 123-4567"
            value={form.phone}
            onChange={(e) => onChange('phone', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
