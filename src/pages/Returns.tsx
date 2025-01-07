import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ReturnsTable } from "@/components/returns/ReturnsTable";
import { ReturnsStats } from "@/components/returns/ReturnsStats";
import { useState } from "react";
import { AddReturnDialog } from "@/components/returns/AddReturnDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Returns() {
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Returns</h1>
          <Button onClick={() => setIsAddReturnOpen(true)}>
            <Plus className="h-4 w-4" />
            Process Return
          </Button>
          <AddReturnDialog 
            isOpen={isAddReturnOpen} 
            onClose={() => setIsAddReturnOpen(false)} 
          />
        </div>
        <ReturnsStats />
        <ReturnsTable />
      </div>
    </DashboardLayout>
  );
}