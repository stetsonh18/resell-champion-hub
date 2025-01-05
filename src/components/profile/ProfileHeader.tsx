import { AvatarUpload } from "./AvatarUpload";

export const ProfileHeader = () => {
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
    <div>
      <h1 className="text-3xl font-bold">Profile Settings</h1>
      <p className="text-muted-foreground">
        Manage your account settings and preferences.
      </p>
      <div className="flex justify-center mt-8">
        <AvatarUpload size={96} onUpload={handleAvatarUpload} />
      </div>
    </div>
  );
};