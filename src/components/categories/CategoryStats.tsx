import { Layers, ArrowUp, FolderTree, BarChart3 } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { CategoryResponse } from "@/hooks/use-categories";

interface CategoryStatsProps {
  categories: CategoryResponse[];
}

export const CategoryStats = ({ categories }: CategoryStatsProps) => {
  const totalCategories = categories?.length || 0;
  const topLevelCategories = categories?.filter(cat => cat.type === "category").length || 0;
  const subcategories = categories?.filter(cat => cat.type === "subcategory").length || 0;
  const averageDepth = subcategories > 0 ? (subcategories / topLevelCategories).toFixed(1) : "0.0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <StatCard
        title="Total Categories"
        value={totalCategories.toString()}
        icon={Layers}
      />
      <StatCard
        title="Top Level"
        value={topLevelCategories.toString()}
        icon={ArrowUp}
      />
      <StatCard
        title="Subcategories"
        value={subcategories.toString()}
        icon={FolderTree}
      />
      <StatCard
        title="Average Depth"
        value={averageDepth}
        icon={BarChart3}
      />
    </div>
  );
};