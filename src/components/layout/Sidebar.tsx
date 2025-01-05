import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = () => {
  return (
    <ShadcnSidebar className="border-r border-border/40">
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </ShadcnSidebar>
  );
};