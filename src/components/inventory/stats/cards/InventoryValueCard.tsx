import { DollarSign } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";

interface InventoryValueCardProps {
  totalValue: number;
}

export const InventoryValueCard = ({ totalValue }: InventoryValueCardProps) => {
  return (
    <StatCard
      title="Total Value"
      value={formatCurrency(totalValue)}
      icon={DollarSign}
      iconColor="text-red-500"
      bgColor="bg-red-100"
    />
  );
};