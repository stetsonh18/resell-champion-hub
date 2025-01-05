import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExpenseForm } from "./ExpenseForm";

interface EditExpenseDialogProps {
  expense: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EditExpenseDialog = ({ expense, open, onOpenChange }: EditExpenseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>
        <ExpenseForm expense={expense} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};