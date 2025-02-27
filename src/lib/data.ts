
// Mock data for development purposes

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  preferredSizes: string[];
  preferredCategories: string[];
  lastPurchase: string;
  purchaseHistory: Purchase[];
  favoriteStyles: string[];
  imageUrl?: string;
};

export type Purchase = {
  id: string;
  date: string;
  items: PurchaseItem[];
  total: number;
  storeLocation: string;
};

export type PurchaseItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  color: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  salePrice?: number;
  sizes: string[];
  colors: string[];
  imageUrl: string;
  inStock: boolean;
  stockCount?: number;
  tags: string[];
  rating: number;
};

export type SalesAssociate = {
  id: string;
  name: string;
  email: string;
  storeLocation: string;
  specialties: string[];
  activeStatus: boolean;
  imageUrl?: string;
};

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "555-123-4567",
    loyaltyPoints: 2450,
    preferredSizes: ["S", "M"],
    preferredCategories: ["Dresses", "Tops", "Accessories"],
    lastPurchase: "2023-04-15",
    purchaseHistory: [
      {
        id: "pur-001",
        date: "2023-04-15",
        items: [
          {
            id: "item-001",
            name: "Floral Summer Dress",
            category: "Dresses",
            size: "S",
            color: "Blue",
            price: 89.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1596993099463-f84a8833b8f7?q=80&w=774&auto=format&fit=crop"
          },
          {
            id: "item-002",
            name: "Silver Hoop Earrings",
            category: "Accessories",
            size: "One Size",
            color: "Silver",
            price: 24.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=812&auto=format&fit=crop"
          }
        ],
        total: 114.98,
        storeLocation: "Downtown Mall"
      },
      {
        id: "pur-002",
        date: "2023-03-02",
        items: [
          {
            id: "item-003",
            name: "Cashmere Sweater",
            category: "Tops",
            size: "M",
            color: "Cream",
            price: 129.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=772&auto=format&fit=crop"
          }
        ],
        total: 129.99,
        storeLocation: "Downtown Mall"
      }
    ],
    favoriteStyles: ["Bohemian", "Casual Chic", "Contemporary"],
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=774&auto=format&fit=crop"
  },
  {
    id: "cust-002",
    name: "James Chen",
    email: "james.chen@example.com",
    phone: "555-987-6543",
    loyaltyPoints: 1870,
    preferredSizes: ["L"],
    preferredCategories: ["Outerwear", "Denim", "Footwear"],
    lastPurchase: "2023-05-10",
    purchaseHistory: [
      {
        id: "pur-003",
        date: "2023-05-10",
        items: [
          {
            id: "item-004",
            name: "Leather Jacket",
            category: "Outerwear",
            size: "L",
            color: "Black",
            price: 249.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=735&auto=format&fit=crop"
          }
        ],
        total: 249.99,
        storeLocation: "Westfield Center"
      },
      {
        id: "pur-004",
        date: "2023-02-18",
        items: [
          {
            id: "item-005",
            name: "Slim Fit Jeans",
            category: "Denim",
            size: "32x34",
            color: "Dark Blue",
            price: 79.99,
            quantity: 2,
            imageUrl: "https://images.unsplash.com/photo-1604176424472-3e749cec8fc9?q=80&w=880&auto=format&fit=crop"
          },
          {
            id: "item-006",
            name: "Leather Boots",
            category: "Footwear",
            size: "10",
            color: "Brown",
            price: 159.99,
            quantity: 1,
            imageUrl: "https://images.unsplash.com/photo-1608256246200-72e042a0661d?q=80&w=774&auto=format&fit=crop"
          }
        ],
        total: 319.97,
        storeLocation: "Westfield Center"
      }
    ],
    favoriteStyles: ["Urban", "Streetwear", "Minimalist"],
    imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=774&auto=format&fit=crop"
  }
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Cotton V-Neck Tee",
    category: "Tops",
    description: "A comfortable, breathable cotton tee with a classic V-neck design. Perfect for everyday casual wear.",
    price: 29.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Grey", "Navy"],
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=880&auto=format&fit=crop",
    inStock: true,
    stockCount: 120,
    tags: ["Cotton", "Basic", "Casual", "Summer"],
    rating: 4.5
  },
  {
    id: "prod-002",
    name: "Slim Fit Chinos",
    category: "Pants",
    description: "Modern slim fit chinos made from stretch cotton for comfort and mobility. Versatile enough for work or weekend.",
    price: 59.99,
    sizes: ["28x30", "30x30", "32x30", "34x30", "36x30"],
    colors: ["Khaki", "Navy", "Olive", "Charcoal"],
    imageUrl: "https://images.unsplash.com/photo-1584865288642-42078afe6942?q=80&w=736&auto=format&fit=crop",
    inStock: true,
    stockCount: 85,
    tags: ["Cotton", "Stretch", "Business Casual", "Versatile"],
    rating: 4.3
  },
  {
    id: "prod-003",
    name: "Wool Blend Overcoat",
    category: "Outerwear",
    description: "A sophisticated wool blend overcoat with a classic silhouette. Features a button front closure and side pockets.",
    price: 199.99,
    salePrice: 149.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Camel", "Black", "Grey"],
    imageUrl: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=774&auto=format&fit=crop",
    inStock: true,
    stockCount: 35,
    tags: ["Wool", "Winter", "Formal", "Elegant"],
    rating: 4.7
  },
  {
    id: "prod-004",
    name: "Floral Midi Dress",
    category: "Dresses",
    description: "A feminine floral print midi dress with short sleeves and a flattering tie waist. Made from lightweight fabric ideal for spring and summer.",
    price: 79.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blue Floral", "Pink Floral"],
    imageUrl: "https://images.unsplash.com/photo-1619086311112-93738a4596e2?q=80&w=776&auto=format&fit=crop",
    inStock: true,
    stockCount: 42,
    tags: ["Floral", "Summer", "Feminine", "Elegant"],
    rating: 4.6
  },
  {
    id: "prod-005",
    name: "Leather Crossbody Bag",
    category: "Accessories",
    description: "A compact leather crossbody bag with adjustable strap and multiple compartments. Perfect for everyday essentials.",
    price: 129.99,
    sizes: ["One Size"],
    colors: ["Black", "Tan", "Burgundy"],
    imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=757&auto=format&fit=crop",
    inStock: true,
    stockCount: 28,
    tags: ["Leather", "Accessory", "Practical", "Versatile"],
    rating: 4.8
  },
  {
    id: "prod-006",
    name: "Performance Running Sneakers",
    category: "Footwear",
    description: "Lightweight performance running shoes with responsive cushioning and breathable mesh upper. Designed for comfort and support during runs.",
    price: 119.99,
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White/Blue", "Black/Red", "Grey/Neon"],
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop",
    inStock: true,
    stockCount: 64,
    tags: ["Athletic", "Running", "Performance", "Comfort"],
    rating: 4.4
  },
  {
    id: "prod-007",
    name: "Classic Denim Jacket",
    category: "Outerwear",
    description: "A timeless denim jacket with a slightly worn-in look. Features button front closure and multiple pockets.",
    price: 89.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Light Wash", "Medium Wash", "Dark Wash"],
    imageUrl: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=738&auto=format&fit=crop",
    inStock: true,
    stockCount: 53,
    tags: ["Denim", "Casual", "Versatile", "Layering"],
    rating: 4.6
  },
  {
    id: "prod-008",
    name: "Silk Blouse",
    category: "Tops",
    description: "An elegant silk blouse with a relaxed fit and button-down front. Perfect for office or evening wear.",
    price: 109.99,
    sizes: ["XS", "S", "M", "L"],
    colors: ["Ivory", "Black", "Blush", "Navy"],
    imageUrl: "https://images.unsplash.com/photo-1563630423918-b58f07336ac5?q=80&w=817&auto=format&fit=crop",
    inStock: true,
    stockCount: 37,
    tags: ["Silk", "Elegant", "Professional", "Luxe"],
    rating: 4.5
  },
  {
    id: "prod-009",
    name: "Tailored Wool Blazer",
    category: "Outerwear",
    description: "A sophisticated tailored blazer crafted from premium wool. Features a two-button closure and subtle check pattern.",
    price: 179.99,
    sizes: ["36R", "38R", "40R", "42R", "44R"],
    colors: ["Navy Check", "Grey Check"],
    imageUrl: "https://images.unsplash.com/photo-1509631179407-329207048bd3?q=80&w=776&auto=format&fit=crop",
    inStock: false,
    stockCount: 0,
    tags: ["Wool", "Formal", "Business", "Structured"],
    rating: 4.9
  },
  {
    id: "prod-010",
    name: "High-Waisted Yoga Leggings",
    category: "Activewear",
    description: "Performance yoga leggings with four-way stretch and moisture-wicking fabric. High-waisted design with hidden pocket.",
    price: 69.99,
    salePrice: 49.99,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy", "Olive"],
    imageUrl: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=774&auto=format&fit=crop",
    inStock: true,
    stockCount: 78,
    tags: ["Activewear", "Performance", "Stretch", "Workout"],
    rating: 4.7
  }
];

// Mock Sales Associates
export const mockSalesAssociates: SalesAssociate[] = [
  {
    id: "sa-001",
    name: "Sophia Lee",
    email: "sophia.lee@retailco.com",
    storeLocation: "Downtown Mall",
    specialties: ["Women's Fashion", "Accessories", "Personal Styling"],
    activeStatus: true,
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=776&auto=format&fit=crop"
  },
  {
    id: "sa-002",
    name: "Marcus Johnson",
    email: "marcus.johnson@retailco.com",
    storeLocation: "Downtown Mall",
    specialties: ["Men's Apparel", "Footwear", "Athletic Wear"],
    activeStatus: true,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=774&auto=format&fit=crop"
  },
  {
    id: "sa-003",
    name: "Olivia Martinez",
    email: "olivia.martinez@retailco.com",
    storeLocation: "Westfield Center",
    specialties: ["Formalwear", "Seasonal Trends", "Color Coordination"],
    activeStatus: false,
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop"
  }
];

// Function to get recommendations based on customer profile
export const getRecommendationsForCustomer = (customerId: string): Product[] => {
  const customer = mockCustomers.find(cust => cust.id === customerId);
  if (!customer) return [];
  
  // Simple recommendation algorithm based on preferred categories and sizes
  return mockProducts
    .filter(product => 
      customer.preferredCategories.includes(product.category) || 
      product.tags.some(tag => customer.favoriteStyles.includes(tag))
    )
    .filter(product => 
      product.inStock && 
      product.sizes.some(size => customer.preferredSizes.includes(size))
    )
    .slice(0, 5); // Return top 5 recommendations
};

// Function to find a customer by ID, email or phone
export const findCustomer = (identifier: string): Customer | undefined => {
  return mockCustomers.find(
    customer => 
      customer.id === identifier || 
      customer.email === identifier || 
      customer.phone === identifier
  );
};

// Function to calculate total spend by a customer
export const calculateTotalSpend = (customerId: string): number => {
  const customer = mockCustomers.find(cust => cust.id === customerId);
  if (!customer) return 0;
  
  return customer.purchaseHistory.reduce(
    (total, purchase) => total + purchase.total, 
    0
  );
};
