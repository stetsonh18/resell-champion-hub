import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { BusinessInfoForm } from "./forms/BusinessInfoForm";
import { AddressForm } from "./forms/AddressForm";
import { profileFormSchema, type ProfileFormValues } from "./types/profile";

export const ProfileForm = () => {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      display_name: "",
      full_name: "",
      business_name: "",
      tax_id: "",
      shipping_address: "",
      preferred_currency: "USD",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: data.display_name,
          full_name: data.full_name,
          business_name: data.business_name,
          tax_id: data.tax_id,
          shipping_address: data.shipping_address,
          preferred_currency: data.preferred_currency,
        })
        .eq("id", session.user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <PersonalInfoForm form={form} />
        <BusinessInfoForm form={form} />
        <AddressForm form={form} />
        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};