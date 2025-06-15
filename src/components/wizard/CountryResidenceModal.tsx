
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { useState } from "react";

interface CountryResidenceModalProps {
  onClose: () => void;
  onCountrySelect: (country: string) => void;
  onBack: () => void;
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
  "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", "Belize", "Benin",
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Cambodia", "Cameroon", "Canada", "Chad", "Chile", "China", "Colombia",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Ecuador", "Egypt",
  "Estonia", "Ethiopia", "Finland", "France", "Georgia", "Germany", "Ghana", "Greece",
  "Guatemala", "Guinea", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Latvia", "Lebanon", "Libya",
  "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Mali", "Malta", "Mexico", "Morocco",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Panama", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Senegal",
  "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Tunisia", "Turkey", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Venezuela", "Vietnam"
];

export default function CountryResidenceModal({ onClose, onCountrySelect, onBack }: CountryResidenceModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const filteredCountries = countries.filter(country =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}/>
      
      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
          <h1 className="text-2xl font-bold text-gray-900">Country of Residence</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
            className="text-gray-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          <p className="text-sm text-gray-700 mb-6 leading-relaxed">
            Please select your country of residence. This should be the country where you currently live.
          </p>

          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for your country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Country List */}
          <div className="border rounded-lg max-h-80 overflow-y-auto">
            {filteredCountries.map((country) => (
              <div
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedCountry === country ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{country}</span>
                  {selectedCountry === country && (
                    <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {filteredCountries.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No countries found matching "{searchTerm}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-gray-50 flex-shrink-0">
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleContinue}
              disabled={!selectedCountry}
              className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
