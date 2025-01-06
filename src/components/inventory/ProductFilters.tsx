import { SearchInput } from "./filters/SearchInput";
import { StockFilter } from "./filters/StockFilter";
import { CategoryFilter } from "./filters/CategoryFilter";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  hideOutOfStock: boolean;
  setHideOutOfStock: (value: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
}

export const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  hideOutOfStock,
  setHideOutOfStock,
  selectedCategory,
  setSelectedCategory,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex items-center gap-4">
        <StockFilter
          hideOutOfStock={hideOutOfStock}
          setHideOutOfStock={setHideOutOfStock}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
};