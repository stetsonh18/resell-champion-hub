import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesTable } from "@/components/sales/SalesTable";
import { SalesStats } from "@/components/sales/SalesStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Sales = () => {
  const [isAddSaleOpen, setIsAddSaleOpen] = useState(false);

  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(name, purchase_price),
          platform:platforms(name)
        `)
        .order('sale_date', { ascending: false });

      if (error) {
        console.error("Error fetching sales:", error);
        throw error;
      }
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
            <p className="text-muted-foreground">
              Track and manage your sales
            </p>
          </div>
          <Button onClick={() => setIsAddSaleOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Sale
          </Button>
          <AddSaleDialog 
            isOpen={isAddSaleOpen}
            onClose={() => setIsAddSaleOpen(false)}
          />
        </div>

        <SalesStats sales={sales} />
        <SalesTable sales={sales} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
};

export default Sales;