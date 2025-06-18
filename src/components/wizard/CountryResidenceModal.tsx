
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
    <ModalWrapper onClose={onClose} className="sm:max-w-2xl flex flex-col">
      {/* Header - Fixed */}
      <div className="flex items-start justify-between p-4 sm:p-8 sm:pb-4 flex-shrink-0 border-b border-gray-200">
        <div className="flex-1 pr-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 mb-2">Country of Residence</h1>
          <p className="mb-4 text-sm sm:text-[15px] text-gray-800 leading-relaxed">
            Please select your country of residence...
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-700 flex items-center gap-2 bg-gray-100 px-3 py-2 hidden sm:flex"
          type="button"
        >
          <HelpCircle className="w-5 h-5" />
          Help
        </Button>
      </div>

      {/* Search Input - Fixed */}
      <div className="px-4 sm:px-8 py-4 flex-shrink-0 border-b border-gray-100">
        <CountrySearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Scrollable Content Area - Takes remaining space */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-4 pb-20 sm:pb-4">
        <CountryList 
          searchTerm={searchTerm}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
      </div>

      {/* Footer - Fixed at bottom on mobile */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto px-4 sm:px-8 py-4 sm:py-6 border-t bg-white flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="rounded-full px-6 py-2 border-gray-300 text-gray-700 order-2 sm:order-1 w-full sm:w-auto"
          >
            Close
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="rounded-full px-6 py-2 border-gray-300 text-gray-700 w-full sm:w-auto"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedCountry}
              className={`rounded-full px-8 py-2 font-semibold text-white w-full sm:w-auto ${
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
