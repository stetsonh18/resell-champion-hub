import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ShipmentsStats } from "@/components/shipments/ShipmentsStats";
import { ShipmentsTable } from "@/components/shipments/ShipmentsTable";
import { ShipmentsFilters } from "@/components/shipments/ShipmentsFilters";

export default function Shipments() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pending Shipments</h1>
          <p className="text-muted-foreground">
            Manage your pending shipments and mark items as shipped
          </p>
        </div>
        
        <ShipmentsStats />
        <ShipmentsFilters />
        <ShipmentsTable />
      </div>
    </DashboardLayout>
  );
}