import { 
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { SidebarNav } from "./SidebarNav";
import { ChevronLeft } from "lucide-react";

export const Sidebar = () => {
  const { state } = useSidebar();
  
  return (
    <ShadcnSidebar 
      className={`fixed left-0 top-16 border-r border-border/40 bg-[#0B1120] h-[calc(100vh-4rem)] transition-all duration-300 ${
        state === "collapsed" ? "w-[60px]" : "w-[280px]"
      }`}
    >
      <div className="flex justify-end p-2">
        <SidebarTrigger className="text-gray-400 hover:text-white">
          <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${
            state === "collapsed" ? "rotate-180" : ""
          }`} />
        </SidebarTrigger>
      </div>
      <SidebarContent>
        <SidebarNav />
      </SidebarContent>
    </ShadcnSidebar>
  );
};