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
      <DialogContent className="sm:max-w-[650px] bg-background p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Product</DialogTitle>
        </DialogHeader>
        <div className="mt-6">
          <ProductForm form={form} onSubmit={onSubmit} buttonText="Create Product" />
        </div>
      </DialogContent>
    </Dialog>
  );
}