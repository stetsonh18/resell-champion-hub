import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";

interface QuickActionsProps {
  setIsAddProductOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddSaleOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddReturnOpen: Dispatch<SetStateAction<boolean>>;
  setIsAddExpenseOpen: Dispatch<SetStateAction<boolean>>;
}

export const QuickActions = ({
  setIsAddProductOpen,
  setIsAddSaleOpen,
  setIsAddReturnOpen,
  setIsAddExpenseOpen,
}: QuickActionsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddProductOpen(true)}
          >
            Add Product
          </Button>
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddSaleOpen(true)}
          >
            Add Sale
          </Button>
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddReturnOpen(true)}
          >
            Process Return
          </Button>
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddExpenseOpen(true)}
          >
            Add Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};