import { useQuery } from "@tanstack/react-query";
import { DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { supabase } from "@/integrations/supabase/client";

export const SalesStats = ({ sales }: { sales?: any[] }) => {
  const totalSales = sales?.length || 0;
  const totalRevenue = sales?.reduce((sum, sale) => sum + sale.sale_price, 0) || 0;
  const totalProfit = sales?.reduce((sum, sale) => sum + sale.net_profit, 0) || 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        title="Total Sales"
        value={totalSales.toString()}
        icon={ShoppingCart}
      />
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSign}
      />
      <StatCard
        title="Net Profit"
        value={`$${totalProfit.toFixed(2)}`}
        icon={TrendingUp}
      />
    </div>
  );
};