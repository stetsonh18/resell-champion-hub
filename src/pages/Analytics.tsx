import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, TrendingUp, ShoppingCart, BarChart3, Percent } from "lucide-react";
import { startOfDay, endOfDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { useState } from "react";

const Analytics = () => {
  // State for date ranges
  const [currentPeriod, setCurrentPeriod] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });

  const [previousPeriod, setPreviousPeriod] = useState<{
    from: Date;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: undefined,
  });

  // Format date ranges for query
  const currentStart = currentPeriod.from ? startOfDay(currentPeriod.from) : undefined;
  const currentEnd = currentPeriod.to ? endOfDay(currentPeriod.to) : undefined;
  const previousStart = previousPeriod.from ? startOfDay(previousPeriod.from) : undefined;
  const previousEnd = previousPeriod.to ? endOfDay(previousPeriod.to) : undefined;

  const { data: sales, isLoading } = useQuery({
    queryKey: ["sales-analytics", currentStart, currentEnd, previousStart, previousEnd],
    queryFn: async () => {
      if (!currentStart || !currentEnd || !previousStart || !previousEnd) return [];

      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(purchase_price)
        `)
        .gte('sale_date', previousStart.toISOString())
        .lte('sale_date', currentEnd.toISOString());

      if (error) throw error;
      return data;
    },
    enabled: !!(currentStart && currentEnd && previousStart && previousEnd),
  });

  // Helper function to calculate metrics for a date range
  const calculateMetricsForPeriod = (startDate: Date, endDate: Date) => {
    const periodSales = sales?.filter(sale => {
      const saleDate = new Date(sale.sale_date);
      return saleDate >= startDate && saleDate <= endDate;
    }) || [];

    const totalSales = periodSales.length;
    const totalRevenue = periodSales.reduce((sum, sale) => sum + sale.sale_price, 0);
    
    const totalProfit = periodSales.reduce((sum, sale) => {
      const revenue = sale.sale_price + (sale.shipping_amount_collected || 0);
      const costs = (sale.product?.purchase_price || 0) + 
                   (sale.shipping_cost || 0) + 
                   (sale.platform_fees || 0);
      return sum + (revenue - costs);
    }, 0);

    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    return {
      totalSales,
      totalRevenue,
      totalProfit,
      profitMargin
    };
  };

  // Calculate metrics for both periods
  const currentMetrics = currentStart && currentEnd 
    ? calculateMetricsForPeriod(currentStart, currentEnd)
    : { totalSales: 0, totalRevenue: 0, totalProfit: 0, profitMargin: 0 };
  
  const previousMetrics = previousStart && previousEnd
    ? calculateMetricsForPeriod(previousStart, previousEnd)
    : { totalSales: 0, totalRevenue: 0, totalProfit: 0, profitMargin: 0 };

  // Calculate growth percentages
  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const growth = {
    revenue: calculateGrowth(currentMetrics.totalRevenue, previousMetrics.totalRevenue),
    profit: calculateGrowth(currentMetrics.totalProfit, previousMetrics.totalProfit),
    orders: calculateGrowth(currentMetrics.totalSales, previousMetrics.totalSales),
    margin: calculateGrowth(currentMetrics.profitMargin, previousMetrics.profitMargin)
  };

  // Calculate all-time metrics
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

        <div>
          <h2 className="text-xl font-semibold mb-4">Period over Period Growth</h2>
          
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            <Card className="p-4">
              <h3 className="font-medium mb-2">Current Period</h3>
              <Calendar
                mode="range"
                selected={{
                  from: currentPeriod.from,
                  to: currentPeriod.to,
                }}
                onSelect={(range) => {
                  if (range) setCurrentPeriod(range);
                }}
                className="rounded-md border"
              />
            </Card>
            
            <Card className="p-4">
              <h3 className="font-medium mb-2">Previous Period</h3>
              <Calendar
                mode="range"
                selected={{
                  from: previousPeriod.from,
                  to: previousPeriod.to,
                }}
                onSelect={(range) => {
                  if (range) setPreviousPeriod(range);
                }}
                className="rounded-md border"
              />
            </Card>
          </div>

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
    </DashboardLayout>
  );
};

export default Analytics;