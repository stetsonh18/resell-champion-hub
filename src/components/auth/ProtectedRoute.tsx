import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasValidSubscription, setHasValidSubscription] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsAuthenticated(!!session);

        if (session) {
          // Check subscription status
          const { data: profile } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', session.user.id)
            .maybeSingle();

          // Consider 'active' and 'trialing' as valid subscription states
          const isSubscribed = profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing';
          setHasValidSubscription(isSubscribed);

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
        setIsAuthenticated(false);
        setHasValidSubscription(false);
      }
    };

    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', session.user.id)
          .maybeSingle();

        // Consider 'active' and 'trialing' as valid subscription states
        setHasValidSubscription(profile?.subscription_status === 'active' || profile?.subscription_status === 'trialing');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  if (isAuthenticated === null || (isAuthenticated && hasValidSubscription === null)) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Redirect to pricing page if subscription is not valid
  if (isAuthenticated && hasValidSubscription === false) {
    return <Navigate to="/#pricing" />;
  }

  return <>{children}</>;
};