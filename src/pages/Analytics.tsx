import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, TrendingUp, ShoppingCart, BarChart3, Percent } from "lucide-react";

const Analytics = () => {
  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales-analytics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(purchase_price)
        `);

      if (error) throw error;
      return data;
    },
  });

  // Calculate metrics
  const totalSales = sales?.length || 0;
  const totalRevenue = sales?.reduce((sum, sale) => sum + sale.sale_price, 0) || 0;
  
  const totalProfit = sales?.reduce((sum, sale) => {
    const revenue = sale.sale_price + (sale.shipping_amount_collected || 0);
    const costs = (sale.product?.purchase_price || 0) + 
                 (sale.shipping_cost || 0) + 
                 (sale.platform_fees || 0);
    return sum + (revenue - costs);
  }, 0) || 0;

  const averageOrderValue = totalSales > 0 ? totalRevenue / totalSales : 0;
  const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={DollarSign}
          />
          <StatCard
            title="Total Profit"
            value={`$${totalProfit.toFixed(2)}`}
            icon={TrendingUp}
          />
          <StatCard
            title="Total Sales"
            value={totalSales.toString()}
            icon={ShoppingCart}
          />
          <StatCard
            title="Average Order Value"
            value={`$${averageOrderValue.toFixed(2)}`}
            icon={BarChart3}
          />
          <StatCard
            title="Profit Margin"
            value={`${profitMargin.toFixed(1)}%`}
            icon={Percent}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;