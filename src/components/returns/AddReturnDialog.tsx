import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReturnForm } from "./ReturnForm";
import { Plus } from "lucide-react";

export const AddReturnDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Return
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Return</DialogTitle>
          <DialogDescription>
            Fill in the details to process a product return.
          </DialogDescription>
        </DialogHeader>
        <ReturnForm />
      </DialogContent>
    </Dialog>
  );
};