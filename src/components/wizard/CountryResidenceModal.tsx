
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
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
    <ModalWrapper onClose={onClose} className="sm:max-w-3xl flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between p-6 sm:p-8 flex-shrink-0 border-b border-gray-100">
        <div className="flex-1 pr-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Country of Residence
          </h1>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Please select your country of residence to continue with your application.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-gray-700 flex items-center gap-2 px-3 py-2 hidden sm:flex"
            type="button"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Search Input */}
      <div className="px-6 sm:px-8 py-4 flex-shrink-0 border-b border-gray-100 bg-gray-50">
        <CountrySearchInput searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 pb-24 sm:pb-6">
        <CountryList 
          searchTerm={searchTerm}
          selectedCountry={selectedCountry}
          onCountrySelect={handleCountrySelect}
        />
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto px-6 sm:px-8 py-6 border-t border-gray-100 bg-white flex-shrink-0">
        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 sm:gap-6">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="order-2 sm:order-1 w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
          >
            Close
          </Button>
          <div className="flex flex-col sm:flex-row gap-3 order-1 sm:order-2">
            <Button 
              variant="outline" 
              onClick={onBack} 
              className="w-full sm:w-auto px-6 py-3 font-medium border-gray-300 hover:bg-gray-50"
            >
              Back
            </Button>
            <Button
              onClick={handleContinue}
              disabled={!selectedCountry}
              className={`w-full sm:w-auto px-8 py-3 font-semibold text-white transition-colors ${
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
