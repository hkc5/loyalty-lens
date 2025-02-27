
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/data";
import { Heart, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onLike?: () => void;
  onAddToCart?: () => void;
  onProductSelect?: (product: Product) => void;
  compact?: boolean;
}

const ProductCard = ({ 
  product, 
  onLike, 
  onAddToCart, 
  onProductSelect,
  compact = false 
}: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Card 
      className={`overflow-hidden smooth-shadow ${compact ? 'h-full' : ''}`}
      onClick={() => onProductSelect && onProductSelect(product)}
    >
      <div className="relative overflow-hidden">
        <div 
          className={`aspect-[3/4] bg-secondary/30 ${!imageLoaded ? 'animate-pulse' : ''}`}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className={`object-cover w-full h-full transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={handleImageLoad}
          />
        </div>
        
        {product.salePrice && (
          <Badge 
            className="absolute top-2 right-2 bg-destructive text-destructive-foreground"
          >
            Sale
          </Badge>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm flex items-center justify-center">
            <Badge variant="outline" className="text-lg font-medium border-2">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className={`${compact ? 'p-3' : 'p-4'}`}>
        <h3 className={`font-medium ${compact ? 'text-sm' : 'text-base'} line-clamp-1`}>
          {product.name}
        </h3>
        
        {!compact && (
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
            {product.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1">
            {product.salePrice ? (
              <>
                <span className="text-destructive font-medium">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          {!compact && (
            <Badge variant="secondary" className="text-xs">
              {product.category}
            </Badge>
          )}
        </div>
      </CardContent>
      
      {!compact && (
        <CardFooter className="flex justify-between p-4 pt-0">
          <Button 
            variant="outline" 
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onLike && onLike();
            }}
          >
            <Heart className="h-4 w-4 mr-1" />
            Save
          </Button>
          
          <Button 
            variant="default" 
            size="sm"
            disabled={!product.inStock}
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart && onAddToCart();
            }}
          >
            <ShoppingBag className="h-4 w-4 mr-1" />
            Add
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
