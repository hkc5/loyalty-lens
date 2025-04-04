
import { useState, useRef } from "react";
import { Product } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Heart, X, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import ProductCard from "./ProductCard";

interface ProductSwiperProps {
  products: Product[];
  onLike: (product: Product) => void;
  onDislike: (product: Product) => void;
}

const ProductSwiper = ({ products, onLike, onDislike }: ProductSwiperProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipingDirection, setSwipingDirection] = useState<null | 'left' | 'right'>(null);
  const startXRef = useRef<number | null>(null);
  
  const currentProduct = products[currentIndex];
  
  const handleLike = () => {
    if (currentIndex >= products.length) return;
    
    setSwipingDirection('right');
    onLike(currentProduct);
    
    toast({
      title: "Added to favorites",
      description: `${currentProduct.name} has been added to your favorites`,
    });
    
    // Wait for animation to complete
    setTimeout(() => {
      setSwipingDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 500);
  };
  
  const handleDislike = () => {
    if (currentIndex >= products.length) return;
    
    setSwipingDirection('left');
    onDislike(currentProduct);
    
    // Wait for animation to complete
    setTimeout(() => {
      setSwipingDirection(null);
      setCurrentIndex(prev => prev + 1);
    }, 500);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (startXRef.current === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = currentX - startXRef.current;
    
    // Determine swipe direction based on movement
    if (diff > 50) {
      setSwipingDirection('right');
    } else if (diff < -50) {
      setSwipingDirection('left');
    } else {
      setSwipingDirection(null);
    }
  };
  
  const handleTouchEnd = () => {
    if (swipingDirection === 'right') {
      handleLike();
    } else if (swipingDirection === 'left') {
      handleDislike();
    }
    
    startXRef.current = null;
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handleDislike();
    } else if (e.key === 'ArrowRight') {
      handleLike();
    }
  };
  
  if (currentIndex >= products.length) {
    return (
      <div className="card-swiper flex flex-col items-center justify-center p-8 text-center">
        <h3 className="text-xl font-medium">You've seen all products</h3>
        <p className="text-muted-foreground mt-2">Check back later for more recommendations</p>
        <Button 
          className="mt-4"
          onClick={() => setCurrentIndex(0)}
        >
          Start Over
        </Button>
      </div>
    );
  }
  
  return (
    <div 
      className="card-swiper"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Action Buttons with Arrow Icons - True Tinder-style */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-destructive/10 hover:bg-destructive/20 border-destructive/50"
          onClick={handleDislike}
        >
          <ArrowLeft className="h-5 w-5 text-destructive" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 -translate-y-1/2 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-primary/10 hover:bg-primary/20 border-primary/50"
          onClick={handleLike}
        >
          <ArrowRight className="h-5 w-5 text-primary" />
        </Button>
      </div>
      
      <div 
        className={`swipe-card ${swipingDirection ? `swiped-${swipingDirection}` : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ProductCard product={currentProduct} />
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <Button
          variant="outline"
          size="icon"
          className="h-14 w-14 rounded-full bg-background"
          onClick={handleDislike}
        >
          <X className="h-6 w-6 text-destructive" />
        </Button>
        
        <Button
          variant="outline" 
          size="icon"
          className="h-14 w-14 rounded-full bg-background"
          onClick={handleLike}
        >
          <Heart className="h-6 w-6 text-primary" />
        </Button>
      </div>
      
      {/* Product counter indicator */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <div className="text-sm font-medium bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {currentIndex + 1} of {products.length}
        </div>
      </div>
    </div>
  );
};

export default ProductSwiper;
