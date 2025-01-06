import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchInput = ({ searchQuery, setSearchQuery }: SearchInputProps) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search by product name or SKU..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};