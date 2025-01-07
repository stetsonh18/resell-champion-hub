import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, TrendingUp, ShoppingCart, BarChart3, Percent } from "lucide-react";

type MetricsData = {
  totalRevenue: number;
  totalProfit: number;
  totalSales: number;
  averageOrderValue: number;
  profitMargin: number;
};

type GrowthData = {
  revenue: number;
  profit: number;
  orders: number;
  margin: number;
};

type AnalyticsMetricsProps = {
  metrics: MetricsData;
  growth: GrowthData;
};

export const AnalyticsMetrics = ({ metrics, growth }: AnalyticsMetricsProps) => {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        <StatCard
          title="Total Revenue"
          value={`$${metrics.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatCard
          title="Total Profit"
          value={`$${metrics.totalProfit.toFixed(2)}`}
          icon={TrendingUp}
        />
        <StatCard
          title="Total Sales"
          value={metrics.totalSales.toString()}
          icon={ShoppingCart}
        />
        <StatCard
          title="Average Order Value"
          value={`$${metrics.averageOrderValue.toFixed(2)}`}
          icon={BarChart3}
        />
        <StatCard
          title="Profit Margin"
          value={`${metrics.profitMargin.toFixed(1)}%`}
          icon={Percent}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Period over Period Growth</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Revenue Growth"
            value={`${growth.revenue.toFixed(1)}%`}
            icon={DollarSign}
            trend={{
              value: Math.abs(growth.revenue),
              isPositive: growth.revenue >= 0
            }}
          />
          <StatCard
            title="Profit Growth"
            value={`${growth.profit.toFixed(1)}%`}
            icon={TrendingUp}
            trend={{
              value: Math.abs(growth.profit),
              isPositive: growth.profit >= 0
            }}
          />
          <StatCard
            title="Orders Growth"
            value={`${growth.orders.toFixed(1)}%`}
            icon={ShoppingCart}
            trend={{
              value: Math.abs(growth.orders),
              isPositive: growth.orders >= 0
            }}
          />
          <StatCard
            title="Margin Growth"
            value={`${growth.margin.toFixed(1)}%`}
            icon={Percent}
            trend={{
              value: Math.abs(growth.margin),
              isPositive: growth.margin >= 0
            }}
          />
        </div>
      </div>
    </div>
  );
};