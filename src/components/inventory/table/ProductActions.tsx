import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { EditProductDialog } from "../EditProductDialog";

interface ProductActionsProps {
  product: any;
  onDelete: () => void;
  onEdit: () => void;
}

export const ProductActions = ({ product, onDelete, onEdit }: ProductActionsProps) => {
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete();
    }
  };

  return (
    <div className="flex justify-end gap-2">
      <EditProductDialog product={product} onProductUpdated={onEdit} />
      <Button
        variant="ghost"
        size="icon"
        onClick={handleDelete}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};