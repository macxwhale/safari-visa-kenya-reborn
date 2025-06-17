
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import CountrySearchInput from "./country/CountrySearchInput";
import CountryList from "./country/CountryList";

interface CountryResidenceModalProps {
  onClose: () => void;
  onCountrySelect: (country: string) => void;
  onBack: () => void;
}

export default function CountryResidenceModal({ onClose, onCountrySelect, onBack }: CountryResidenceModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleContinue = () => {
    if (selectedCountry) {
      onCountrySelect(selectedCountry);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Modal overlay */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal content */}
      <div className="relative z-50 bg-white rounded-xl shadow-xl max-w-2xl w-full mx-auto max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Country of Residence</h1>
            <p className="mb-4 text-[15px] text-gray-800">Please select your country of residence. This is the country where you live and pay taxes. If you are a resident Diplomat of Kenya, please select Kenya.</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-2"
            tabIndex={-1}
            type="button"
          >
            <HelpCircle className="w-5 h-5 mr-1" />
            Help
          </Button>
        </div>

        {/* Search Input */}
        <div className="px-8 mt-6 mb-3">
          <CountrySearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Country List */}
        <div className="px-8">
          <CountryList 
            searchTerm={searchTerm}
            selectedCountry={selectedCountry}
            onCountrySelect={setSelectedCountry}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-8 py-5 border-t bg-white flex-shrink-0">
          <Button variant="outline" onClick={onClose} className="rounded-full px-6 py-2 border-gray-300 text-gray-700">Close</Button>
          <div className="flex gap-3">
            <Button variant="outline" onClick={onBack} className="rounded-full px-6 py-2 border-gray-300 text-gray-700">Back</Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedCountry}
              className={`rounded-full px-8 py-2 font-semibold text-white ${selectedCountry ? "bg-brand-green hover:bg-brand-green/90" : "bg-gray-300"}`}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
