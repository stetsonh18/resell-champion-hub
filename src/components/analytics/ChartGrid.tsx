import { CategoryPieChart } from "./CategoryPieChart";
import { InventoryValueChart } from "./InventoryValueChart";
import { PlatformPerformanceTable } from "./PlatformPerformanceTable";
import { CategoryPerformanceTable } from "./CategoryPerformanceTable";
import { RevenueChart } from "./RevenueChart";

interface ChartGridProps {
  categoryData: { name: string; value: number }[];
  inventoryData: { name: string; value: number }[];
  platformPerformanceData: { 
    name: string;
    sales: number;
    profit: number;
    orders: number;
    margin: number;
  }[];
  categoryPerformanceData: { 
    name: string;
    sales: number;
    profit: number;
    orders: number;
    margin: number;
  }[];
  revenueData: { date: Date; revenue: number }[];
}

export const ChartGrid = ({ 
  categoryData, 
  inventoryData,
  platformPerformanceData,
  categoryPerformanceData,
  revenueData
}: ChartGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div className="md:col-span-2">
        <PlatformPerformanceTable data={platformPerformanceData} />
      </div>
      <div className="md:col-span-2">
        <CategoryPerformanceTable data={categoryPerformanceData} />
      </div>
      <div className="md:col-span-2">
        <RevenueChart data={revenueData} />
      </div>
      <CategoryPieChart data={categoryData} />
      <InventoryValueChart data={inventoryData} />
    </div>
  );
};