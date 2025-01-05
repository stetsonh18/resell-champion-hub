import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type CategoryResponse = Database["public"]["Tables"]["categories"]["Row"] & {
  parent: {
    name: string;
  } | null;
};

interface CategoryCardProps {
  category: CategoryResponse;
  onEdit: (category: CategoryResponse) => void;
  onDelete: (category: CategoryResponse) => void;
}

export const CategoryCard = ({ category, onEdit, onDelete }: CategoryCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card rounded-lg shadow-sm border">
      <div className="flex items-center gap-4">
        <span className="font-medium text-foreground">{category.name}</span>
        <Badge variant="secondary">{category.code}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(category)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};