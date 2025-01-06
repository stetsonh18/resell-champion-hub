import { SearchInput } from "./filters/SearchInput";
import { StockFilter } from "./filters/StockFilter";
import { CategoryFilter } from "./filters/CategoryFilter";
import { StoreFilter } from "./filters/StoreFilter";
import { StatusFilter } from "./filters/StatusFilter";

interface ProductFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  hideOutOfStock: boolean;
  setHideOutOfStock: (value: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedStore: string;
  setSelectedStore: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

export const ProductFilters = ({
  searchQuery,
  setSearchQuery,
  hideOutOfStock,
  setHideOutOfStock,
  selectedCategory,
  setSelectedCategory,
  selectedStore,
  setSelectedStore,
  selectedStatus,
  setSelectedStatus,
}: ProductFiltersProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <StockFilter
          hideOutOfStock={hideOutOfStock}
          setHideOutOfStock={setHideOutOfStock}
        />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <StoreFilter 
          selectedStore={selectedStore} 
          setSelectedStore={setSelectedStore} 
        />
        <StatusFilter 
          selectedStatus={selectedStatus} 
          setSelectedStatus={setSelectedStatus} 
        />
      </div>
    </div>
  );
};