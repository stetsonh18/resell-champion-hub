import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StoresTable } from "@/components/stores/StoresTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Stores = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Stores</h1>
            <p className="text-muted-foreground">
              Manage your store locations and settings
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Store
          </Button>
        </div>
        <StoresTable />
      </div>
    </DashboardLayout>
  );
};

export default Stores;