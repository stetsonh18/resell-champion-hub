import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DateRangeSelector } from "@/components/analytics/DateRangeSelector";
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics";
import { RevenueChart } from "@/components/analytics/RevenueChart";
import { CategoryPieChart } from "@/components/analytics/CategoryPieChart";
import { InventoryValueChart } from "@/components/analytics/InventoryValueChart";
import { useState } from "react";
import { DateRange } from "@/components/analytics/types";

const Analytics = () => {
  const [dateRanges, setDateRanges] = useState<{
    current: DateRange;
    previous: DateRange;
  } | null>(null);

  const { data: sales, isLoading: salesLoading } = useQuery({
    queryKey: ["sales-analytics", dateRanges?.current, dateRanges?.previous],
    queryFn: async () => {
      if (!dateRanges) return [];

      const { data, error } = await supabase
        .from("sales")
        .select(`
          *,
          product:products(purchase_price, category_id, name),
          platform:platforms(name)
        `)
        .gte('sale_date', dateRanges.previous.from.toISOString())
        .lte('sale_date', dateRanges.current.to.toISOString());

      if (error) throw error;
      return data;
    },
    enabled: !!dateRanges,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*");

      if (error) throw error;
      return data;
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name)
        `);

      if (error) throw error;
      return data;
    },
  });

  // Prepare data for the revenue chart
  const revenueData = sales?.reduce((acc: { date: Date; revenue: number }[], sale) => {
    const saleDate = new Date(sale.sale_date);
    const dateStr = saleDate.toISOString().split('T')[0];
    
    const existingEntry = acc.find(entry => entry.date.toISOString().split('T')[0] === dateStr);
    
    if (existingEntry) {
      existingEntry.revenue += sale.sale_price;
    } else {
      acc.push({
        date: saleDate,
        revenue: sale.sale_price
      });
    }
    
    return acc;
  }, []).sort((a, b) => a.date.getTime() - b.date.getTime()) || [];

  // Prepare data for the category pie chart
  const categoryData = sales?.reduce((acc: { [key: string]: number }, sale) => {
    const categoryId = sale.product?.category_id;
    const category = categories?.find(c => c.id === categoryId);
    const categoryName = category?.name || 'Uncategorized';
    
    acc[categoryName] = (acc[categoryName] || 0) + sale.sale_price;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData || {}).map(([name, value]) => ({
    name,
    value
  }));

  // Prepare data for the inventory value chart
  const inventoryData = products?.reduce((acc: { [key: string]: number }, product) => {
    const categoryName = product.category?.name || 'Uncategorized';
    const value = product.purchase_price * product.quantity;
    
    acc[categoryName] = (acc[categoryName] || 0) + value;
    return acc;
  }, {});

  const inventoryChartData = Object.entries(inventoryData || {}).map(([name, value]) => ({
    name,
    value
  }));

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
  const currentMetrics = dateRanges
    ? calculateMetricsForPeriod(dateRanges.current.from, dateRanges.current.to)
    : { totalSales: 0, totalRevenue: 0, totalProfit: 0, profitMargin: 0 };
  
  const previousMetrics = dateRanges
    ? calculateMetricsForPeriod(dateRanges.previous.from, dateRanges.previous.to)
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

  const metrics = {
    totalRevenue,
    totalProfit,
    totalSales,
    averageOrderValue,
    profitMargin
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <DateRangeSelector 
            onRangeChange={(current, previous) => 
              setDateRanges({ current, previous })
            } 
          />
        </div>

        <AnalyticsMetrics metrics={metrics} growth={growth} />
        
        {dateRanges && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2">
              <RevenueChart data={revenueData} />
            </div>
            <CategoryPieChart data={pieChartData} />
            <InventoryValueChart data={inventoryChartData} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;