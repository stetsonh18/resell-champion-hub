import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { toast } from "sonner";

interface ProductActionsProps {
  onDelete: () => void;
}

export const ProductActions = ({ onDelete }: ProductActionsProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          toast.info("Edit functionality coming soon");
        }}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this product?")) {
            onDelete();
          }
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};