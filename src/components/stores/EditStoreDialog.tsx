import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { toast } from "sonner";
import { StoreForm } from "./StoreForm";
import { StoreFormValues } from "./schema";

interface EditStoreDialogProps {
  store: {
    id: string;
    name: string;
    location: string;
    notes?: string;
  };
}

export function EditStoreDialog({ store }: EditStoreDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updateStore, isPending } = useMutation({
    mutationFn: async (values: StoreFormValues) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Authentication required");
      }

      const { error } = await supabase
        .from("stores")
        .update({
          name: values.name,
          location: values.location,
          notes: values.notes,
        })
        .eq("id", store.id)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success("Store updated successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update store");
      console.error("Error updating store:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Store</DialogTitle>
        </DialogHeader>
        <StoreForm
          onSubmit={updateStore}
          isSubmitting={isPending}
          defaultValues={store}
        />
      </DialogContent>
    </Dialog>
  );
}