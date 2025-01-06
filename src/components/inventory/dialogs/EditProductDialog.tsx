import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { EditProductContent } from "./EditProductContent";

interface EditProductDialogProps {
  product: {
    id: string;
    name: string;
    purchase_price: number;
    target_price: number;
    quantity: number;
    condition: string;
    notes?: string;
    store_id?: string;
    category_id?: string;
    purchase_date?: string;
    status?: "in_stock" | "listed" | "pending_shipment" | "shipped";
  };
}

export const EditProductDialog = ({ product }: EditProductDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
        <Edit className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px] bg-[#0A0A0A] border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold text-white">Edit Product</DialogTitle>
          </DialogHeader>
          <EditProductContent product={product} onClose={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};