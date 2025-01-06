import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const { data: sales } = useQuery({
    queryKey: ["sales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sales")
        .select("*")
        .order("sale_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  // Calculate metrics
  const totalRevenue = sales?.reduce((sum, sale) => sum + sale.sale_price, 0) || 0;
  const activeListings = products?.filter(p => p.status === 'listed').length || 0;
  const pendingOrders = products?.filter(p => p.status === 'pending_shipment').length || 0;
  const netProfit = sales?.reduce((sum, sale) => sum + (sale.estimated_profit || 0), 0) || 0;

  // Calculate trends (comparing to previous month)
  const currentMonth = new Date().getMonth();
  const currentMonthSales = sales?.filter(sale => 
    new Date(sale.sale_date).getMonth() === currentMonth
  );
  const previousMonthSales = sales?.filter(sale => 
    new Date(sale.sale_date).getMonth() === currentMonth - 1
  );

  const revenueTrend = previousMonthSales?.length 
    ? ((currentMonthSales?.length || 0) - previousMonthSales.length) / previousMonthSales.length * 100
    : 0;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            trend={{ value: Math.abs(revenueTrend), isPositive: revenueTrend >= 0 }}
          />
          <StatCard
            title="Active Listings"
            value={activeListings.toString()}
            icon={Package}
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders.toString()}
            icon={ShoppingCart}
          />
          <StatCard
            title="Net Profit"
            value={`$${netProfit.toLocaleString()}`}
            icon={TrendingUp}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;