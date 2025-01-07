import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AddExpenseDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AddExpenseDialog = ({ open, onClose }: AddExpenseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Expense</DialogTitle>
        </DialogHeader>
        <div>
          {/* Your form for adding an expense goes here */}
          <Button onClick={onClose}>Submit Expense</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
