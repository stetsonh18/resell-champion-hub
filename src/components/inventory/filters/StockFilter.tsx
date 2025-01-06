import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface StockFilterProps {
  hideShipped: boolean;
  setHideShipped: (value: boolean) => void;
}

export const StockFilter = ({ hideShipped, setHideShipped }: StockFilterProps) => {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="hide-shipped"
        checked={hideShipped}
        onCheckedChange={setHideShipped}
      />
      <Label htmlFor="hide-shipped">Hide Shipped</Label>
    </div>
  );
};