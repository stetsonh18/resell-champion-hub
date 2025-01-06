import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { ProductFormValues } from "@/hooks/use-product-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StoreAndCategoryFieldsProps {
  form: UseFormReturn<ProductFormValues>;
}

export function StoreAndCategoryFields({ form }: StoreAndCategoryFieldsProps) {
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

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("type", { ascending: false })
        .order("name");
      if (error) throw error;
      return data;
    },
  });

  const organizedCategories = categories?.reduce((acc, curr) => {
    if (curr.type === "category") {
      acc.push({
        ...curr,
        subcategories: categories.filter(
          (sub) => sub.type === "subcategory" && sub.parent_id === curr.id
        ),
      });
    }
    return acc;
  }, [] as any[]);

  return (
    <div className="grid grid-cols-2 gap-4">
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
                {organizedCategories?.map((category) => (
                  <div key={category.id}>
                    <SelectItem value={category.id}>
                      {category.name}
                    </SelectItem>
                    {category.subcategories?.map((sub: any) => (
                      <SelectItem key={sub.id} value={sub.id} className="pl-4">
                        ↳ {sub.name}
                      </SelectItem>
                    ))}
                  </div>
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