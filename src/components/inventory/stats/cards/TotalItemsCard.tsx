import { Package } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";

interface TotalItemsCardProps {
  totalItems: number;
}

export const TotalItemsCard = ({ totalItems }: TotalItemsCardProps) => {
  return (
    <StatCard
      title="Total Products"
      value={totalItems.toString()}
      icon={Package}
      iconColor="text-pink-500"
      bgColor="bg-pink-100"
    />
  );
};