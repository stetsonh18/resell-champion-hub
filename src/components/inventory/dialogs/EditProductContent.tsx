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
    categories?: {
      id: string;
      name: string;
      code: string;
    };
    purchase_date?: string;
    status?: "in_stock" | "listed" | "pending_shipment" | "shipped";
    location?: string;
  };
  onClose: () => void;
}

export function EditProductContent({ product, onClose }: EditProductContentProps) {
  const { form, onSubmit } = useEditProduct(product.id, onClose);

  useEffect(() => {
    form.reset({
      name: product.name || "",
      purchase_price: product.purchase_price || 0,
      target_price: product.target_price || 0,
      quantity: product.quantity || 0,
      condition: product.condition as any || "new",
      notes: product.notes || "",
      store_id: product.store_id || "",
      category_id: product.category_id || "",
      status: (product.status || "in_stock") as "in_stock" | "listed" | "pending_shipment" | "shipped",
      location: product.location || "",
      purchase_date: product.purchase_date ? new Date(product.purchase_date) : new Date(),
    });
  }, [product, form]);

  return <ProductForm form={form} onSubmit={onSubmit} buttonText="Update Product" showStatus={true} />;
}