import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";

const Profile = () => {
  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <ProfileHeader />
        <ProfileForm />
      </div>
    </DashboardLayout>
  );
};

export default Profile;