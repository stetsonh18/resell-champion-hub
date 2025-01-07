import { RevenueChart } from "./RevenueChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { InventoryValueChart } from "./InventoryValueChart";
import { PlatformPerformanceChart } from "./PlatformPerformanceChart";
import { CategoryPerformanceChart } from "./CategoryPerformanceChart";

interface ChartGridProps {
  revenueData: { date: Date; revenue: number }[];
  categoryData: { name: string; value: number }[];
  inventoryData: { name: string; value: number }[];
  platformPerformanceData: { name: string; sales: number; revenue: number }[];
  categoryPerformanceData: { name: string; sales: number; profit: number }[];
}

export const ChartGrid = ({ 
  revenueData, 
  categoryData, 
  inventoryData,
  platformPerformanceData,
  categoryPerformanceData
}: ChartGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2">
        <RevenueChart data={revenueData} />
      </div>
      <div className="md:col-span-2">
        <PlatformPerformanceChart data={platformPerformanceData} />
      </div>
      <div className="md:col-span-2">
        <CategoryPerformanceChart data={categoryPerformanceData} />
      </div>
      <CategoryPieChart data={categoryData} />
      <InventoryValueChart data={inventoryData} />
    </div>
  );
};