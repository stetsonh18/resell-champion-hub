import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { StoreForm } from "./StoreForm";
import { StoreFormValues } from "./schema";

export function AddStoreDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createStore, isPending } = useMutation({
    mutationFn: async (values: StoreFormValues) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Authentication required");
      }

      const { error } = await supabase.from("stores").insert({
        name: values.name,
        location: values.location,
        notes: values.notes,
        user_id: user.id,
        status: 'active',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
      toast.success("Store added successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to add store");
      console.error("Error adding store:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Store
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Store</DialogTitle>
        </DialogHeader>
        <StoreForm onSubmit={createStore} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}