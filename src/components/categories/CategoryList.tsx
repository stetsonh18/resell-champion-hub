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

  // First, separate categories and subcategories
  const mainCategories = categories?.filter(cat => cat.type === "category") || [];
  const subcategories = categories?.filter(cat => cat.type === "subcategory") || [];

  // Create the grouped structure
  const groupedCategories = mainCategories.reduce((acc, category) => {
    acc[category.id] = {
      ...category,
      subcategories: subcategories.filter(sub => sub.parent_id === category.id),
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <div className="space-y-2">
      {Object.values(groupedCategories).map((category: any) => (
        <div key={category.id} className="space-y-2">
          <CategoryCard
            category={category}
            onEdit={setCategoryToEdit}
            onDelete={setCategoryToDelete}
          />
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
        category={categoryToEdit}
      />
    </div>
  );
};