import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useCategories } from "@/hooks/use-categories";
import { Button } from "@/components/ui/button";
import { Plus, Folder, ChevronRight } from "lucide-react";
import { useState } from "react";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";
import { EditCategoryDialog } from "@/components/categories/EditCategoryDialog";
import { DeleteCategoryDialog } from "@/components/categories/DeleteCategoryDialog";
import { CategoryResponse } from "@/hooks/use-categories";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

const Categories = () => {
  const { data: categories, isLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState<CategoryResponse | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryResponse | null>(null);

  // Filter categories based on search query
  const filteredCategories = categories?.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Separate categories and subcategories
  const mainCategories = filteredCategories?.filter((cat) => cat.type === "category") || [];
  const subcategories = filteredCategories?.filter((cat) => cat.type === "subcategory") || [];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Categories</h1>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Categories</h1>
          <Button onClick={() => setIsAddingCategory(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Categories List */}
        <div className="space-y-4">
          {mainCategories.map((category) => {
            const categorySubcategories = subcategories.filter(
              (sub) => sub.parent_id === category.id
            );

            return (
              <div key={category.id} className="space-y-2">
                {/* Main Category */}
                <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border">
                  <div className="flex items-center gap-3">
                    <Folder className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCategoryToEdit(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCategoryToDelete(category)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Subcategories */}
                {categorySubcategories.map((subcategory) => (
                  <div
                    key={subcategory.id}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg ml-6 relative border border-border/50"
                  >
                    <div className="flex items-center gap-3">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {subcategory.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCategoryToEdit(subcategory)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCategoryToDelete(subcategory)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}

          {mainCategories.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No categories found
            </div>
          )}
        </div>

        {/* Dialogs */}
        <AddCategoryDialog
          open={isAddingCategory}
          onOpenChange={setIsAddingCategory}
        />
        <EditCategoryDialog
          open={!!categoryToEdit}
          onOpenChange={(open) => !open && setCategoryToEdit(null)}
          category={categoryToEdit}
        />
        <DeleteCategoryDialog
          open={!!categoryToDelete}
          onOpenChange={(open) => !open && setCategoryToDelete(null)}
          category={categoryToDelete}
        />
      </div>
    </DashboardLayout>
  );
};

export default Categories;