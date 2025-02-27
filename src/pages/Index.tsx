
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import Header from "@/components/Header";
import { ArrowRight, Store, User, Sparkles } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container max-w-5xl py-16">
        <div className="text-center mt-10 mb-16 animate-fade-in">
          <h1 className="text-4xl font-medium tracking-tight sm:text-5xl mb-4">
            Style Mingle Assistant
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground text-xl">
            Connecting sales associates with customers for a personalized shopping experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-16 px-4">
          <Card className="animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Sales Assistant
              </CardTitle>
              <CardDescription>
                For in-store sales associates
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Instant Customer Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  Identify loyalty members via phone, email, or QR code
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">AI-Powered Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Suggest items based on purchase history and preferences
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Live Customer Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with nearby customers using the app
                </p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => navigate("/auth?role=sales")}
              >
                Sign in as Sales Associate
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer App
              </CardTitle>
              <CardDescription>
                For loyalty program members
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Match With Associates</h3>
                <p className="text-sm text-muted-foreground">
                  Get connected with in-store associates for personalized help
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Product Discovery</h3>
                <p className="text-sm text-muted-foreground">
                  Swipe right or left on clothing items to refine your style
                </p>
              </div>
              
              <div className="space-y-1">
                <h3 className="text-sm font-medium">Personalized Suggestions</h3>
                <p className="text-sm text-muted-foreground">
                  Receive curated product recommendations from sales associates
                </p>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                className="w-full"
                onClick={() => navigate("/auth?role=customer")}
              >
                Sign in as Customer
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="px-4 mb-16">
          <Card className="bg-primary/5 animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                About Style Mingle
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <p className="text-muted-foreground">
                Style Mingle enhances in-store personalization by connecting sales associates with loyalty program 
                customers in real-time. The system provides instant customer recognition, AI-driven recommendations, 
                and an interactive experience for customers to refine their style preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
