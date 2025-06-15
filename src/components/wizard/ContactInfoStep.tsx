
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactInfoStepProps {
  form: {
    email: string;
    phone: string;
    homeAddress: string;
    occupation: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ContactInfoStep({ form, onChange }: ContactInfoStepProps) {
  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Traveller Contact Information</h2>
        <p className="text-sm text-gray-600">
          Provide contact information of the lead traveller. By law one must only provide a valid email and contact number of the traveler. Travel agents, Visa/concierge services and other agencies must provide the travellers details or the applications will be denied and no refund due.
        </p>
      </div>
      <div className="space-y-4">
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
            Home Address *
          </label>
          <Input
            required
            placeholder="Search for your address"
            value={form.homeAddress}
            onChange={(e) => onChange('homeAddress', e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">If you don't find your street address, please enter your neighborhood, city and country.</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation
          </label>
           <Select onValueChange={(value) => onChange('occupation', value)} value={form.occupation}>
            <SelectTrigger>
              <SelectValue placeholder="Select your occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Actor">Actor</SelectItem>
              <SelectItem value="Architect">Architect</SelectItem>
              <SelectItem value="Artist">Artist</SelectItem>
              <SelectItem value="Business Person">Business Person</SelectItem>
              <SelectItem value="Consultant">Consultant</SelectItem>
              <SelectItem value="Doctor">Doctor</SelectItem>
              <SelectItem value="Engineer">Engineer</SelectItem>
              <SelectItem value="Lawyer">Lawyer</SelectItem>
              <SelectItem value="Student">Student</SelectItem>
              <SelectItem value="Teacher">Teacher</SelectItem>
              <SelectItem value="Technician">Technician</SelectItem>
              <SelectItem value="Unemployed">Unemployed</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
