import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .eq("type", "category");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by product name or SKU..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="hide-out-of-stock"
            checked={hideOutOfStock}
            onCheckedChange={setHideOutOfStock}
          />
          <Label htmlFor="hide-out-of-stock">Hide out of stock</Label>
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories?.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};