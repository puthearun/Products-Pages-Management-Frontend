export interface Seller {
  id: string;
  name: string;
  avatar: string;
  verified: boolean;
  rating: number;
  sales: number;
  responseTime: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: string;
  shortDesc: string;
  description: string;
  price: number;
  priceKhr: number;
  rating: number;
  reviewCount: number;
  salesCount: number;
  badge?: string;
  seller: Seller;
  thumbnail: string;
  previewImages: string[];
  demoUrl: string;
  tags: string[];
  instantDelivery: boolean;
  fileFormats: string[];
  features: string[];
  createdAt: string;
  region?: string;
  gameName?: string;
  stock?: number;
  positiveRating?: string;
  completedOrders?: string;
  completionRate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderConfirmation {
  id: string;
  items: { productId: string; title: string; price: number }[];
  buyerName: string;
  buyerEmail: string;
  totalUsd: number;
  totalKhr: number;
  currency: string;
  paymentMethod: string;
  status: string;
  licenseKey: string;
  downloadToken: string;
  deliveredAt: string;
}
