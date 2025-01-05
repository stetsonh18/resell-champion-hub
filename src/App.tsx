import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import { useToast } from "./hooks/use-toast";

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);

        if (session) {
          // Check subscription status
          const { data: profiles, error } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', session.user.id)
            .single();

          if (error) throw error;

          const isSubscribed = profiles?.subscription_status === 'active';
          setHasSubscription(isSubscribed);

          if (!isSubscribed) {
            toast({
              title: "Subscription Required",
              description: "Please subscribe to access the dashboard.",
              variant: "destructive",
            });
          }
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        toast({
          title: "Error",
          description: "Failed to verify subscription status.",
          variant: "destructive",
        });
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', session.user.id)
          .single();

        if (!error) {
          setHasSubscription(profiles?.subscription_status === 'active');
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  if (isAuthenticated === null || (isAuthenticated && hasSubscription === null)) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && hasSubscription === false) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/inventory"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sales"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/shipments"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/returns"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/expenses"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;