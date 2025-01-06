import { DollarSign, Package, TrendingUp, ArrowUpRight } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface SalesStatsProps {
  sales?: any[];
}

export const SalesStats = ({ sales = [] }: SalesStatsProps) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.sale_price, 0);
  const totalSales = sales.length;
  const totalProfit = sales.reduce((sum, sale) => sum + sale.net_profit, 0);
  
  // Calculate month-over-month growth
  const currentMonth = new Date().getMonth();
  const currentMonthSales = sales.filter(
    (sale) => new Date(sale.sale_date).getMonth() === currentMonth
  );
  const previousMonthSales = sales.filter(
    (sale) => new Date(sale.sale_date).getMonth() === currentMonth - 1
  );
  
  const salesGrowth = previousMonthSales.length
    ? ((currentMonthSales.length - previousMonthSales.length) / previousMonthSales.length) * 100
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={DollarSign}
      />
      <StatCard
        title="Total Sales"
        value={totalSales.toString()}
        icon={Package}
        trend={{ value: Math.abs(salesGrowth), isPositive: salesGrowth >= 0 }}
      />
      <StatCard
        title="Net Profit"
        value={`$${totalProfit.toLocaleString()}`}
        icon={TrendingUp}
      />
      <StatCard
        title="Average Order Value"
        value={`$${totalSales ? (totalRevenue / totalSales).toFixed(2) : "0"}`}
        icon={ArrowUpRight}
      />
    </div>
  );
};