
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Customer, calculateTotalSpend } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Star, Calendar, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

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
                <Star className="mr-1 h-3 w-3" /> {customer.loyaltyPoints} Points
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
          <div className="text-sm flex items-center">
            <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
          <div className="text-sm flex items-center">
            <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          
          {showDetailed && (
            <>
              <div className="text-sm mt-2">
                <span className="text-muted-foreground">Preferred Sizes: </span>
                <span>{customer.preferredSizes.join(", ")}</span>
              </div>
              <div className="text-sm flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Last Purchase: {new Date(customer.lastPurchase).toLocaleDateString()}</span>
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
        <>
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
          
          <Separator className="my-2" />
          
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="purchase-history">
                <AccordionTrigger className="text-sm">
                  <div className="flex items-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Purchase History
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {customer.purchaseHistory.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No purchase history available</p>
                  ) : (
                    <div className="space-y-4">
                      {customer.purchaseHistory.map((purchase) => (
                        <div key={purchase.id} className="border rounded-md p-3">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="text-sm font-medium">
                                {format(new Date(purchase.date), "MMM d, yyyy")}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {purchase.storeLocation}
                              </p>
                            </div>
                            <p className="text-sm font-semibold">
                              ${purchase.total.toFixed(2)}
                            </p>
                          </div>
                          
                          <Separator className="my-2" />
                          
                          <div className="space-y-2">
                            {purchase.items.map((item) => (
                              <div 
                                key={item.id} 
                                className="flex justify-between items-center"
                              >
                                <div className="flex items-center gap-2">
                                  <div 
                                    className="h-8 w-8 rounded overflow-hidden bg-muted"
                                    style={{
                                      backgroundImage: `url(${item.imageUrl})`,
                                      backgroundSize: 'cover',
                                      backgroundPosition: 'center'
                                    }}
                                  />
                                  <div>
                                    <p className="text-xs font-medium">{item.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {item.size} · {item.color}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs">
                                    ${item.price.toFixed(2)} × {item.quantity}
                                  </p>
                                  <p className="text-xs font-medium">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default CustomerProfile;
