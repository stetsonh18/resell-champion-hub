import { AppProviders } from "@/components/providers/AppProviders";
import { AppRouter } from "@/components/router/AppRouter";
import { SidebarProvider } from "@/components/ui/sidebar";

const App = () => {
  return (
    <AppProviders>
      <SidebarProvider defaultOpen={true}>
        <div className="min-h-screen w-full">
          <AppRouter />
        </div>
      </SidebarProvider>
    </AppProviders>
  );
};

export default App;