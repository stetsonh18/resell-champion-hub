import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExpenseForm } from "./ExpenseForm";

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
        <ExpenseForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};