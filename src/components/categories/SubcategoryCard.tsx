import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Pencil, Trash2 } from "lucide-react";
import { Database } from "@/integrations/supabase/types";

type CategoryResponse = Database["public"]["Tables"]["categories"]["Row"] & {
  parent: {
    name: string;
  } | null;
};

interface SubcategoryCardProps {
  subcategory: CategoryResponse;
  onEdit: (category: CategoryResponse) => void;
  onDelete: (category: CategoryResponse) => void;
}

export const SubcategoryCard = ({
  subcategory,
  onEdit,
  onDelete,
}: SubcategoryCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg shadow-sm ml-8 relative border border-border/50">
      <div className="flex items-center gap-4">
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">{subcategory.name}</span>
        <Badge variant="secondary">{subcategory.code}</Badge>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => onEdit(subcategory)}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(subcategory)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};