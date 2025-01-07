import { RevenueChart } from "./RevenueChart";
import { CategoryPieChart } from "./CategoryPieChart";
import { InventoryValueChart } from "./InventoryValueChart";

interface ChartGridProps {
  revenueData: { date: Date; revenue: number }[];
  categoryData: { name: string; value: number }[];
  inventoryData: { name: string; value: number }[];
}

export const ChartGrid = ({ revenueData, categoryData, inventoryData }: ChartGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="md:col-span-2">
        <RevenueChart data={revenueData} />
      </div>
      <CategoryPieChart data={categoryData} />
      <InventoryValueChart data={inventoryData} />
    </div>
  );
};