
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Customer, 
  Product, 
  findCustomer, 
  getRecommendationsForCustomer, 
  mockCustomers 
} from "@/lib/data";
import { Search, QrCode, User2, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import CustomerProfile from "@/components/CustomerProfile";
import ProductCard from "@/components/ProductCard";
import CustomerMatch from "@/components/CustomerMatch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SalesAssistant = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [activeCustomerDialog, setActiveCustomerDialog] = useState<Customer | null>(null);
  const [activeCustomerRecommendations, setActiveCustomerRecommendations] = useState<Product[]>([]);
  
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
  
  const openCustomerProfile = (customer: Customer) => {
    setActiveCustomerDialog(customer);
    setActiveCustomerRecommendations(getRecommendationsForCustomer(customer.id));
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
                  <div className="space-y-4">
                    {activeCustomers.map((customer) => (
                      <Card key={customer.id} className="overflow-hidden">
                        <div className="flex items-start sm:items-center gap-4 p-4">
                          <Avatar className="h-12 w-12 flex-shrink-0">
                            <AvatarImage src={customer.imageUrl} alt={customer.name} />
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-medium truncate">{customer.name}</h3>
                            <p className="text-sm text-muted-foreground truncate">
                              {customer.email}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {customer.loyaltyPoints} Points
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Active Now
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => openCustomerProfile(customer)}
                            >
                              View Profile
                              <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                            
                            <Button 
                              size="sm"
                              onClick={() => handleSendRecommendation(customer)}
                            >
                              Send Recommendation
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Customer Profile Dialog */}
        <Dialog 
          open={activeCustomerDialog !== null} 
          onOpenChange={(open) => !open && setActiveCustomerDialog(null)}
        >
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Customer Profile</DialogTitle>
              <DialogDescription>
                Detailed profile information and recommendations
              </DialogDescription>
            </DialogHeader>
            
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {activeCustomerDialog && (
                <>
                  <CustomerProfile customer={activeCustomerDialog} showDetailed={true} />
                  
                  <h3 className="text-lg font-medium mt-6">Recommended Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {activeCustomerRecommendations.map(product => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onLike={() => {
                          toast({
                            title: "Product saved",
                            description: `${product.name} has been saved`,
                          });
                        }}
                        onAddToCart={() => {
                          toast({
                            title: "Added to recommendations",
                            description: `${product.name} has been added to recommendations`,
                          });
                        }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default SalesAssistant;
