import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { useQuery } from "@tanstack/react-query";

export type CategoryResponse = Database["public"]["Tables"]["categories"]["Row"] & {
  parent: {
    name: string;
  } | null;
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      console.log("Fetching categories...");
      const { data, error } = await supabase
        .from("categories")
        .select(`
          *,
          parent:parent_id (
            id,
            name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }

      console.log("Categories data:", data);
      return data as CategoryResponse[];
    },
  });
};