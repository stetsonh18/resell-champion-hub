import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Sales = () => {
  return (
    <DashboardLayout>
      <Card className="p-6">
        <h2 className="text-3xl font-bold tracking-tight">Sales</h2>
        <p className="text-muted-foreground mt-1">
          Manage your sales and track your revenue
        </p>
      </Card>
    </DashboardLayout>
  );
};

export default Sales;