import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";
import { useState } from "react";
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
import { EditSaleDialog } from "../dialogs/EditSaleDialog";

interface SalesActionsProps {
  sale: {
    id: string;
    sale_date: string;
    product_id: string;
    platform_id: string;
    sale_price: number;
    quantity: number;
    shipping_amount_collected?: number;
    shipping_cost?: number;
    platform_fees?: number;
  };
  onDelete: (id: string) => void;
}

export const SalesActions = ({ sale, onDelete }: SalesActionsProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete(sale.id);
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex justify-end gap-2">
        <EditSaleDialog sale={sale} />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this sale record.
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