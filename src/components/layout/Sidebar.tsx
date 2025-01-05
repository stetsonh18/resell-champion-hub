import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = () => {
  return (
    <ShadcnSidebar className="border-r border-border/40 bg-[#0F1729] w-[280px] min-h-[calc(100vh-4rem)]">
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </ShadcnSidebar>
  );
};