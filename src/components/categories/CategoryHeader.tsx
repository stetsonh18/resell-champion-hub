import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface CategoryHeaderProps {
  onAddCategory: () => void;
}

export const CategoryHeader = ({ onAddCategory }: CategoryHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <Button onClick={onAddCategory}>
        <Plus className="w-4 h-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
};