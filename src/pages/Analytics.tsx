import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DateRangeSelector } from "@/components/analytics/DateRangeSelector";
import { AnalyticsMetrics } from "@/components/analytics/AnalyticsMetrics";
import { ChartGrid } from "@/components/analytics/ChartGrid";
import { useState } from "react";
import { DateRange } from "@/components/analytics/types";
import { useAnalyticsData } from "@/hooks/use-analytics-data";
import { useAnalyticsMetrics } from "@/hooks/use-analytics-metrics";
import { endOfDay, startOfDay, subDays } from "date-fns";

const Analytics = () => {
  const now = new Date();
  const defaultDateRanges = {
    current: {
      from: startOfDay(subDays(now, 30)),
      to: endOfDay(now)
    },
    previous: {
      from: startOfDay(subDays(now, 60)),
      to: endOfDay(subDays(now, 30))
    }
  };

  const [dateRanges, setDateRanges] = useState<{
    current: DateRange;
    previous: DateRange;
  }>(defaultDateRanges);

  const { sales, categories, products } = useAnalyticsData(dateRanges);
  const { calculateMetricsForPeriod, calculateGrowth } = useAnalyticsMetrics(sales);

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

  // Prepare data for platform performance table
  const platformPerformanceData = sales?.reduce((acc: { [key: string]: any }, sale) => {
    const platformName = sale.platform?.name || 'Unknown';
    
    if (!acc[platformName]) {
      acc[platformName] = {
        name: platformName,
        sales: 0,
        profit: 0,
        orders: 0,
        margin: 0
      };
    }
    
    const revenue = sale.sale_price + (sale.shipping_amount_collected || 0);
    const costs = (sale.product?.purchase_price || 0) * sale.quantity + 
                 (sale.shipping_cost || 0) + 
                 (sale.platform_fees || 0);
    const profit = revenue - costs;
    
    acc[platformName].sales += revenue;
    acc[platformName].profit += profit;
    acc[platformName].orders += 1;
    
    return acc;
  }, {});

  // Calculate margins and convert to array
  const platformTableData = Object.values(platformPerformanceData || {}).map((platform: any) => ({
    ...platform,
    margin: (platform.profit / platform.sales) * 100 || 0
  }));

  // Prepare data for category performance table
  const categoryPerformanceData = sales?.reduce((acc: { [key: string]: any }, sale) => {
    const categoryId = sale.product?.category_id;
    const category = categories?.find(c => c.id === categoryId);
    const categoryName = category?.name || 'Uncategorized';
    
    if (!acc[categoryName]) {
      acc[categoryName] = {
        name: categoryName,
        sales: 0,
        profit: 0,
        orders: 0,
        margin: 0
      };
    }
    
    const revenue = sale.sale_price + (sale.shipping_amount_collected || 0);
    const costs = (sale.product?.purchase_price || 0) * sale.quantity + 
                 (sale.shipping_cost || 0) + 
                 (sale.platform_fees || 0);
    const profit = revenue - costs;
    
    acc[categoryName].sales += revenue;
    acc[categoryName].profit += profit;
    acc[categoryName].orders += 1;
    
    return acc;
  }, {});

  // Calculate margins and convert to array
  const categoryTableData = Object.values(categoryPerformanceData || {}).map((category: any) => ({
    ...category,
    margin: (category.profit / category.sales) * 100 || 0
  }));

  const currentMetrics = calculateMetricsForPeriod(dateRanges.current.from, dateRanges.current.to);
  const previousMetrics = calculateMetricsForPeriod(dateRanges.previous.from, dateRanges.previous.to);

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
        
        <ChartGrid 
          categoryData={pieChartData}
          inventoryData={inventoryChartData}
          platformPerformanceData={platformTableData}
          categoryPerformanceData={categoryTableData}
        />
      </div>
    </DashboardLayout>
  );
};

export default Analytics;