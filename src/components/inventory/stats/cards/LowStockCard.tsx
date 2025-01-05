import { AlertCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface LowStockCardProps {
  lowStock: number;
}

export const LowStockCard = ({ lowStock }: LowStockCardProps) => {
  return (
    <StatCard
      title="Listed"
      value={lowStock.toString()}
      icon={AlertCircle}
      iconColor="text-pink-500"
      bgColor="bg-pink-100"
    />
  );
};