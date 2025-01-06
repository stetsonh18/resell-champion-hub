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
  const [hideOutOfStock, setHideOutOfStock] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
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
    const matchesStock = hideOutOfStock ? product.quantity > 0 : true;
    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;
    return matchesSearch && matchesStock && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2" />
            Add Product
          </Button>
        </div>

        <ProductStats products={products} />

        <ProductFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          hideOutOfStock={hideOutOfStock}
          setHideOutOfStock={setHideOutOfStock}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <ProductsTable products={filteredProducts} isLoading={isLoading} />

        <AddProductDialog 
          isOpen={isAddDialogOpen} 
          onClose={() => setIsAddDialogOpen(false)} 
        />
      </div>
    </DashboardLayout>
  );
};

export default Inventory;