import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
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