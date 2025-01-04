import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, Package, ShoppingCart, TrendingUp } from "lucide-react";

const Index = () => {
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
            value="$12,345"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Active Listings"
            value="234"
            icon={Package}
            trend={{ value: 5, isPositive: true }}
          />
          <StatCard
            title="Pending Orders"
            value="18"
            icon={ShoppingCart}
            trend={{ value: 2, isPositive: false }}
          />
          <StatCard
            title="Net Profit"
            value="$3,456"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;