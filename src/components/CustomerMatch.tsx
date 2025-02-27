
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Customer, Product } from "@/lib/data";
import { MessageSquare, Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";

interface CustomerMatchProps {
  customer: Customer;
  recommendations: Product[];
  onSendMessage?: (customer: Customer) => void;
}

const CustomerMatch = ({ 
  customer, 
  recommendations, 
  onSendMessage 
}: CustomerMatchProps) => {
  const [sending, setSending] = useState(false);
  const initials = customer.name.split(' ').map(name => name[0]).join('');
  
  const handleSendMessage = () => {
    setSending(true);
    // Simulate sending message
    setTimeout(() => {
      setSending(false);
      onSendMessage && onSendMessage(customer);
    }, 1000);
  };
  
  return (
    <Card className="animate-scale-in">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border border-border">
            <AvatarImage src={customer.imageUrl} alt={customer.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{customer.name}</CardTitle>
            <CardDescription>Currently in Store</CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {customer.favoriteStyles.map((style, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {style}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-3" />
        
        <h4 className="text-sm font-medium mb-2">Recommended Products</h4>
        <div className="grid grid-cols-2 gap-2">
          {recommendations.slice(0, 4).map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              compact={true}
            />
          ))}
        </div>
        
        <div className="mt-4">
          <Button 
            className="w-full"
            onClick={handleSendMessage}
            disabled={sending}
          >
            {sending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Recommendation
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerMatch;
