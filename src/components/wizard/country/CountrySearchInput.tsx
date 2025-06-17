
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CountrySearchInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function CountrySearchInput({ searchTerm, onSearchChange }: CountrySearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={e => onSearchChange(e.target.value)}
        className="pl-10 rounded-full border-gray-300 focus:ring-brand-green focus:border-brand-green transition placeholder:text-gray-400 text-base h-12"
      />
    </div>
  );
}
