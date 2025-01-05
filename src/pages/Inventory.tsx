import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InventoryTable } from "@/components/inventory/table/InventoryTable";
import { InventoryStats } from "@/components/inventory/stats/InventoryStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Inventory() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button className="bg-pink-500 hover:bg-pink-600">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
        <InventoryStats />
        <InventoryTable />
      </div>
    </DashboardLayout>
  );
}