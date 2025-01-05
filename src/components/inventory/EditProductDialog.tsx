import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductForm } from "./ProductForm";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProductFormValues } from "./schema";

interface EditProductDialogProps {
  product: any;
  onProductUpdated: () => void;
}

export function EditProductDialog({ product, onProductUpdated }: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      setIsSubmitting(true);
      const { error } = await supabase
        .from("products")
        .update({
          name: values.name,
          purchase_price: values.purchase_price,
          target_price: values.target_price,
          quantity: values.quantity,
          condition: values.condition,
          notes: values.notes,
          category_id: values.category_id,
          store_id: values.store_id,
          purchase_date: values.purchase_date,
          location: values.location,
          status: values.status,
        })
        .eq("id", product.id);

      if (error) throw error;

      toast.success("Product updated successfully");
      setOpen(false);
      onProductUpdated();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          initialValues={{
            name: product.name,
            purchase_price: product.purchase_price,
            target_price: product.target_price,
            quantity: product.quantity,
            condition: product.condition,
            notes: product.notes || "",
            category_id: product.category_id,
            store_id: product.store_id,
            purchase_date: product.purchase_date,
            location: product.location || "",
            status: product.status,
          }}
        />
      </DialogContent>
    </Dialog>
  );
}