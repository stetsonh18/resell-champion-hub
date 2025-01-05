import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";

type CategoryResponse = Database["public"]["Tables"]["categories"]["Row"] & {
  parent: {
    name: string;
  } | null;
};

export const CategoryList = () => {
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(
    null
  );
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(
    null
  );

  const { data: categories, isLoading } = useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select(
          `
          *,
          parent:parent_id(name)
        `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  // Group categories by parent
  const groupedCategories = categories?.reduce((acc, category) => {
    if (!category.parent_id) {
      if (!acc[category.id]) {
        acc[category.id] = {
          ...category,
          subcategories: [],
        };
      } else {
        acc[category.id] = {
          ...category,
          subcategories: acc[category.id].subcategories,
        };
      }
    } else {
      if (!acc[category.parent_id]) {
        acc[category.parent_id] = {
          subcategories: [category],
        };
      } else {
        acc[category.parent_id].subcategories.push(category);
      }
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="space-y-2">
      {Object.values(groupedCategories || {}).map((category: any) => (
        <div key={category.id} className="space-y-2">
          {category.name && (
            <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border">
              <div className="flex items-center gap-4">
                <span className="font-medium text-foreground">
                  {category.name}
                </span>
                <Badge variant="secondary">{category.code}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryToEdit(category)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryToDelete(category)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          {category.subcategories?.map((subcategory: CategoryResponse) => (
            <div
              key={subcategory.id}
              className="flex items-center justify-between p-4 bg-card/50 rounded-lg shadow-sm ml-8 relative border border-border/50"
            >
              <div className="flex items-center gap-4">
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{subcategory.name}</span>
                <Badge variant="secondary">{subcategory.code}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryToEdit(subcategory)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCategoryToDelete(subcategory)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ))}

      <DeleteCategoryDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        category={categoryToDelete!}
      />

      <EditCategoryDialog
        open={!!categoryToEdit}
        onOpenChange={(open) => !open && setCategoryToEdit(null)}
        category={categoryToEdit!}
      />
    </div>
  );
};