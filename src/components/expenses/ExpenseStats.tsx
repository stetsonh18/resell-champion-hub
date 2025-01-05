import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { StatCard } from "@/components/dashboard/StatCard";
import { DollarSign, CreditCard, Receipt, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export const ExpenseStats = () => {
  const { data: stats } = useQuery({
    queryKey: ["expense-stats"],
    queryFn: async () => {
      const { data: expenses, error } = await supabase
        .from("expenses")
        .select("amount, date");

      if (error) throw error;

      const total = expenses?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;
      const thisMonth = expenses?.filter(expense => {
        const expenseDate = new Date(expense.date);
        const now = new Date();
        return expenseDate.getMonth() === now.getMonth() && 
               expenseDate.getFullYear() === now.getFullYear();
      }).reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;

      const lastMonth = expenses?.filter(expense => {
        const expenseDate = new Date(expense.date);
        const now = new Date();
        const lastMonth = now.getMonth() - 1;
        const year = now.getFullYear();
        return expenseDate.getMonth() === lastMonth && 
               expenseDate.getFullYear() === year;
      }).reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;

      const monthlyChange = lastMonth ? ((thisMonth - lastMonth) / lastMonth) * 100 : 0;

      return {
        total,
        thisMonth,
        lastMonth,
        monthlyChange
      };
    },
  });

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Expenses"
        value={formatCurrency(stats?.total || 0)}
        icon={DollarSign}
      />
      <StatCard
        title="This Month"
        value={formatCurrency(stats?.thisMonth || 0)}
        icon={CreditCard}
        trend={stats?.monthlyChange ? {
          value: Math.abs(stats.monthlyChange),
          isPositive: stats.monthlyChange < 0
        } : undefined}
      />
      <StatCard
        title="Last Month"
        value={formatCurrency(stats?.lastMonth || 0)}
        icon={Receipt}
      />
      <StatCard
        title="Average per Month"
        value={formatCurrency((stats?.total || 0) / 12)}
        icon={Calendar}
      />
    </div>
  );
};