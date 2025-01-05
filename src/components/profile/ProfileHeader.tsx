import { AvatarUpload } from "./AvatarUpload";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const ProfileHeader = () => {
  const { toast } = useToast();

  const handleAvatarUpload = async (url: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ avatar_url: url })
      .eq("id", session.user.id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update avatar",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="flex justify-center">
        <AvatarUpload size={52} onUpload={handleAvatarUpload} />
      </div>
    </div>
  );
};