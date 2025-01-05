import { DollarSign } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { formatCurrency } from "@/lib/utils";

interface InventoryValueCardProps {
  totalValue: number;
}

export const InventoryValueCard = ({ totalValue }: InventoryValueCardProps) => {
  return (
    <StatCard
      title="Inventory Value"
      value={formatCurrency(totalValue)}
      icon={DollarSign}
    />
  );
};