
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ContactInfoStepProps {
  form: {
    fullName: string;
    email: string;
    phone: string;
    homeAddress: string;
    occupation: string;
  };
  onChange: (field: string, value: string) => void;
}

export default function ContactInfoStep({ form, onChange }: ContactInfoStepProps) {
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
    if (!phone) {
      setPhoneError("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const handleEmailChange = (value: string) => {
    onChange('email', value);
    if (value) {
      validateEmail(value);
    } else {
      setEmailError("");
    }
  };

  const handlePhoneChange = (value: string) => {
    onChange('phone', value);
    if (value) {
      validatePhone(value);
    } else {
      setPhoneError("");
    }
  };

  useEffect(() => {
    if (form.email) {
      validateEmail(form.email);
    }
    if (form.phone) {
      validatePhone(form.phone);
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-gray-900">Traveller Contact Information</h2>
        <p className="text-sm text-gray-600">
          Provide contact information of the lead traveller. By law one must only provide a valid email and contact number of the traveler. Travel agents, Visa/concierge services and other agencies must provide the travellers details or the applications will be denied and no refund due.
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <Input
            type="text"
            required
            placeholder="Enter your full name as it appears on your passport"
            value={form.fullName}
            onChange={(e) => onChange('fullName', e.target.value)}
            className="min-h-[48px] text-base" // Mobile-friendly touch target
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
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`min-h-[48px] text-base ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
          />
          {phoneError && (
            <div className="flex items-center gap-2 mt-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{phoneError}</span>
            </div>
          )}
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
            onChange={(e) => handleEmailChange(e.target.value)}
            className={`min-h-[48px] text-base ${emailError ? 'border-red-500 focus:border-red-500' : form.email && !emailError ? 'border-green-500' : ''}`}
          />
          {emailError ? (
            <div className="flex items-center gap-2 mt-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{emailError}</span>
            </div>
          ) : form.email && !emailError ? (
            <div className="flex items-center gap-2 mt-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">Valid email address</span>
            </div>
          ) : null}
          <p className="text-xs text-gray-500 mt-1">
            We'll send your ETA confirmation to this email address
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Address *
          </label>
          <Input
            required
            placeholder="Enter your full home address"
            value={form.homeAddress}
            onChange={(e) => onChange('homeAddress', e.target.value)}
            className="min-h-[48px] text-base"
          />
          <p className="text-sm text-gray-500 mt-1">If you don't find your street address, please enter your neighborhood, city and country.</p>
        </div>
        
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occupation *
          </label>
          <Select onValueChange={(value) => onChange('occupation', value)} value={form.occupation}>
            <SelectTrigger className="min-h-[48px] text-base">
              <SelectValue placeholder="Select your occupation" />
            </SelectTrigger>
            <SelectContent className="z-[9999] bg-white border shadow-lg max-h-60 overflow-auto">
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
