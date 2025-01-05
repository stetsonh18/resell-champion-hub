import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default Profile;