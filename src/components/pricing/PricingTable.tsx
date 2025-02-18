import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PricingTable = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const features = [
    "Unlimited product listings",
    "Sales tracking & analytics",
    "Profit calculations",
    "Inventory management",
    "Shipping label integration",
  ];

  const handleGetStarted = async (plan: 'monthly' | 'annual') => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        localStorage.setItem('selectedPlan', plan);
        navigate("/login?screen=sign-up");
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { plan }
      });

      if (error) {
        console.error('Function error:', error);
        throw error;
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to start subscription process. Please try again.",
      });
    }
  };

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">Choose the plan that's right for your business</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
        <Card className="relative">
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
            <div className="text-3xl font-bold">$9.99<span className="text-lg font-normal text-muted-foreground">/month</span></div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-secondary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleGetStarted('monthly')} className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        <Card className="relative">
          <div className="absolute -top-4 right-4 bg-secondary text-white px-3 py-1 rounded-full text-sm">
            Best value
          </div>
          <CardHeader>
            <CardTitle>Annual</CardTitle>
            <div className="text-3xl font-bold">$99.99<span className="text-lg font-normal text-muted-foreground">/year</span></div>
            <p className="text-sm text-muted-foreground">Save over 16%</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <Check className="h-4 w-4 text-secondary mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button onClick={() => handleGetStarted('annual')} variant="secondary" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PricingTable;