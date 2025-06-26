
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plane, Bus, Ship, Loader2 } from "lucide-react";
import { ModeButton } from "./ModeButton";
import { DatePicker } from "./DatePicker";
import { getCountryPortData, Port } from "@/services/countryPortService";

type Mode = 'air' | 'sea' | 'land';

interface DepartureSectionProps {
  form: {
    exitDate: string;
    departureMode: Mode;
    departurePort: string;
    departureAirline: string;
    departureFlightNumber: string;
    finalDestinationCountry: string;
  };
  onChange: (field: string, value: any) => void;
  country: string;
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const DepartureSection: React.FC<DepartureSectionProps> = ({ 
  form, 
  onChange, 
  country, 
  handleDateChange 
}) => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPorts = async () => {
      if (!country) return;
      
      setLoading(true);
      try {
        const portData = await getCountryPortData(country);
        
        let relevantPorts: Port[] = [];
        switch (form.departureMode) {
          case 'air':
            relevantPorts = portData.airports;
            break;
          case 'sea':
            relevantPorts = portData.seaPorts;
            break;
          case 'land':
            relevantPorts = portData.landBorders;
            break;
        }
        
        setPorts(relevantPorts);
      } catch (error) {
        console.error('Failed to load ports:', error);
        setPorts([]);
      } finally {
        setLoading(false);
      }
    };

    loadPorts();
  }, [country, form.departureMode]);

  const getModeText = () => {
    switch (form.departureMode) {
      case 'air': return 'airport';
      case 'sea': return 'seaport';
      case 'land': return 'border crossing';
      default: return 'port';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Departure from Kenya</h3>
        <p className="text-sm text-blue-700">
          Select your departure details when leaving Kenya
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected departure date from Kenya *
          </label>
          <DatePicker
            date={form.exitDate}
            onSelect={handleDateChange('exitDate')}
            placeholder="Select your departure date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How will you depart from Kenya? *
          </label>
          <div className="grid grid-cols-3 gap-3">
            <ModeButton 
              label="By Air" 
              value="air" 
              currentValue={form.departureMode} 
              onClick={(v) => onChange('departureMode', v)}
            >
              <Plane className="w-5 h-5" />
            </ModeButton>
            <ModeButton 
              label="By Sea" 
              value="sea" 
              currentValue={form.departureMode} 
              onClick={(v) => onChange('departureMode', v)}
            >
              <Ship className="w-5 h-5" />
            </ModeButton>
            <ModeButton 
              label="By Land" 
              value="land" 
              currentValue={form.departureMode} 
              onClick={(v) => onChange('departureMode', v)}
            >
              <Bus className="w-5 h-5" />
            </ModeButton>
          </div>
        </div>

        {form.departureMode && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure {getModeText()} in Kenya *
              </label>
              
              <Select onValueChange={(value) => onChange('departurePort', value)} value={form.departurePort}>
                <SelectTrigger className="w-full">
                  <SelectValue 
                    placeholder={
                      loading 
                        ? "Loading ports..." 
                        : `Select departure ${getModeText()} in Kenya`
                    } 
                  />
                </SelectTrigger>
                <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
                  {loading ? (
                    <div className="flex items-center justify-center py-4">
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Loading ports...
                    </div>
                  ) : ports.length > 0 ? (
                    ports.map((port) => (
                      <SelectItem key={port.code} value={port.code}>
                        <div className="flex flex-col">
                          <span className="font-medium">{port.code}</span>
                          <span className="text-sm text-gray-500">{port.name}</span>
                          {port.city && <span className="text-xs text-gray-400">{port.city}</span>}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      No ports found
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {form.departureMode === 'air' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Airline
                  </label>
                  <Input 
                    placeholder="e.g., Kenya Airways" 
                    value={form.departureAirline} 
                    onChange={(e) => onChange('departureAirline', e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flight Number
                  </label>
                  <Input 
                    placeholder="e.g., KQ100" 
                    value={form.departureFlightNumber} 
                    onChange={(e) => onChange('departureFlightNumber', e.target.value)} 
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final destination country *
          </label>
          <Select onValueChange={(value) => onChange('finalDestinationCountry', value)} value={form.finalDestinationCountry}>
            <SelectTrigger>
              <SelectValue placeholder="Select your final destination country" />
            </SelectTrigger>
            <SelectContent className="z-[99999] bg-white border shadow-lg max-h-48 overflow-y-auto">
              <SelectItem value="USA">United States</SelectItem>
              <SelectItem value="GBR">United Kingdom</SelectItem>
              <SelectItem value="DNK">Denmark</SelectItem>
              <SelectItem value="DEU">Germany</SelectItem>
              <SelectItem value="CAN">Canada</SelectItem>
              <SelectItem value="AUS">Australia</SelectItem>
              <SelectItem value="FRA">France</SelectItem>
              <SelectItem value="ITA">Italy</SelectItem>
              <SelectItem value="ESP">Spain</SelectItem>
              <SelectItem value="NLD">Netherlands</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
