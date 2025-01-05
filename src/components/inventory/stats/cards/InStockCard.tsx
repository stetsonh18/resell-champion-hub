import { ShoppingBag } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface InStockCardProps {
  inStock: number;
}

export const InStockCard = ({ inStock }: InStockCardProps) => {
  return (
    <StatCard
      title="In Stock"
      value={inStock.toString()}
      icon={ShoppingBag}
      iconColor="text-green-500"
      bgColor="bg-green-100"
    />
  );
};