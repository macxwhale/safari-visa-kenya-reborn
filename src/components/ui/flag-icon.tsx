
import { getCountryCallingCode, getCountries, getCountryCode } from 'country-flag-icons'

interface FlagIconProps {
  country: string;
  className?: string;
  size?: number;
}

// Map country names to ISO codes for flag display
const countryNameToISO: Record<string, string> = {
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

export function FlagIcon({ country, className = "", size = 24 }: FlagIconProps) {
  const countryCode = countryNameToISO[country];
  
  if (!countryCode) {
    // Fallback to a generic flag icon if country not found
    return (
      <div 
        className={`bg-gray-300 rounded ${className}`}
        style={{ width: size, height: size * 0.75 }}
      />
    );
  }

  // Use the flag URL from the library
  const flagUrl = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryCode}.svg`;
  
  return (
    <img
      src={flagUrl}
      alt={`${country} flag`}
      className={`rounded border border-gray-200 ${className}`}
      style={{ width: size, height: size * 0.75 }}
      loading="lazy"
    />
  );
}
