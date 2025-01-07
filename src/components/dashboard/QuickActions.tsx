import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { useState } from "react";

interface QuickActionsProps {
  setIsAddProductOpen: (open: boolean) => void;
  setIsAddReturnOpen: (open: boolean) => void;
  setIsAddExpenseOpen: (open: boolean) => void;
}

export const QuickActions = ({
  setIsAddProductOpen,
  setIsAddReturnOpen,
  setIsAddExpenseOpen,
}: QuickActionsProps) => {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);

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
        <AddSaleDialog 
          isOpen={isAddSaleOpen}
          onClose={() => setIsAddSaleOpen(false)}
        />
      </CardContent>
    </Card>
  );
};