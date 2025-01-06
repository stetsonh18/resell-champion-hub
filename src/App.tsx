import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/components/router/AppRouter";
import { AuthStateProvider } from "@/components/auth/AuthStateProvider";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthStateProvider>
          <AppRouter />
          <Toaster />
        </AuthStateProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;