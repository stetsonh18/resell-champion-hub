import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [hasValidSubscription, setHasValidSubscription] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        setIsAuthenticated(!!session);

        if (session) {
          // Check subscription status
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('subscription_status')
            .eq('id', session.user.id)
            .maybeSingle();

          if (profileError) {
            throw profileError;
          }

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
        toast({
          title: "Authentication Error",
          description: "Please try signing in again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    // Check initial auth state
    checkAuth();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setIsAuthenticated(!!session);
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', session.user.id)
          .maybeSingle();

        setHasValidSubscription(
          profile?.subscription_status === 'active' || 
          profile?.subscription_status === 'trialing'
        );
      } else {
        setHasValidSubscription(false);
      }
      setIsLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
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