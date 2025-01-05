import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export function AddProductDialog() {
  return (
    <Button onClick={() => toast.info("Add product functionality coming soon")}>
      <Plus className="mr-2 h-4 w-4" />
      Add Product
    </Button>
  );
}