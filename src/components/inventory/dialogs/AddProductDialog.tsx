import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductForm } from "../forms/ProductForm";
import { useCreateProduct } from "@/hooks/use-create-product";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
  const { form, onSubmit } = useCreateProduct(() => onOpenChange(false));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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