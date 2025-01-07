import { DateRange } from "@/components/analytics/types";

export const useAnalyticsMetrics = (sales: any[] | null) => {
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

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  return {
    calculateMetricsForPeriod,
    calculateGrowth
  };
};