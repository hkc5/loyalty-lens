
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Customer, 
  Product, 
  findCustomer, 
  getRecommendationsForCustomer, 
  mockCustomers 
} from "@/lib/data";
import { Search, QrCode, User2 } from "lucide-react";
import Header from "@/components/Header";
import CustomerProfile from "@/components/CustomerProfile";
import ProductCard from "@/components/ProductCard";
import CustomerMatch from "@/components/CustomerMatch";

const SalesAssistant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  
  const { isAuthenticated, userType } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not authenticated as sales associate
  useEffect(() => {
    if (!isAuthenticated || userType !== 'sales_associate') {
      navigate("/auth");
    }
  }, [isAuthenticated, userType, navigate]);
  
  const handleSearch = () => {
    if (!searchQuery) return;
    
    setSearchLoading(true);
    
    // Simulate search delay
    setTimeout(() => {
      const customer = findCustomer(searchQuery);
      
      if (customer) {
        setSelectedCustomer(customer);
        setRecommendations(getRecommendationsForCustomer(customer.id));
        
        toast({
          title: "Customer found",
          description: `${customer.name} has been loaded successfully`,
        });
      } else {
        toast({
          title: "Customer not found",
          description: "No customer found with the provided information",
          variant: "destructive",
        });
      }
      
      setSearchLoading(false);
    }, 1000);
  };
  
  const handleSendRecommendation = (customer: Customer) => {
    toast({
      title: "Recommendation sent",
      description: `Your product recommendations have been sent to ${customer.name}`,
    });
  };
  
  // Active in-store customers (for demonstration purposes)
  const activeCustomers = mockCustomers.slice(0, 2);
  
  // Get recommendations for each active customer
  const customerRecommendations = new Map<string, Product[]>();
  activeCustomers.forEach(customer => {
    customerRecommendations.set(customer.id, getRecommendationsForCustomer(customer.id));
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Style Mingle Assistant" />
      
      <main className="flex-1 container py-16 mt-4">
        <h1 className="text-3xl font-medium tracking-tight mb-6">Sales Assistant Dashboard</h1>
        
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="search">Customer Search</TabsTrigger>
            <TabsTrigger value="active">Active Customers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Find Customer</CardTitle>
                <CardDescription>
                  Search by phone number, email, or scan loyalty QR code
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Enter phone, email, or customer ID"
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="shrink-0"
                  >
                    <QrCode className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    onClick={handleSearch}
                    disabled={searchLoading || !searchQuery}
                    className="shrink-0"
                  >
                    {searchLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  <p>Sample search: emma.wilson@example.com</p>
                </div>
              </CardContent>
            </Card>
            
            {selectedCustomer && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <CustomerProfile customer={selectedCustomer} showDetailed={true} />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Personalized Recommendations</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {recommendations.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product}
                        onLike={() => {
                          toast({
                            title: "Product saved",
                            description: `${product.name} has been added to your saved items`,
                          });
                        }}
                        onAddToCart={() => {
                          toast({
                            title: "Added to cart",
                            description: `${product.name} has been added to the cart`,
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="active" className="space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>In-Store Customers</CardTitle>
                <CardDescription>
                  Currently active loyalty program members in your store
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {activeCustomers.length === 0 ? (
                  <div className="text-center py-8">
                    <User2 className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
                    <h3 className="text-lg font-medium">No active customers</h3>
                    <p className="text-muted-foreground">
                      There are currently no loyalty members in store
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 gap-6">
                    {activeCustomers.map((customer) => (
                      <CustomerMatch 
                        key={customer.id}
                        customer={customer}
                        recommendations={customerRecommendations.get(customer.id) || []}
                        onSendMessage={handleSendRecommendation}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SalesAssistant;
