import { ChartContainer } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { format } from "date-fns";

interface RevenueChartProps {
  data: {
    date: Date;
    revenue: number;
  }[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const formattedData = data.map(item => ({
    ...item,
    date: format(new Date(item.date), 'MMM d'),
    formattedRevenue: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(item.revenue)
  }));

  const config = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--primary))"
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Revenue Over Time</h3>
        </div>
        <div className="h-[300px] mt-4">
          <ChartContainer config={config}>
            <LineChart data={formattedData}>
              <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '0.5rem'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
                formatter={(value: number) => [
                  new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(value),
                  "Revenue"
                ]}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};