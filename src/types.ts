export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Ceramics' | 'Lighting' | 'Textiles' | 'Audio & Objects';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  description: string;
  materials: string;
  dimensions: string;
  origin: string;
  inStock: boolean;
  stockCount: number;
  badge?: 'Signature' | 'Limited Run' | 'New Release' | 'Best Seller';
  colors: ProductColor[];
  accentGradient: string;
  visualType: 'vase' | 'lamp' | 'throw' | 'speaker' | 'mug' | 'carafe' | 'tray' | 'candle';
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: {
    fullName: string;
    email: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}
