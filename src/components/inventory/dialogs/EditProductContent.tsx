import { ProductForm } from "../forms/ProductForm";
import { useEditProduct } from "@/hooks/use-edit-product";
import { useEffect } from "react";

interface EditProductContentProps {
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
  onClose: () => void;
}

export function EditProductContent({ product, onClose }: EditProductContentProps) {
  const { form, onSubmit } = useEditProduct(product.id, onClose);

  useEffect(() => {
    // Set form default values when product data is available
    form.reset({
      name: product.name,
      purchase_price: product.purchase_price,
      target_price: product.target_price,
      quantity: product.quantity,
      condition: product.condition as any,
      notes: product.notes || "",
      store_id: product.store_id,
      category_id: product.category_id,
      status: (product.status || "in_stock") as "in_stock" | "listed" | "pending_shipment" | "shipped",
      // Ensure we're always working with a Date object
      purchase_date: product.purchase_date ? new Date(product.purchase_date) : new Date(),
    });
  }, [product, form]);

  return <ProductForm form={form} onSubmit={onSubmit} buttonText="Update Product" showStatus={true} />;
}