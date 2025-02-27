
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";

const Auth = () => {
  const [activeTab, setActiveTab] = useState<string>("sales");
  const [identifier, setIdentifier] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  
  const { loginAsCustomer, loginAsSalesAssociate } = useAuth();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    if (!identifier) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      let success = false;
      
      if (activeTab === "sales") {
        success = loginAsSalesAssociate(identifier);
        if (success) {
          navigate("/sales");
        }
      } else {
        success = loginAsCustomer(identifier);
        if (success) {
          navigate("/customer");
        }
      }
      
      if (!success) {
        toast({
          title: "Authentication failed",
          description: "Please check your credentials and try again",
          variant: "destructive",
        });
      }
      
      setLoading(false);
    }, 800);
  };

  // Sample login credentials for easy testing
  const sampleCredentials = {
    sales: "sophia.lee@retailco.com",
    customer: "emma.wilson@example.com"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-screen-sm flex items-center justify-center p-4 pt-16">
        <Card className="w-full animate-fade-in">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Style Mingle</CardTitle>
            <CardDescription>Sign in to continue</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs defaultValue="sales" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="sales">Sales Assistant</TabsTrigger>
                <TabsTrigger value="customer">Customer</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-1">Sample login (for testing):</p>
                    <RadioGroup 
                      defaultValue={sampleCredentials.sales}
                      onValueChange={setIdentifier}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={sampleCredentials.sales} id="r1" />
                        <Label htmlFor="r1">{sampleCredentials.sales}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="customer">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="identifier">Email or Phone</Label>
                    <Input
                      id="identifier"
                      placeholder="Enter your email or phone"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p className="mb-1">Sample login (for testing):</p>
                    <RadioGroup 
                      defaultValue={sampleCredentials.customer}
                      onValueChange={setIdentifier}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={sampleCredentials.customer} id="r2" />
                        <Label htmlFor="r2">{sampleCredentials.customer}</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Auth;
