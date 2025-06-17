
import { FlagIcon } from "@/components/ui/flag-icon";

interface CountryListItemProps {
  country: string;
  isSelected: boolean;
  onSelect: (country: string) => void;
}

export default function CountryListItem({ country, isSelected, onSelect }: CountryListItemProps) {
  const handleClick = () => {
    console.log("Country list item clicked:", country);
    try {
      onSelect(country);
    } catch (error) {
      console.error("Error in CountryListItem onClick:", error);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-3 cursor-pointer rounded px-2 py-2 border-b hover:bg-gray-50 transition-colors ${
        isSelected ? "bg-gray-100 border-brand-green" : "border-transparent"
      }`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <FlagIcon country={country} size={32} />
      <span className="text-base font-medium text-gray-900">{country}</span>
    </div>
  );
}
