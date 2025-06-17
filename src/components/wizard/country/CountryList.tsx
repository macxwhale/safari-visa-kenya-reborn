
import CountryListItem from "./CountryListItem";
import { countries, frequentlySelected } from "@/data/countries";

interface CountryListProps {
  searchTerm: string;
  selectedCountry: string;
  onCountrySelect: (country: string) => void;
}

export default function CountryList({ searchTerm, selectedCountry, onCountrySelect }: CountryListProps) {
  const showFrequentlySelected = !searchTerm;
  const filteredCountries = searchTerm.length === 0
    ? countries
    : countries.filter(country => country.toLowerCase().includes(searchTerm.toLowerCase()));

  const filteredFrequentlySelected = showFrequentlySelected
    ? frequentlySelected.filter(name =>
        name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const filteredAllCountries = filteredCountries.filter(country =>
    showFrequentlySelected
      ? !filteredFrequentlySelected.includes(country)
      : true
  );

  return (
    <div className="flex-1 pt-2 pb-2 overflow-y-auto">
      {/* Frequently Selected */}
      {showFrequentlySelected && filteredFrequentlySelected.length > 0 && (
        <>
          <div className="font-semibold text-base text-gray-900 mb-2 mt-3">Frequently Selected</div>
          <div className="mb-2">
            {filteredFrequentlySelected.map(country => (
              <CountryListItem
                key={country}
                country={country}
                isSelected={selectedCountry === country}
                onSelect={onCountrySelect}
              />
            ))}
          </div>
        </>
      )}

      {/* All Countries */}
      <div className="font-semibold text-base text-gray-900 mb-2 mt-4">All Countries</div>
      <div>
        {filteredAllCountries.length ? (
          filteredAllCountries.map(country => (
            <CountryListItem
              key={country}
              country={country}
              isSelected={selectedCountry === country}
              onSelect={onCountrySelect}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center py-8">
            <p>No countries found matching "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}
