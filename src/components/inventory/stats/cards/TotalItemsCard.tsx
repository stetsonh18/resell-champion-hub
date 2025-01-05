import { Package } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface TotalItemsCardProps {
  totalItems: number;
}

export const TotalItemsCard = ({ totalItems }: TotalItemsCardProps) => {
  return (
    <StatCard
      title="Total Items"
      value={totalItems.toString()}
      icon={Package}
    />
  );
};