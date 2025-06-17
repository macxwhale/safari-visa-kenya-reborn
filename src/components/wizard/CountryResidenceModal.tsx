
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import CountrySearchInput from "./country/CountrySearchInput";
import CountryList from "./country/CountryList";
import ModalWrapper from "./ModalWrapper";

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

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <ModalWrapper onClose={onClose} className="max-w-2xl h-[85vh] flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-start justify-between p-8 pb-4 flex-shrink-0 border-b border-gray-200">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Country of Residence</h1>
          <p className="mb-4 text-[15px] text-gray-800 leading-relaxed">
            Please select your country of residence...
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-2"
          type="button"
        >
          <HelpCircle className="w-5 h-5" />
          Help
        </Button>
      </div>

      {/* Search Input - Fixed */}
      <div className="px-8 py-4 flex-shrink-0 border-b border-gray-100">
        <CountrySearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Scrollable Content Area - Takes remaining space */}
      <div className="flex-1 overflow-y-auto px-8 py-4">
        <CountryList 
          searchTerm={searchTerm}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
      </div>

      {/* Footer - Fixed */}
      <div className="px-8 py-6 border-t bg-gray-50 flex-shrink-0">
        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="rounded-full px-6 py-2 border-gray-300 text-gray-700"
          >
            Close
          </Button>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="rounded-full px-6 py-2 border-gray-300 text-gray-700"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedCountry}
              className={`rounded-full px-8 py-2 font-semibold text-white ${
                selectedCountry 
                  ? "bg-brand-green hover:bg-brand-green/90" 
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
