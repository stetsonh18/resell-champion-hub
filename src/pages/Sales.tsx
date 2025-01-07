import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesStats } from "@/components/sales/SalesStats";
import { SalesTable } from "@/components/sales/SalesTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Sales() {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);

  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          products (
            name,
            purchase_price
          ),
          platforms (
            name
          )
        `)
        .order("sale_date", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

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
            isOpen={isAddSaleOpen}
            onClose={() => setIsAddSaleOpen(false)}
          />
        </div>
        
        <SalesStats />
        <SalesTable sales={sales} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
}