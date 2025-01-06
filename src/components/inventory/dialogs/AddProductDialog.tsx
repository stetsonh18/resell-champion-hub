import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "../forms/ProductForm";
import { useCreateProduct } from "@/hooks/use-create-product";

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddProductDialog({ isOpen, onClose }: AddProductDialogProps) {
  const { form, onSubmit } = useCreateProduct(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-background p-6">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Add Product</DialogTitle>
        </DialogHeader>
        <ProductForm form={form} onSubmit={onSubmit} buttonText="Create Product" />
      </DialogContent>
    </Dialog>
  );
}