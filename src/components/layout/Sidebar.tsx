import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { ChevronLeft } from "lucide-react";

export const Sidebar = () => {
  return (
    <ShadcnSidebar className="fixed left-0 top-16 border-r border-border/40 bg-[#0F1729] w-[280px] h-[calc(100vh-4rem)]">
      <div className="flex justify-end p-2">
        <SidebarTrigger className="text-gray-400 hover:text-white">
          <ChevronLeft className="h-5 w-5" />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </ShadcnSidebar>
  );
};