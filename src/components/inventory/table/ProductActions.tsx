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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ProductActionsProps {
  product: any;
  onDelete: (id: string) => void;
}

export const ProductActions = ({ product, onDelete }: ProductActionsProps) => {
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

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

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete(product.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
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
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};