import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryStats } from "@/components/categories/CategoryStats";
import { CategorySearch } from "@/components/categories/CategorySearch";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories, isLoading } = useCategories();

  const filteredCategories = categories?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">Categories</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your product categories and subcategories
            </p>
          </div>
          <AddCategoryDialog categories={categories || []} />
        </div>

        <CategoryStats categories={categories || []} />
        <CategorySearch 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
        />
        <CategoryTable 
          categories={filteredCategories || []} 
          isLoading={isLoading} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Categories;