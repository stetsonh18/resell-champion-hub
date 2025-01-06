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
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (!session) {
          if (mounted) {
            setIsAuthenticated(false);
            setIsLoading(false);
          }
          return;
        }

        if (mounted) {
          setIsAuthenticated(true);
        }

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_status')
          .eq('id', session.user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        const isSubscribed = profile?.subscription_status === 'active' || 
                           profile?.subscription_status === 'trialing';

        if (mounted) {
          setHasValidSubscription(isSubscribed);
        }

        if (!isSubscribed) {
          toast({
            title: "Subscription Required",
            description: "Please subscribe to access the dashboard.",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        if (mounted) {
          setIsAuthenticated(false);
          setHasValidSubscription(false);
        }
        toast({
          title: "Authentication Error",
          description: "Please try signing in again.",
          variant: "destructive",
        });
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log('Auth state changed:', event, session);
      
      if (!session) {
        setIsAuthenticated(false);
        setHasValidSubscription(false);
        setIsLoading(false);
        return;
      }

      setIsAuthenticated(true);
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('subscription_status')
        .eq('id', session.user.id)
        .maybeSingle();

      if (mounted) {
        setHasValidSubscription(
          profile?.subscription_status === 'active' || 
          profile?.subscription_status === 'trialing'
        );
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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

  if (isAuthenticated && hasValidSubscription === false) {
    return <Navigate to="/#pricing" />;
  }

  return <>{children}</>;
};