import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AddProductDialog } from "@/components/inventory/dialogs/AddProductDialog";
import { AddExpenseDialog } from "@/components/expenses/AddExpenseDialog";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";

const Index = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);
  const [isAddReturnOpen, setIsAddReturnOpen] = useState(false);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  const stats = useDashboardStats();

  return (
    <DashboardLayout>
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Dashboard
          </h1>
        </div>
        
        <DashboardStats stats={stats} />

        <div className="grid gap-6 md:grid-cols-2">
          <QuickActions 
            setIsAddProductOpen={setIsAddProductOpen}
            setIsAddSaleOpen={setIsAddSaleOpen}
            setIsAddReturnOpen={setIsAddReturnOpen}
            setIsAddExpenseOpen={setIsAddExpenseOpen}
          />
          <RecentActivity />
        </div>

        <AddProductDialog 
          open={isAddProductOpen} 
          onOpenChange={setIsAddProductOpen}
        />
        <AddExpenseDialog 
          open={isAddExpenseOpen} 
          onOpenChange={setIsAddExpenseOpen}
        />
      </div>
    </DashboardLayout>
  );
};

export default Index;