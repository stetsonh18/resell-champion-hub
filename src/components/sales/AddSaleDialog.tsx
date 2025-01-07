import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { SaleForm } from "./SaleForm";

export function AddSaleDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2" />
          Add Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Sale</DialogTitle>
        </DialogHeader>
        <SaleForm />
      </DialogContent>
    </Dialog>
  );
}