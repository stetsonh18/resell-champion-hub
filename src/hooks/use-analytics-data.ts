import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRange } from "@/components/analytics/types";

export const useAnalyticsData = (dateRanges: { current: DateRange; previous: DateRange } | null) => {
  const { data: sales, isLoading: salesLoading } = useQuery({
    queryKey: ["sales-analytics", dateRanges?.current, dateRanges?.previous],
    queryFn: async () => {
      if (!dateRanges) return [];

      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(purchase_price, category_id, name),
          platform:platforms(name)
        `)
        .gte('sale_date', dateRanges.previous.from.toISOString())
        .lte('sale_date', dateRanges.current.to.toISOString());

      if (error) throw error;
      return data;
    },
    enabled: !!dateRanges,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) throw error;
      return data;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name)
        `);

      if (error) throw error;
      return data;
    },
  });

  return {
    sales,
    categories,
    products,
    salesLoading
  };
};