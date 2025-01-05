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
import { PlatformForm } from "../form/PlatformForm";
import { PlatformFormValues } from "../schema";

interface EditPlatformDialogProps {
  platform: {
    id: string;
    name: string;
    url: string;
    base_fee: number;
    percentage_fee: number;
    notes?: string;
  };
}

export function EditPlatformDialog({ platform }: EditPlatformDialogProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { mutate: updatePlatform, isPending } = useMutation({
    mutationFn: async (values: PlatformFormValues) => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error("Authentication required");
      }

      const { error } = await supabase
        .from("platforms")
        .update({
          name: values.name,
          url: values.url,
          base_fee: values.base_fee,
          percentage_fee: values.percentage_fee,
          notes: values.notes,
        })
        .eq("id", platform.id)
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      toast.success("Platform updated successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error("Failed to update platform");
      console.error("Error updating platform:", error);
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
          <DialogTitle>Edit Platform</DialogTitle>
        </DialogHeader>
        <PlatformForm
          onSubmit={updatePlatform}
          isSubmitting={isPending}
          defaultValues={platform}
        />
      </DialogContent>
    </Dialog>
  );
}