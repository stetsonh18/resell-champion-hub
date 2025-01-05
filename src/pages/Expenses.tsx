import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ExpensesTable } from "@/components/expenses/ExpensesTable";
import { ExpenseStats } from "@/components/expenses/ExpenseStats";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function Expenses() {
  const [open, setOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Expenses</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus className="mr-2" />
            Add Expense
          </Button>
        </div>
        
        <ExpenseStats />
        <ExpensesTable />
        <AddExpenseDialog open={open} onOpenChange={setOpen} />
      </div>
    </DashboardLayout>
  );
}