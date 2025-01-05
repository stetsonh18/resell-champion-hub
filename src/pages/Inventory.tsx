import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InventoryTable } from "@/components/inventory/table/InventoryTable";
import { InventoryStats } from "@/components/inventory/stats/InventoryStats";

export default function Inventory() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <InventoryStats />
        <InventoryTable />
      </div>
    </DashboardLayout>
  );
}