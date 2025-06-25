
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plane, Bus, Ship } from "lucide-react";
import { ModeButton } from "./ModeButton";
import { DatePicker } from "./DatePicker";
import { getCountrySpecificData } from "./countryData";

type Mode = 'air' | 'sea' | 'land';

interface ArrivalSectionProps {
  form: {
    entryDate: string;
    arrivalMode: Mode;
    arrivalPort: string;
    arrivalAirline: string;
    flightNumber: string;
  };
  onChange: (field: string, value: any) => void;
  originCountry: string; // Country user is traveling FROM
  destinationCountry: string; // Kenya - where they're going TO
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const ArrivalSection: React.FC<ArrivalSectionProps> = ({ 
  form, 
  onChange, 
  originCountry,
  destinationCountry,
  handleDateChange 
}) => {
  const originCountryData = getCountrySpecificData(originCountry);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Arrival Details to Kenya</h3>
      <p className="text-sm text-gray-600">Select your departure details from {originCountry}</p>
      <DatePicker
        date={form.entryDate}
        onSelect={handleDateChange('entryDate')}
        placeholder="Your expected arrival date in Kenya"
      />
      <div className="flex space-x-2">
        <ModeButton label="Arriving by Air" value="air" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
          <Plane />
        </ModeButton>
        <ModeButton label="Arriving by Sea" value="sea" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
          <Ship />
        </ModeButton>
        <ModeButton label="Arriving by Land" value="land" currentValue={form.arrivalMode} onClick={(v) => onChange('arrivalMode', v)}>
          <Bus />
        </ModeButton>
      </div>
      {form.arrivalMode === 'air' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
            <SelectTrigger><SelectValue placeholder={`Select departure airport from ${originCountry}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {originCountryData.airports.map((airport: any) => (
                <SelectItem key={airport.code} value={airport.code}>
                  {airport.code} - {airport.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-3 gap-2">
            <div className="col-span-2">
              <Input placeholder="Airline" value={form.arrivalAirline} onChange={(e) => onChange('arrivalAirline', e.target.value)} />
            </div>
            <Input placeholder="Flight No." value={form.flightNumber} onChange={(e) => onChange('flightNumber', e.target.value)} />
          </div>
          <p className="text-sm text-gray-500">Provide information on your flight from {originCountry} to Kenya.</p>
        </div>
      )}
      {form.arrivalMode === 'sea' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
            <SelectTrigger><SelectValue placeholder={`Select departure port from ${originCountry}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {originCountryData.seaPorts.map((port: any) => (
                <SelectItem key={port.code} value={port.code}>
                  {port.code} - {port.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Select the sea port where you will depart from {originCountry}.</p>
        </div>
      )}
      {form.arrivalMode === 'land' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
            <SelectTrigger><SelectValue placeholder={`Select border crossing from ${originCountry}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              {originCountryData.landBorders.map((border: any) => (
                <SelectItem key={border.code} value={border.code}>
                  {border.code} - {border.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Select the land border crossing you will use to leave {originCountry}.</p>
        </div>
      )}
    </div>
  );
};
