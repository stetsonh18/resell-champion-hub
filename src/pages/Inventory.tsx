import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProductsTable } from "@/components/inventory/ProductsTable";
import { ProductStats } from "@/components/inventory/ProductStats";
import { ProductFilters } from "@/components/inventory/ProductFilters";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddProductDialog } from "@/components/inventory/dialogs/AddProductDialog";

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hideShipped, setHideShipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStore, setSelectedStore] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          categories (
            name,
            code
          ),
          stores (
            name,
            location
          )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesShipped = hideShipped ? product.status !== "shipped" : true;
    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesStore =
      selectedStore === "all" || product.store_id === selectedStore;
    const matchesStatus =
      selectedStatus === "all" || product.status === selectedStatus;
    return matchesSearch && matchesShipped && matchesCategory && matchesStore && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your product inventory
            </p>
          </div>
          <Button className="bg-secondary hover:bg-secondary/90" onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>

        <ProductStats products={products} />

        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideShipped={hideShipped}
          setHideShipped={setHideShipped}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStore={selectedStore}
          setSelectedStore={setSelectedStore}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />

        <ProductsTable products={filteredProducts} isLoading={isLoading} />

        <AddProductDialog 
          open={isAddDialogOpen} 
          onOpenChange={setIsAddDialogOpen} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Inventory;