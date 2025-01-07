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
import { PlatformForm } from "../form/PlatformForm";
import { PlatformFormValues } from "../schema";

export function AddPlatformDialog() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: createPlatform, isPending } = useMutation({
    mutationFn: async (values: PlatformFormValues) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Authentication required");
      }

      const { error } = await supabase.from("platforms").insert({
        name: values.name,
        url: values.url,
        base_fee: values.base_fee,
        percentage_fee: values.percentage_fee,
        notes: values.notes,
        user_id: user.id,
        status: 'active',
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      toast.success("Platform added successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to add platform");
      console.error("Error adding platform:", error);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-secondary hover:bg-secondary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Platform
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Platform</DialogTitle>
        </DialogHeader>
        <PlatformForm onSubmit={createPlatform} isSubmitting={isPending} />
      </DialogContent>
    </Dialog>
  );
}