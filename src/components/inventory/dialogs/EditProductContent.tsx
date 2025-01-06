import { ProductForm } from "../forms/ProductForm";
import { useProductForm } from "@/hooks/use-product-form";

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
  };
  onClose: () => void;
}

export function EditProductContent({ product, onClose }: EditProductContentProps) {
  const { form, onSubmit } = useProductForm(onClose, product.id);

  return <ProductForm form={form} onSubmit={onSubmit} />;
}