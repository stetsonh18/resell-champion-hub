import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { CategoryCard } from "./CategoryCard";
import { SubcategoryCard } from "./SubcategoryCard";
import { useCategories, CategoryResponse } from "@/hooks/use-categories";

export const CategoryList = () => {
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(
    null
  );
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(
    null
  );

  const { data: categories, isLoading } = useCategories();

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
            <CategoryCard
              category={category}
              onEdit={setCategoryToEdit}
              onDelete={setCategoryToDelete}
            />
          )}
          {category.subcategories?.map((subcategory: CategoryResponse) => (
            <SubcategoryCard
              key={subcategory.id}
              subcategory={subcategory}
              onEdit={setCategoryToEdit}
              onDelete={setCategoryToDelete}
            />
          ))}
        </div>
      ))}

      <DeleteCategoryDialog
        open={!!categoryToDelete}
        onOpenChange={(open) => !open && setCategoryToDelete(null)}
        category={categoryToDelete}
      />

      <EditCategoryDialog
        open={!!categoryToEdit}
        onOpenChange={(open) => !open && setCategoryToEdit(null)}
        category={categoryToEdit!}
      />
    </div>
  );
};