import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type CategoryResponse = {
  id: string;
  name: string;
  code: string;
  type: "category" | "subcategory";
  parent_id: string | null;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      return data as CategoryResponse[];
    },
  });
};