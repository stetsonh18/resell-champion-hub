import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SalesTable } from "@/components/sales/SalesTable";
import { SalesStats } from "@/components/sales/SalesStats";
import { AddSaleDialog } from "@/components/sales/AddSaleDialog";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";

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
      <Card className="p-6 space-y-8">
        <div className="flex justify-between items-center border-b pb-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sales Overview</h2>
            <p className="text-muted-foreground mt-1">
              Track and manage your sales performance
            </p>
          </div>
          <AddSaleDialog />
        </div>

        <div className="grid gap-6">
          <Card className="p-6 bg-muted/50">
            <h3 className="text-lg font-semibold mb-4">Sales Performance</h3>
            <SalesStats sales={sales} />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Sales</h3>
            <SalesTable sales={sales} isLoading={isLoading} />
          </Card>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Sales;