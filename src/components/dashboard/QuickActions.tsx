import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";

export type QuickActionsProps = {
  setIsAddProductOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddSaleOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddReturnOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddExpenseOpen: Dispatch<SetStateAction<boolean>>;
};

export const QuickActions = ({
  setIsAddProductOpen,
  setIsAddSaleOpen,
  setIsAddReturnOpen,
  setIsAddExpenseOpen
}: QuickActionsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Quick Actions</h2>
      <div className="flex gap-2">
        <Button onClick={() => setIsAddProductOpen(true)}>Add Product</Button>
        <Button onClick={() => setIsAddSaleOpen(true)}>Add Sale</Button>
        <Button onClick={() => setIsAddReturnOpen(true)}>Add Return</Button>
        <Button onClick={() => setIsAddExpenseOpen(true)}>Add Expense</Button>
      </div>
    </div>
  );
};