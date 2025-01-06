import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { SaleForm } from "../SaleForm";
import { useState } from "react";

interface EditSaleDialogProps {
  sale: {
    id: string;
    sale_date: string;
    product_id: string;
    platform_id: string;
    sale_price: number;
    quantity: number;
    shipping_amount_collected?: number;
    shipping_cost?: number;
    platform_fees?: number;
  };
}

export const EditSaleDialog = ({ sale }: EditSaleDialogProps) => {
  const [open, setOpen] = useState(false);

  console.log('Sale date from database:', sale.sale_date); // Debug log

  const defaultValues = {
    sale_date: sale.sale_date,
    product_id: sale.product_id,
    platform_id: sale.platform_id,
    sale_price: sale.sale_price,
    quantity: sale.quantity,
    shipping_amount_collected: sale.shipping_amount_collected || 0,
    shipping_cost: sale.shipping_cost || 0,
    platform_fees: sale.platform_fees || 0,
    estimated_profit: 0, // This will be calculated in the form
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Sale</DialogTitle>
          <DialogDescription>
            Make changes to your sale record here. Click update when you're done.
          </DialogDescription>
        </DialogHeader>
        <SaleForm 
          defaultValues={defaultValues}
          saleId={sale.id}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};