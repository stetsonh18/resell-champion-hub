import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CurrencySelect } from "@/components/profile/CurrencySelect";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const profileFormSchema = z.object({
  display_name: z.string().min(2, "Display name must be at least 2 characters"),
  full_name: z.string().min(2, "Full name must be at least 2 characters"),
  business_name: z.string().optional(),
  tax_id: z.string().optional(),
  shipping_address: z.string(),
  preferred_currency: z.string(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

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
          shipping_address: data.shipping_address
            ? JSON.parse(data.shipping_address)
            : null,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Display name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="business_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Business name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tax_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax ID (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Tax ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shipping_address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shipping Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your shipping address"
                  className="font-mono"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="preferred_currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Currency</FormLabel>
              <FormControl>
                <CurrencySelect
                  value={field.value}
                  onValueChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Changes</Button>
      </form>
    </Form>
  );
};