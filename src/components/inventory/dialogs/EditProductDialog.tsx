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
        <DialogContent className="sm:max-w-[650px] bg-background p-8">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="mt-6">
            <EditProductContent product={product} onClose={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};