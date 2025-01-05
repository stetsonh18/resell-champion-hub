import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ProductFormFields } from "./product/ProductFormFields";
import { useProductForm } from "./product/useProductForm";

interface AddProductFormProps {
  onSuccess: () => void;
}

export function AddProductForm({ onSuccess }: AddProductFormProps) {
  const { form, isLoading, categories, onCategoryChange, onSubmit } = useProductForm(onSuccess);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4">
        <ProductFormFields 
          form={form}
          categories={categories}
          onCategoryChange={onCategoryChange}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>
    </Form>
  );
}