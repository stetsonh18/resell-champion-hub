import { AlertCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface LowStockCardProps {
  lowStock: number;
}

export const LowStockCard = ({ lowStock }: LowStockCardProps) => {
  return (
    <StatCard
      title="Low Stock Items"
      value={lowStock.toString()}
      icon={AlertCircle}
    />
  );
};