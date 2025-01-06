import { Button } from "@/components/ui/button";
import { MoreHorizontal, Trash2, Tag } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditProductDialog } from "../dialogs/EditProductDialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface ProductActionsProps {
  product: any;
  onDelete: (id: string) => void;
}

export const ProductActions = ({ product, onDelete }: ProductActionsProps) => {
  const queryClient = useQueryClient();

  const handleStatusChange = async () => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ status: "listed" })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Product marked as listed");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error updating product status:", error);
      toast.error("Failed to update product status");
    }
  };

  return (
    <div className="flex justify-end gap-2">
      {product.status === "in_stock" && (
        <Button 
          variant="outline" 
          size="icon" 
          onClick={handleStatusChange}
          title="Mark as Listed"
        >
          <Tag className="h-4 w-4" />
        </Button>
      )}
      <EditProductDialog product={product} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};