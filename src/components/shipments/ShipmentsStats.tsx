import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Package2, TrendingUp, DollarSign } from "lucide-react";

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
        .eq('status', 'pending_shipment')
        .single();

      if (error) throw error;

      const totalShipments = products?.length || 0;
      const totalValue = products?.sales?.reduce((sum, sale) => sum + (sale.sale_price || 0), 0) || 0;
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
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-pink-100 rounded-lg">
          <Package2 className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Shipments</p>
          <h2 className="text-2xl font-bold">{stats?.totalShipments || 0}</h2>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <TrendingUp className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Total Value</p>
          <h2 className="text-2xl font-bold">${stats?.totalValue.toFixed(2)}</h2>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-pink-100 rounded-lg">
          <DollarSign className="h-6 w-6 text-pink-500" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Average Value</p>
          <h2 className="text-2xl font-bold">${stats?.averageValue.toFixed(2)}</h2>
        </div>
      </Card>
    </div>
  );
}