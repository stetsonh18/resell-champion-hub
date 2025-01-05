import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { CategoryList } from "@/components/categories/CategoryList";
import { CategoryHeader } from "@/components/categories/CategoryHeader";
import { AddCategoryDialog } from "@/components/categories/AddCategoryDialog";
import { useState } from "react";

const Categories = () => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  return (
    <DashboardLayout>
      <div className="p-6">
        <CategoryHeader onAddCategory={() => setIsAddingCategory(true)} />
        <CategoryList />
        <AddCategoryDialog
          open={isAddingCategory}
          onOpenChange={setIsAddingCategory}
        />
      </div>
    </DashboardLayout>
  );
};

export default Categories;