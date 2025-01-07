import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatCard = ({ title, value, icon: Icon, trend }: StatCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-[#1A1F2C] to-[#131720]">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400">
              {title}
            </p>
            <h3 className="text-2xl font-semibold mt-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {value}
            </h3>
            {trend && (
              <p
                className={`text-sm mt-2 ${
                  trend.isPositive ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className="p-3 bg-[#242B3D] rounded-full">
            <Icon className="w-6 h-6 text-gray-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};