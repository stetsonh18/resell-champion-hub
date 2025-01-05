import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { CategoryStats } from "@/components/categories/CategoryStats";
import { CategorySearch } from "@/components/categories/CategorySearch";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";
import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";

const Categories = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: categories = [] } = useCategories();

  const filteredCategories = categories.filter((category) => {
    const matchesSearch = 
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.code.toLowerCase().includes(searchQuery.toLowerCase());

    // If this is a main category, check if any of its subcategories match the search
    if (category.type === "category") {
      const hasMatchingSubcategories = categories.some(
        (sub) =>
          sub.type === "subcategory" &&
          sub.parent_id === category.id &&
          (sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sub.code.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      return matchesSearch || hasMatchingSubcategories;
    }

    return matchesSearch;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6 pb-16">
        <CategoryHeader onAddCategory={() => setIsAddingCategory(true)} />
        <CategoryStats categories={categories} />
        <CategorySearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <CategoryList categories={filteredCategories} />
        <AddCategoryDialog
          open={isAddingCategory}
          onOpenChange={setIsAddingCategory}
        />
      </div>
    </DashboardLayout>
  );
};

export default Categories;