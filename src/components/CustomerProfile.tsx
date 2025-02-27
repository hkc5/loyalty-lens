
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Customer, calculateTotalSpend } from "@/lib/data";
import { Badge } from "@/components/ui/badge";

interface CustomerProfileProps {
  customer: Customer;
  showDetailed?: boolean;
}

const CustomerProfile = ({ customer, showDetailed = false }: CustomerProfileProps) => {
  const totalSpend = calculateTotalSpend(customer.id);
  const initials = customer.name.split(' ').map(name => name[0]).join('');

  return (
    <Card className="overflow-hidden animate-scale-in">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={customer.imageUrl} alt={customer.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{customer.name}</CardTitle>
            <CardDescription className="flex gap-2 mt-1 flex-wrap">
              <Badge variant="outline" className="bg-primary/5">
                {customer.loyaltyPoints} Points
              </Badge>
              <Badge variant="outline" className="bg-primary/5">
                Lifetime: ${totalSpend.toFixed(2)}
              </Badge>
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="text-sm">
            <span className="text-muted-foreground">Email: </span>
            <span>{customer.email}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">Phone: </span>
            <span>{customer.phone}</span>
          </div>
          
          {showDetailed && (
            <>
              <div className="text-sm mt-2">
                <span className="text-muted-foreground">Preferred Sizes: </span>
                <span>{customer.preferredSizes.join(", ")}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Last Purchase: </span>
                <span>{new Date(customer.lastPurchase).toLocaleDateString()}</span>
              </div>
            </>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {customer.favoriteStyles.map((style, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {style}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      {showDetailed && (
        <CardFooter className="flex flex-col items-start pt-2">
          <h4 className="text-sm font-medium mb-2">Preferred Categories</h4>
          <div className="flex flex-wrap gap-1">
            {customer.preferredCategories.map((category, index) => (
              <Badge key={index} variant="outline">
                {category}
              </Badge>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default CustomerProfile;
