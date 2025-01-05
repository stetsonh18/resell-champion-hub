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
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-card to-muted/50">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <h3 className="text-2xl font-semibold mt-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {value}
            </h3>
            {trend && (
              <p
                className={`text-sm mt-1 ${
                  trend.isPositive ? "text-success" : "text-destructive"
                }`}
              >
                {trend.isPositive ? "+" : "-"}
                {Math.abs(trend.value)}% from last month
              </p>
            )}
          </div>
          <div className="p-3 bg-gradient-to-br from-muted to-muted/50 rounded-full">
            <Icon className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};