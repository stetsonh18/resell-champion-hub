import { Package, ShoppingCart, Box, TrendingUp, DollarSign, RefreshCw, ListTodo } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { type DashboardStats } from "@/hooks/use-dashboard-stats";

interface DashboardStatsProps {
  stats: DashboardStats;
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Products"
        value={stats.totalProducts.toString()}
        icon={Package}
      />
      <StatCard
        title="Items Sold This Month"
        value={stats.itemsSoldThisMonth.toString()}
        icon={ShoppingCart}
      />
      <StatCard
        title="Items in Stock"
        value={stats.inStockProducts.toString()}
        icon={Box}
      />
      <StatCard
        title="Active Listings"
        value={stats.activeListings.toString()}
        icon={TrendingUp}
      />
      <StatCard
        title="Sales This Month"
        value={`$${stats.salesAmountThisMonth.toFixed(2)}`}
        icon={DollarSign}
      />
      <StatCard
        title="Average Sale Price"
        value={`$${stats.averageSalePrice.toFixed(2)}`}
        icon={DollarSign}
      />
      <StatCard
        title="Pending Shipments"
        value={stats.pendingShipments.toString()}
        icon={Package}
      />
      <StatCard
        title="Returns to Process"
        value={stats.pendingReturns.toString()}
        icon={RefreshCw}
      />
      <StatCard
        title="Items to List"
        value={stats.unlistedProducts.toString()}
        icon={ListTodo}
      />
    </div>
  );
};