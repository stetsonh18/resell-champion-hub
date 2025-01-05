import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";

export const Sidebar = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <ShadcnSidebar className="border-r border-border/40">
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
      </ShadcnSidebar>
    </SidebarProvider>
  );
};