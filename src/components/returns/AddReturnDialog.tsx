import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReturnForm } from "./ReturnForm";

interface AddReturnDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddReturnDialog = ({ isOpen, onClose }: AddReturnDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Return</DialogTitle>
          <DialogDescription>
            Fill in the details to process a product return.
          </DialogDescription>
        </DialogHeader>
        <ReturnForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};