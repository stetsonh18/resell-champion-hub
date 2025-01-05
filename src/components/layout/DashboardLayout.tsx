import React from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <div className="flex w-full">
        <Sidebar />
        <main className="flex-1 p-8 animate-fade-in">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <SidebarTrigger />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};