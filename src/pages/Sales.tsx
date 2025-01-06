import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesTable } from "@/components/sales/SalesTable";
import { SalesStats } from "@/components/sales/SalesStats";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Sales = () => {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(name),
          platform:platforms(name),
          store:stores(name)
        `)
        .order('sale_date', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
            <p className="text-muted-foreground">
              Manage your sales and track your revenue
            </p>
          </div>
          <AddSaleDialog />
        </div>

        <SalesStats sales={sales} />
        <SalesTable sales={sales} isLoading={isLoading} />
      </div>
    </DashboardLayout>
  );
};

export default Sales;