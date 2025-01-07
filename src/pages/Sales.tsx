import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesStats } from "@/components/sales/SalesStats";
import { SalesTable } from "@/components/sales/SalesTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";

export default function Sales() {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
            <p className="text-muted-foreground">
              Track and manage your sales
            </p>
          </div>
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddSaleOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Sale
          </Button>
          <AddSaleDialog 
            open={isAddSaleOpen} 
            onOpenChange={setIsAddSaleOpen} 
          />
        </div>
        
        <SalesStats />
        <SalesTable />
      </div>
    </DashboardLayout>
  );
}