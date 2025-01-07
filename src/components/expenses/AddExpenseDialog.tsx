import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type AddExpenseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AddExpenseDialog = ({ open, onOpenChange }: AddExpenseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Expense</DialogTitle>
        </DialogHeader>
        <div>
          {/* Your form for adding an expense goes here */}
          <Button onClick={() => onOpenChange(false)}>Submit Expense</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};