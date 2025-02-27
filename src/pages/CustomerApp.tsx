
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { mockProducts } from "@/lib/data";
import { ShoppingBag, Heart, Smartphone } from "lucide-react";
import Header from "@/components/Header";
import ProductSwiper from "@/components/ProductSwiper";
import ProductCard from "@/components/ProductCard";

const CustomerApp = () => {
  const [likedProducts, setLikedProducts] = useState<string[]>([]);
  const [dislikedProducts, setDislikedProducts] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<string>("discover");
  const [salesAssistantMessage, setSalesAssistantMessage] = useState<boolean>(false);
  
  const { isAuthenticated, userType, currentUser } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Redirect if not authenticated as customer
  useEffect(() => {
    if (!isAuthenticated || userType !== 'customer') {
      navigate("/auth");
    }
  }, [isAuthenticated, userType, navigate]);
  
  // Simulate receiving a recommendation from a sales associate
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated && userType === 'customer') {
        setSalesAssistantMessage(true);
      }
    }, 15000); // Show after 15 seconds
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, userType]);
  
  // Filter out products that have already been swiped
  const availableProducts = mockProducts.filter(
    product => !likedProducts.includes(product.id) && !dislikedProducts.includes(product.id)
  );
  
  // Get liked products
  const favoriteProducts = mockProducts.filter(
    product => likedProducts.includes(product.id)
  );
  
  const handleLikeProduct = (product: any) => {
    if (!likedProducts.includes(product.id)) {
      setLikedProducts([...likedProducts, product.id]);
    }
  };
  
  const handleDislikeProduct = (product: any) => {
    if (!dislikedProducts.includes(product.id)) {
      setDislikedProducts([...dislikedProducts, product.id]);
    }
  };
  
  const connectWithAssistant = () => {
    setSalesAssistantMessage(false);
    
    toast({
      title: "Connected with Sales Associate",
      description: "Sophia will assist you with your shopping experience",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-md py-16 px-4">
        <div className="flex items-center justify-between mt-4 mb-6">
          <h1 className="text-2xl font-medium tracking-tight">Style Mingle</h1>
          
          <div className="flex items-center gap-1">
            <Badge variant="outline" className="bg-primary/5">
              {currentUser && 'loyaltyPoints' in currentUser
                ? `${currentUser.loyaltyPoints} pts`
                : "0 pts"
              }
            </Badge>
          </div>
        </div>
        
        {salesAssistantMessage && (
          <div className="mb-6 animate-slide-in-right">
            <Card className="overflow-hidden border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=776&auto=format&fit=crop" />
                    <AvatarFallback>SL</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">Sophia Lee</CardTitle>
                    <CardDescription>Sales Associate</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <p className="text-sm mb-3">
                  Hello! I noticed you're in our store. Can I help you find items that match your style preferences?
                </p>
                
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={connectWithAssistant}
                >
                  <Smartphone className="mr-2 h-4 w-4" />
                  Connect with Sophia
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
        
        <Tabs defaultValue="discover" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="favorites">
              Favorites
              {likedProducts.length > 0 && (
                <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-full px-1.5 py-0.5">
                  {likedProducts.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="discover" className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium">Swipe to find your style</h2>
              <p className="text-sm text-muted-foreground">
                Swipe right to like, left to pass
              </p>
            </div>
            
            <ProductSwiper
              products={availableProducts}
              onLike={handleLikeProduct}
              onDislike={handleDislikeProduct}
            />
          </TabsContent>
          
          <TabsContent value="favorites" className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-lg font-medium">Your Favorites</h2>
              <p className="text-sm text-muted-foreground">
                Items you've liked while browsing
              </p>
            </div>
            
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No favorites yet</h3>
                <p className="text-muted-foreground mb-4">
                  Swipe right on items you like to see them here
                </p>
                <Button 
                  variant="outline"
                  onClick={() => setActiveTab("discover")}
                >
                  Discover Products
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {favoriteProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => {
                      toast({
                        title: "Added to cart",
                        description: `${product.name} has been added to the cart`,
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CustomerApp;
