import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package2, TrendingUp, DollarSign } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

export function ShipmentsStats() {
  const { data: stats } = useQuery({
    queryKey: ['shipment-stats'],
    queryFn: async () => {
      const { data: products, error } = await supabase
        .from('products')
        .select(`
          id,
          sales (
            sale_price
          )
        `)
        .eq('status', 'pending_shipment');

      if (error) throw error;

      const totalShipments = products?.filter(p => p.sales?.length > 0).length || 0;
      const totalValue = products?.reduce((sum, product) => 
        sum + (product.sales?.[0]?.sale_price || 0), 0
      ) || 0;
      const averageValue = totalShipments > 0 ? totalValue / totalShipments : 0;

      return {
        totalShipments,
        totalValue,
        averageValue,
      };
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Shipments"
        value={stats?.totalShipments?.toString() || "0"}
        icon={Package2}
      />

      <StatCard
        title="Total Value"
        value={`$${stats?.totalValue?.toFixed(2) || "0.00"}`}
        icon={TrendingUp}
      />

      <StatCard
        title="Average Value"
        value={`$${stats?.averageValue?.toFixed(2) || "0.00"}`}
        icon={DollarSign}
      />
    </div>
  );
}