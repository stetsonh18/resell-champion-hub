import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { InventoryTable } from "@/components/inventory/table/InventoryTable";
import { InventoryStats } from "@/components/inventory/stats/InventoryStats";
import { InventoryFilters } from "@/components/inventory/filters/InventoryFilters";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hideShipped, setHideShipped] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("name")
        .order("name");

      if (error) throw error;
      return data.map(category => category.name);
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">Manage your product inventory</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>

        <InventoryStats />
        
        <InventoryFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideShipped={hideShipped}
          setHideShipped={setHideShipped}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <InventoryTable
          filters={{
            searchQuery,
            hideShipped,
            selectedStatus,
            selectedCategory,
          }}
        />
      </div>
    </DashboardLayout>
  );
}