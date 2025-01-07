import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReturnsStats } from "@/components/returns/ReturnsStats";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddReturnDialog } from "@/components/returns/AddReturnDialog";

export default function Returns() {
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Returns</h1>
          <Button 
            className="bg-secondary hover:bg-secondary/90"
            onClick={() => setIsAddReturnOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Process Return
          </Button>
          <AddReturnDialog
            open={isAddReturnOpen}
            onOpenChange={setIsAddReturnOpen}
          />
        </div>
        
        <ReturnsStats />
        <ReturnsTable />
      </div>
    </DashboardLayout>
  );
}