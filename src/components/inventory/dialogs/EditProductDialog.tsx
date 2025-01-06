import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { ProductForm } from "../forms/ProductForm";
import { useProductForm } from "@/hooks/use-product-form";
import { useState } from "react";

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
  const { form, onSubmit } = useProductForm(() => setOpen(false));

  // Pre-fill the form with existing product data
  const handleOpen = () => {
    form.reset({
      name: product.name,
      purchase_price: product.purchase_price,
      target_price: product.target_price,
      quantity: product.quantity,
      condition: product.condition as any,
      notes: product.notes || "",
      store_id: product.store_id,
      category_id: product.category_id,
      purchase_date: product.purchase_date ? new Date(product.purchase_date) : new Date(),
    });
    setOpen(true);
  };

  return (
    <>
      <Button variant="ghost" size="icon" onClick={handleOpen}>
        <Edit className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <ProductForm form={form} onSubmit={onSubmit} />
        </DialogContent>
      </Dialog>
    </>
  );
};