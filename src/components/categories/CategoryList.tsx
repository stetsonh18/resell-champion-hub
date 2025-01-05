import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { DeleteCategoryDialog } from "./DeleteCategoryDialog";
import { EditCategoryDialog } from "./EditCategoryDialog";
import { CategoryCard } from "./CategoryCard";
import { SubcategoryCard } from "./SubcategoryCard";
import { CategoryResponse } from "@/hooks/use-categories";

interface CategoryListProps {
  categories?: CategoryResponse[];
  isLoading?: boolean;
}

export const CategoryList = ({ categories, isLoading }: CategoryListProps) => {
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(
    null
  );
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(
    null
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-card rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="bg-card rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="bg-card rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (!categories?.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No categories found
      </div>
    );
  }

  // First, separate categories and subcategories
  const mainCategories = categories.filter((cat) => cat.type === "category") || [];
  const subcategories = categories.filter((cat) => cat.type === "subcategory") || [];

  console.log("Main categories:", mainCategories);
  console.log("Subcategories:", subcategories);

  // Create the grouped structure
  const groupedCategories = mainCategories.reduce((acc, category) => {
    acc[category.id] = {
      ...category,
      subcategories: subcategories.filter((sub) => sub.parent_id === category.id),
    };
    return acc;
  }, {} as Record<string, any>);

  console.log("Grouped categories:", groupedCategories);

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