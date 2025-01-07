import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SaleForm } from "./SaleForm";

interface AddSaleDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddSaleDialog({ isOpen, onClose }: AddSaleDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
        </DialogHeader>
        <SaleForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
}