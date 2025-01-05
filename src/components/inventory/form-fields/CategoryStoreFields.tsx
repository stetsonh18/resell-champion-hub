import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "../schema";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CategoryStoreFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

export function CategoryStoreFields({ form }: CategoryStoreFieldsProps) {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data: allCategories, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");
      
      if (error) throw error;

      const mainCategories = allCategories.filter(cat => cat.type === "category");
      const subcategories = allCategories.filter(cat => cat.type === "subcategory");

      return mainCategories.map(mainCat => ({
        ...mainCat,
        subcategories: subcategories.filter(subCat => subCat.parent_id === mainCat.id)
      }));
    },
  });

  const { data: stores } = useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("status", "active");
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="category_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories?.map((category) => (
                  <>
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                    {category.subcategories?.map((subcategory) => (
                      <SelectItem 
                        key={subcategory.id} 
                        value={subcategory.id}
                        className="pl-6 text-sm text-muted-foreground"
                      >
                        ↳ {subcategory.name}
                      </SelectItem>
                    ))}
                  </>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="store_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Store</FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select store" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {stores?.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}