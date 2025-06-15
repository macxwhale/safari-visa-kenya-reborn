import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search, HelpCircle } from "lucide-react";
import { useState } from "react";

// Simplified map; in production a library or full-iso mapping would be best.
const countryFlags: Record<string, string> = {
  "Afghanistan": "🇦🇫",
  "Albania": "🇦🇱",
  "Algeria": "🇩🇿",
  "Andorra": "🇦🇩",
  "Angola": "🇦🇴",
  "Argentina": "🇦🇷",
  "Armenia": "🇦🇲",
  "Australia": "🇦🇺",
  "Austria": "🇦🇹",
  "Azerbaijan": "🇦🇿",
  "Bahrain": "🇧🇭",
  "Bangladesh": "🇧🇩",
  "Belarus": "🇧🇾",
  "Belgium": "🇧🇪",
  "Belize": "🇧🇿",
  "Benin": "🇧🇯",
  "Bhutan": "🇧🇹",
  "Bolivia": "🇧🇴",
  "Bosnia and Herzegovina": "🇧🇦",
  "Botswana": "🇧🇼",
  "Brazil": "🇧🇷",
  "Brunei": "🇧🇳",
  "Bulgaria": "🇧🇬",
  "Burkina Faso": "🇧🇫",
  "Cambodia": "🇰🇭",
  "Cameroon": "🇨🇲",
  "Canada": "🇨🇦",
  "Chad": "🇹🇩",
  "Chile": "🇨🇱",
  "China": "🇨🇳",
  "Colombia": "🇨🇴",
  "Costa Rica": "🇨🇷",
  "Croatia": "🇭🇷",
  "Cuba": "🇨🇺",
  "Cyprus": "🇨🇾",
  "Czech Republic": "🇨🇿",
  "Denmark": "🇩🇰",
  "Ecuador": "🇪🇨",
  "Egypt": "🇪🇬",
  "Estonia": "🇪🇪",
  "Ethiopia": "🇪🇹",
  "Finland": "🇫🇮",
  "France": "🇫🇷",
  "Georgia": "🇬🇪",
  "Germany": "🇩🇪",
  "Ghana": "🇬🇭",
  "Greece": "🇬🇷",
  "Guatemala": "🇬🇹",
  "Guinea": "🇬🇳",
  "Hungary": "🇭🇺",
  "Iceland": "🇮🇸",
  "India": "🇮🇳",
  "Indonesia": "🇮🇩",
  "Iran": "🇮🇷",
  "Iraq": "🇮🇶",
  "Ireland": "🇮🇪",
  "Israel": "🇮🇱",
  "Italy": "🇮🇹",
  "Japan": "🇯🇵",
  "Jordan": "🇯🇴",
  "Kazakhstan": "🇰🇿",
  "Kuwait": "🇰🇼",
  "Latvia": "🇱🇻",
  "Lebanon": "🇱🇧",
  "Libya": "🇱🇾",
  "Lithuania": "🇱🇹",
  "Luxembourg": "🇱🇺",
  "Malaysia": "🇲🇾",
  "Maldives": "🇲🇻",
  "Mali": "🇲🇱",
  "Malta": "🇲🇹",
  "Mexico": "🇲🇽",
  "Morocco": "🇲🇦",
  "Netherlands": "🇳🇱",
  "New Zealand": "🇳🇿",
  "Nigeria": "🇳🇬",
  "Norway": "🇳🇴",
  "Oman": "🇴🇲",
  "Pakistan": "🇵🇰",
  "Panama": "🇵🇦",
  "Peru": "🇵🇪",
  "Philippines": "🇵🇭",
  "Poland": "🇵🇱",
  "Portugal": "🇵🇹",
  "Qatar": "🇶🇦",
  "Romania": "🇷🇴",
  "Russia": "🇷🇺",
  "Saudi Arabia": "🇸🇦",
  "Senegal": "🇸🇳",
  "Serbia": "🇷🇸",
  "Singapore": "🇸🇬",
  "Slovakia": "🇸🇰",
  "Slovenia": "🇸🇮",
  "South Africa": "🇿🇦",
  "South Korea": "🇰🇷",
  "Spain": "🇪🇸",
  "Sri Lanka": "🇱🇰",
  "Sweden": "🇸🇪",
  "Switzerland": "🇨🇭",
  "Thailand": "🇹🇭",
  "Tunisia": "🇹🇳",
  "Turkey": "🇹🇷",
  "Ukraine": "🇺🇦",
  "United Arab Emirates": "🇦🇪",
  "United Kingdom": "🇬🇧",
  "United States": "🇺🇸",
  "United States of America": "🇺🇸",
  "Uruguay": "🇺🇾",
  "Venezuela": "🇻🇪",
  "Vietnam": "🇻🇳"
};

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

const frequentlySelected = [
  "Italy",
  "Poland",
  "United Kingdom",
  "United States of America"
];

const countryISOCodes: Record<string, string> = {
  "Afghanistan": "AF",
  "Albania": "AL",
  "Algeria": "DZ",
  "Andorra": "AD",
  "Angola": "AO",
  "Argentina": "AR",
  "Armenia": "AM",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Brazil": "BR",
  "Brunei": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Colombia": "CO",
  "Costa Rica": "CR",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czech Republic": "CZ",
  "Denmark": "DK",
  "Ecuador": "EC",
  "Egypt": "EG",
  "Estonia": "EE",
  "Ethiopia": "ET",
  "Finland": "FI",
  "France": "FR",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Greece": "GR",
  "Guatemala": "GT",
  "Guinea": "GN",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Israel": "IL",
  "Italy": "IT",
  "Japan": "JP",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kuwait": "KW",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Libya": "LY",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Mexico": "MX",
  "Morocco": "MA",
  "Netherlands": "NL",
  "New Zealand": "NZ",
  "Nigeria": "NG",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Panama": "PA",
  "Peru": "PE",
  "Philippines": "PH",
  "Poland": "PL",
  "Portugal": "PT",
  "Qatar": "QA",
  "Romania": "RO",
  "Russia": "RU",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "South Africa": "ZA",
  "South Korea": "KR",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Thailand": "TH",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States": "US",
  "United States of America": "US",
  "Uruguay": "UY",
  "Venezuela": "VE",
  "Vietnam": "VN"
};

interface CountryResidenceModalProps {
  onClose: () => void;
  onCountrySelect: (country: string) => void;
  onBack: () => void;
}

export default function CountryResidenceModal({ onClose, onCountrySelect, onBack }: CountryResidenceModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // If search, filter all countries. If empty, show frequentlySelected on top.
  const showFrequentlySelected = !searchTerm;
  const filteredCountries =
    searchTerm.length === 0
      ? countries
      : countries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredFrequentlySelected = showFrequentlySelected
    ? frequentlySelected.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  // Unique all country list, since frequentlySelected will also appear in all countries
  const filteredAllCountries = filteredCountries.filter(country =>
    showFrequentlySelected
      ? !filteredFrequentlySelected.includes(country)
      : true
  );

  // function to render the badge with iso code
  const renderISOBadge = (country: string) => (
    <span
      className="inline-flex items-center justify-center bg-gray-100 text-gray-700 font-mono text-sm font-semibold rounded w-12 h-7 mr-3 border border-gray-200"
      style={{ minWidth: 36 }}
    >
      {countryISOCodes[country] || "??"}
    </span>
  );

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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10 rounded-full border-gray-300 focus:ring-brand-green focus:border-brand-green transition placeholder:text-gray-400 text-base h-12"
            />
          </div>
        </div>

        {/* Country List */}
        <div className="flex-1 px-8 pt-2 pb-2 overflow-y-auto">
          {/* Frequently Selected */}
          {showFrequentlySelected && filteredFrequentlySelected.length > 0 && (
            <>
              <div className="font-semibold text-base text-gray-900 mb-2 mt-3">Frequently Selected</div>
              <div className="mb-2">
                {filteredFrequentlySelected.map(country => (
                  <div
                    key={country}
                    onClick={() => setSelectedCountry(country)}
                    className={`flex items-center gap-2 cursor-pointer rounded px-2 py-2 border-b hover:bg-gray-50 transition-colors ${
                      selectedCountry === country ? "bg-gray-100 border-brand-green" : "border-transparent"
                    }`}
                  >
                    {renderISOBadge(country)}
                    <span className="text-base font-medium text-gray-900">{country}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* All Countries */}
          <div className="font-semibold text-base text-gray-900 mb-2 mt-4">All Countries</div>
          <div>
            {filteredAllCountries.length ? filteredAllCountries.map(country => (
              <div
                key={country}
                onClick={() => setSelectedCountry(country)}
                className={`flex items-center gap-2 cursor-pointer rounded px-2 py-2 border-b hover:bg-gray-50 transition-colors ${
                  selectedCountry === country ? "bg-gray-100 border-brand-green" : "border-transparent"
                }`}
              >
                {renderISOBadge(country)}
                <span className="text-base font-medium text-gray-900">{country}</span>
              </div>
            )) : (
              <div className="text-gray-500 text-center py-8">
                <p>No countries found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
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
