
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plane, Bus, Ship, Loader2 } from "lucide-react";
import { ModeButton } from "./ModeButton";
import { DatePicker } from "./DatePicker";
import { getCountryPortData, Port } from "@/services/countryPortService";

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
  originCountry: string;
  destinationCountry: string;
  handleDateChange: (field: string) => (date: Date | undefined) => void;
}

export const ArrivalSection: React.FC<ArrivalSectionProps> = ({ 
  form, 
  onChange, 
  originCountry,
  destinationCountry,
  handleDateChange 
}) => {
  const [ports, setPorts] = useState<Port[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPorts = async () => {
      if (!originCountry) return;
      
      setLoading(true);
      try {
        const portData = await getCountryPortData(originCountry);
        let relevantPorts: Port[] = [];
        
        switch (form.arrivalMode) {
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
  }, [originCountry, form.arrivalMode]);

  const getModeText = () => {
    switch (form.arrivalMode) {
      case 'air': return 'airport';
      case 'sea': return 'seaport';
      case 'land': return 'border crossing';
      default: return 'port';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Arrival to Kenya</h3>
        <p className="text-sm text-blue-700">
          Select your departure details from <span className="font-medium">{originCountry}</span> to Kenya
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected arrival date in Kenya *
          </label>
          <DatePicker
            date={form.entryDate}
            onSelect={handleDateChange('entryDate')}
            placeholder="Select your arrival date"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How will you arrive in Kenya? *
          </label>
          <div className="grid grid-cols-3 gap-3">
            <ModeButton 
              label="By Air" 
              value="air" 
              currentValue={form.arrivalMode} 
              onClick={(v) => onChange('arrivalMode', v)}
            >
              <Plane className="w-5 h-5" />
            </ModeButton>
            <ModeButton 
              label="By Sea" 
              value="sea" 
              currentValue={form.arrivalMode} 
              onClick={(v) => onChange('arrivalMode', v)}
            >
              <Ship className="w-5 h-5" />
            </ModeButton>
            <ModeButton 
              label="By Land" 
              value="land" 
              currentValue={form.arrivalMode} 
              onClick={(v) => onChange('arrivalMode', v)}
            >
              <Bus className="w-5 h-5" />
            </ModeButton>
          </div>
        </div>

        {form.arrivalMode && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departure {getModeText()} in {originCountry} *
              </label>
              <Select onValueChange={(value) => onChange('arrivalPort', value)} value={form.arrivalPort}>
                <SelectTrigger className="w-full">
                  <SelectValue 
                    placeholder={
                      loading 
                        ? "Loading ports..." 
                        : `Select departure ${getModeText()} from ${originCountry}`
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
                      No ports found for {originCountry}
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {form.arrivalMode === 'air' && (
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Airline
                  </label>
                  <Input 
                    placeholder="e.g., Kenya Airways" 
                    value={form.arrivalAirline} 
                    onChange={(e) => onChange('arrivalAirline', e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Flight Number
                  </label>
                  <Input 
                    placeholder="e.g., KQ100" 
                    value={form.flightNumber} 
                    onChange={(e) => onChange('flightNumber', e.target.value)} 
                  />
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500">
              {form.arrivalMode === 'air' && "Provide your flight information from " + originCountry + " to Kenya."}
              {form.arrivalMode === 'sea' && "Select the seaport where you will depart from " + originCountry + "."}
              {form.arrivalMode === 'land' && "Select the border crossing you will use to leave " + originCountry + "."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
