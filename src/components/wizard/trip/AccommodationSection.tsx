
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { DatePicker } from "./DatePicker";

interface AccommodationSectionProps {
  form: {
    accommodationAddress: string;
    accommodationCheckInDate: string;
    accommodationCheckOutDate: string;
  };
  onChange: (field: string, value: any) => void;
  country: string;
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({ 
  form, 
  onChange, 
  country, 
  handleDateChange 
}) => {
  return (
    <div className="space-y-4 pb-8">
      <h3 className="text-lg font-semibold text-gray-700">Address(es) in {country}</h3>
      <p className="text-sm text-gray-600">Name of hotel/guesthouse or address of residence.</p>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input 
          placeholder={`Hotel Boulevard ${country === 'Kenya' ? 'Nairobi, City Centre CBD, Harry Thuku Road, Nairobi' : `${country} City Centre`}, ${country}`}
          value={form.accommodationAddress}
          onChange={(e) => onChange('accommodationAddress', e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <DatePicker
          date={form.accommodationCheckInDate}
          onSelect={handleDateChange('accommodationCheckInDate')}
          placeholder="Check-in date"
        />
        <DatePicker
          date={form.accommodationCheckOutDate}
          onSelect={handleDateChange('accommodationCheckOutDate')}
          placeholder="Check-out date"
        />
      </div>
      <Button variant="link" className="p-0 h-auto text-green-600">+ Add Address</Button>
    </div>
  );
};
