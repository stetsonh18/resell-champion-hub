import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface StockFilterProps {
  hideOutOfStock: boolean;
  setHideOutOfStock: (value: boolean) => void;
}

export const StockFilter = ({ hideOutOfStock, setHideOutOfStock }: StockFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="hide-shipped"
        checked={hideOutOfStock}
        onCheckedChange={setHideOutOfStock}
      />
      <Label htmlFor="hide-shipped">Hide Shipped</Label>
    </div>
  );
};