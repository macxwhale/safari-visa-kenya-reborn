
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
  country: string;
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const ArrivalSection: React.FC<ArrivalSectionProps> = ({ 
  form, 
  onChange, 
  country, 
  handleDateChange 
}) => {
  const countryData = getCountrySpecificData(country);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-700">Arrival Details to {country}</h3>
      <DatePicker
        date={form.entryDate}
        onSelect={handleDateChange('entryDate')}
        placeholder={`Your expected arrival date in ${country}`}
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
            <SelectTrigger><SelectValue placeholder={`Select arrival airport in ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg">
              {countryData.airports.map((airport: any) => (
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
          <p className="text-sm text-gray-500">Provide information on your flight to {country}.</p>
        </div>
      )}
      {form.arrivalMode === 'sea' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
            <SelectTrigger><SelectValue placeholder={`Select arrival port in ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg">
              {countryData.seaPorts.map((port: any) => (
                <SelectItem key={port.code} value={port.code}>
                  {port.code} - {port.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Select the sea port where you will arrive in {country}.</p>
        </div>
      )}
      {form.arrivalMode === 'land' && (
        <div className="space-y-4 p-4 border rounded-md">
          <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
            <SelectTrigger><SelectValue placeholder={`Select border crossing to ${country}`} /></SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg">
              {countryData.landBorders.map((border: any) => (
                <SelectItem key={border.code} value={border.code}>
                  {border.code} - {border.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">Select the land border crossing you will use to enter {country}.</p>
        </div>
      )}
    </div>
  );
};
