import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryStats } from "@/components/categories/CategoryStats";
import { CategorySearch } from "@/components/categories/CategorySearch";
import { CategoryTable } from "@/components/categories/CategoryTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";

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
          <Button className="bg-secondary hover:bg-secondary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
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