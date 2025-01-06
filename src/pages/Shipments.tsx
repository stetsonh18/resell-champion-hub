import { ShipmentsStats } from "@/components/shipments/ShipmentsStats";
import { ShipmentsTable } from "@/components/shipments/ShipmentsTable";
import { ShipmentsFilters } from "@/components/shipments/ShipmentsFilters";

export default function Shipments() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pending Shipments</h1>
          <p className="text-muted-foreground">
            Manage your pending shipments and mark items as shipped
          </p>
        </div>
      </div>
      
      <ShipmentsStats />
      <ShipmentsFilters />
      <ShipmentsTable />
    </div>
  );
}