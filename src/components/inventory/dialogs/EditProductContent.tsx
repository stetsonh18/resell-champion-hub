import { ProductForm } from "../forms/ProductForm";
import { useEditProduct } from "@/hooks/use-edit-product";

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
  const { form, onSubmit } = useEditProduct(product.id, onClose);

  return <ProductForm form={form} onSubmit={onSubmit} buttonText="Update Product" />;
}