import React, { useState, useMemo } from 'react';
import {
  ShieldCheck, Truck, ThumbsUp, Trophy, Gem,
  Minus, Plus, Share2, MessageSquare,
  ChevronDown, Check, Shield, ArrowLeft, CheckCircle2, Zap
} from 'lucide-react';
import type { Product } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProductDetailPageProps {
  product: Product;
  currency: 'USD' | 'KHR';
  onBack: () => void;
  onAddToCart: (p: Product) => void;
  onInstantBuy: (p: Product) => void;
}

interface SellerOffer {
  id: string;
  name: string;
  avatar: string;
  level: number;
  rating: string;
  soldCount: number;
  minOrder: number;
  stock: number;
  deliveryTime: string;
  isInstant: boolean;
  isOnline: boolean;
  hasVolumeDiscount: boolean;
  priceUsd: number;
  priceKhr: number;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  currency,
  onBack,
  onInstantBuy,
}) => {
  const { isDarkMode } = useTheme();
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  // Other sellers filter state
  const [filterOnlineOnly, setFilterOnlineOnly] = useState(false);
  const [filterInstantOnly, setFilterInstantOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'most-sold'>('recommended');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  // Product price calculation
  const safePriceUsd = product.price ? Number(product.price) : 16.90;
  const safePriceKhr = typeof product.priceKhr === 'number' && !isNaN(product.priceKhr)
    ? product.priceKhr
    : Math.round(safePriceUsd * 4100);

  // Total amount computed from quantity
  const totalUsd = (safePriceUsd * quantity).toFixed(2);
  const totalKhr = Math.round(safePriceKhr * quantity).toLocaleString();

  // Region and title formatting matching reference image
  const region = product.region || (product as any).region || 'SEA';
  const gameName = product.gameName || 'League of Legends';
  const categoryName = product.category || 'Smurf Accounts';
  const editionTitle = product.title?.includes('>') 
    ? product.title.split('>').pop()?.trim() || 'Rank Ready'
    : product.title || 'Rank Ready';

  const displayTitle = product.title && product.title.includes('>')
    ? product.title
    : `${region} > ${categoryName} > ${editionTitle}`;

  // Seller info with fallback to HellenWang from reference image
  const sellerName = product.seller?.name || 'HellenWang';
  const sellerAvatar = product.seller?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80';
  const sellerLevel = (product.seller as any)?.level || 171;
  const sellerRating = product.positiveRating || '99.12%';
  const completedOrders = product.completedOrders || '2.8M Completed';
  const completionRate = product.completionRate || '98.28%';
  const sellerBadge = product.badge || 'Legendary Seller';

  // Reputation metrics
  const positiveRateDisplay = product.positiveRating || (product.rating ? `${(product.rating * 20).toFixed(2)}%` : '100.00%');
  const reviewCountDisplay = product.reviewCount || 22;
  const salesCountDisplay = product.salesCount || 26;
  const stockCountDisplay = product.stock || 1;

  // Features / Details list
  const defaultFeatures = [
    'Ranked Ready Level 30+',
    '10 Placements Completed !!! 10 Normals Played',
    'Email Changable,Full Access',
  ];
  const initialFeatures = product.features && product.features.length > 0
    ? product.features.slice(0, 3)
    : defaultFeatures;
  const extraFeatures = product.features && product.features.length > 3
    ? product.features.slice(3)
    : [
        '100% Hand Leveled, Clean Match History',
        'Instant Automated Recovery Credentials Provided',
        'Backed by 14-Day Warranty & Coverage',
      ];

  // 12 Authentic Other Sellers from reference screenshot
  const otherSellers: SellerOffer[] = [
    {
      id: 'sel-1',
      name: 'HellenWang',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
      level: 171,
      rating: '100.00%',
      soldCount: 24,
      minOrder: 1,
      stock: 1,
      deliveryTime: 'Instant',
      isInstant: true,
      isOnline: true,
      hasVolumeDiscount: false,
      priceUsd: 16.90,
      priceKhr: 69290,
    },
    {
      id: 'sel-2',
      name: 'Steam_Inc',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      level: 140,
      rating: '98.00%',
      soldCount: 6,
      minOrder: 1,
      stock: 585,
      deliveryTime: '10 Mins',
      isInstant: false,
      isOnline: true,
      hasVolumeDiscount: false,
      priceUsd: 7.89,
      priceKhr: 32350,
    },
    {
      id: 'sel-3',
      name: 'SMGaming',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
      level: 124,
      rating: '100.00%',
      soldCount: 24,
      minOrder: 1,
      stock: 8,
      deliveryTime: 'Instant',
      isInstant: true,
      isOnline: false,
      hasVolumeDiscount: true,
      priceUsd: 10.90,
      priceKhr: 44690,
    },
    {
      id: 'sel-4',
      name: 'YellowTank',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      level: 108,
      rating: '98.30%',
      soldCount: 350,
      minOrder: 1,
      stock: 6,
      deliveryTime: 'Instant',
      isInstant: true,
      isOnline: true,
      hasVolumeDiscount: true,
      priceUsd: 7.95,
      priceKhr: 32595,
    },
    {
      id: 'sel-5',
      name: 'FunClownz',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80',
      level: 110,
      rating: '100.00%',
      soldCount: 107,
      minOrder: 1,
      stock: 147,
      deliveryTime: '30 Mins',
      isInstant: false,
      isOnline: true,
      hasVolumeDiscount: true,
      priceUsd: 11.00,
      priceKhr: 45100,
    },
    {
      id: 'sel-6',
      name: 'Danndda',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      level: 100,
      rating: '100.00%',
      soldCount: 2,
      minOrder: 1,
      stock: 10,
      deliveryTime: '10 Mins',
      isInstant: false,
      isOnline: false,
      hasVolumeDiscount: false,
      priceUsd: 20.25,
      priceKhr: 83025,
    },
    {
      id: 'sel-7',
      name: 'MaxEXP',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80',
      level: 71,
      rating: '100.00%',
      soldCount: 4,
      minOrder: 1,
      stock: 1,
      deliveryTime: 'Instant',
      isInstant: true,
      isOnline: true,
      hasVolumeDiscount: false,
      priceUsd: 11.23,
      priceKhr: 46043,
    },
    {
      id: 'sel-8',
      name: 'TommyMuller',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
      level: 62,
      rating: '100.00%',
      soldCount: 1,
      minOrder: 1,
      stock: 110,
      deliveryTime: '10 Mins',
      isInstant: false,
      isOnline: false,
      hasVolumeDiscount: true,
      priceUsd: 9.90,
      priceKhr: 40590,
    },
    {
      id: 'sel-9',
      name: 'MarketSmurf',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
      level: 54,
      rating: '92.00%',
      soldCount: 2,
      minOrder: 1,
      stock: 340,
      deliveryTime: '1 Hr',
      isInstant: false,
      isOnline: true,
      hasVolumeDiscount: true,
      priceUsd: 8.18,
      priceKhr: 33538,
    },
    {
      id: 'sel-10',
      name: 'Benoni',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      level: 61,
      rating: '100.00%',
      soldCount: 7,
      minOrder: 1,
      stock: 1,
      deliveryTime: 'Instant',
      isInstant: true,
      isOnline: true,
      hasVolumeDiscount: false,
      priceUsd: 8.70,
      priceKhr: 35670,
    },
    {
      id: 'sel-11',
      name: 'davidBuffs',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
      level: 51,
      rating: '0.00%',
      soldCount: 0,
      minOrder: 1,
      stock: 100,
      deliveryTime: '20 Mins',
      isInstant: false,
      isOnline: false,
      hasVolumeDiscount: false,
      priceUsd: 9.72,
      priceKhr: 39852,
    },
    {
      id: 'sel-12',
      name: 'Resclus',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&fit=crop&q=80',
      level: 1,
      rating: '0.00%',
      soldCount: 0,
      minOrder: 1,
      stock: 8,
      deliveryTime: '1 Hr',
      isInstant: false,
      isOnline: true,
      hasVolumeDiscount: false,
      priceUsd: 11.39,
      priceKhr: 46699,
    },
  ];

  const filteredSellers = useMemo(() => {
    return otherSellers
      .filter((s) => {
        if (filterOnlineOnly && !s.isOnline) return false;
        if (filterInstantOnly && !s.isInstant) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceUsd - b.priceUsd;
        if (sortBy === 'price-high') return b.priceUsd - a.priceUsd;
        if (sortBy === 'most-sold') return b.soldCount - a.soldCount;
        return 0;
      });
  }, [filterOnlineOnly, filterInstantOnly, sortBy]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`min-h-screen pt-20 pb-16 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#090c12] text-white' : 'bg-[#fafbfc] text-gray-900'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Navigation Breadcrumb matching reference image: Home > Game Accounts > League of Legends */}
        <div className="flex items-center justify-between gap-4 mb-5">
          <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-slate-400 select-none">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-[#ff3838] transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>&gt;</span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
              Game Accounts
            </span>
            <span>&gt;</span>
            <span className="hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors">
              {gameName}
            </span>
          </div>

          <button
            type="button"
            onClick={onBack}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isDarkMode
                ? 'bg-[#141824] border-white/10 text-slate-300 hover:text-white hover:border-white/25'
                : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300 shadow-2xs'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Products</span>
          </button>
        </div>

        {/* Two-Column Grid Layout matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ============================================================== */}
          {/* LEFT COLUMN (8 cols): Title, Reputation, Seller, Info, Details */}
          {/* ============================================================== */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Title & Share Button */}
            <div className="flex items-start justify-between gap-4">
              <h1 className={`text-2xl sm:text-3xl lg:text-[30px] font-black leading-tight tracking-tight ${
                isDarkMode ? 'text-white' : 'text-gray-950'
              }`}>
                {displayTitle}
              </h1>

              <button
                type="button"
                onClick={handleShare}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#141824] border-white/10 text-slate-200 hover:text-white hover:border-white/30'
                    : 'bg-white border-gray-200 text-gray-700 hover:text-black hover:border-gray-300 shadow-2xs'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Reputation Bar matching reference image */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 font-bold bg-emerald-50/50 dark:bg-emerald-950/20">
                <ThumbsUp className="w-3 h-3" />
                <span>{positiveRateDisplay}</span>
              </div>
              <span className={`underline cursor-pointer ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                ({reviewCountDisplay} reviews)
              </span>
              <span className={isDarkMode ? 'text-slate-500' : 'text-gray-400'}>
                {salesCountDisplay} sold
              </span>
              <a
                href="#other-sellers"
                className="ml-auto text-xs font-bold underline text-gray-900 dark:text-white hover:text-[#ff3838] transition-colors"
              >
                Other sellers ({otherSellers.length})
              </a>
            </div>

            {/* Seller Card matching reference image */}
            <div className={`rounded-2xl p-4 sm:p-5 flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 border transition-all ${
              isDarkMode
                ? 'bg-[#121622] border-white/[0.08]'
                : 'bg-white border-gray-200/90 shadow-2xs'
            }`}>
              <div className="flex items-center space-x-3.5">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-black/10 dark:border-white/10">
                  <img
                    src={sellerAvatar}
                    alt={sellerName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-[#121622]" />
                </div>
                <div>
                  <div className="flex items-baseline space-x-2">
                    <span className={`font-extrabold text-sm sm:text-base ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {sellerName}
                    </span>
                  </div>
                  <div className={`text-[11px] font-medium mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                    Lvl {sellerLevel}
                  </div>
                </div>

                <div className="hidden md:flex items-center space-x-5 pl-5 border-l border-gray-100 dark:border-white/5 text-xs">
                  <div>
                    <div className={`font-bold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <Trophy className="w-3.5 h-3.5 text-amber-500" />
                      <span>{completionRate}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-slate-500">{completedOrders}</div>
                  </div>
                  <div>
                    <div className={`font-bold flex items-center gap-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <ThumbsUp className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{sellerRating}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-slate-500">Last 90 Days</div>
                  </div>
                  <div>
                    <div className="font-bold text-sky-500 flex items-center gap-1">
                      <Gem className="w-3.5 h-3.5 text-sky-400" />
                      <span>{sellerBadge}</span>
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-slate-500">Seller Ranking</div>
                  </div>
                </div>
              </div>

              {/* Green Chat Button */}
              <button
                type="button"
                onClick={() => setChatOpen(!chatOpen)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-white text-xs font-bold flex items-center justify-center space-x-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
              >
                <MessageSquare className="w-3.5 h-3.5 fill-current" />
                <span>{chatOpen ? 'Chatting...' : 'Chat'}</span>
              </button>
            </div>

            {/* Chat Toast Notification */}
            {chatOpen && (
              <div className={`rounded-xl p-3 text-xs flex items-center justify-between border ${
                isDarkMode ? 'bg-[#181d2a] border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
              }`}>
                <span>Direct message channel with {sellerName} is active!</span>
                <button onClick={() => setChatOpen(false)} className="text-xs font-bold underline">Dismiss</button>
              </div>
            )}

            {/* Product Info Section matching reference image */}
            <div className="pt-2 space-y-4">
              <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Product Info
              </h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-xs">
                <div>
                  <div className="text-gray-400 dark:text-slate-500 font-normal">Delivery speed</div>
                  <div className={`font-bold mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {product.instantDelivery !== false ? 'Instant' : '10 Mins'}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 dark:text-slate-500 font-normal">Delivery method</div>
                  <div className="font-bold underline cursor-pointer mt-1 text-sm text-sky-500">
                    Auto delivery
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 dark:text-slate-500 font-normal">Server</div>
                  <div className={`font-bold mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{region}</div>
                </div>
                <div>
                  <div className="text-gray-400 dark:text-slate-500 font-normal">Account Type</div>
                  <div className={`font-bold mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {categoryName}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 dark:text-slate-500 font-normal">UnRanked Smurf</div>
                  <div className={`font-bold mt-1 text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{editionTitle}</div>
                </div>
              </div>
            </div>

            {/* Details Section matching reference image */}
            <div className="pt-6 border-t border-gray-100 dark:border-white/[0.06] space-y-3">
              <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Details
              </h2>
              <div className={`text-xs space-y-2 leading-relaxed font-normal ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                {initialFeatures.map((feat, idx) => (
                  <div key={idx}>√{feat.replace(/^[√•-]\s*/, '')}</div>
                ))}
                {showMoreDetails && extraFeatures.map((feat, idx) => (
                  <div key={`extra-${idx}`}>√{feat.replace(/^[√•-]\s*/, '')}</div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className="text-xs font-bold underline hover:text-[#ff3838] transition-colors cursor-pointer inline-block mt-1"
              >
                {showMoreDetails ? 'View less' : 'View more'}
              </button>
            </div>

          </div>

          {/* ============================================================== */}
          {/* RIGHT COLUMN (4 cols): Sticky Purchase Card matching image    */}
          {/* ============================================================== */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className={`rounded-2xl p-6 border space-y-5 transition-all ${
              isDarkMode
                ? 'bg-[#121622] border-white/[0.08] shadow-xl'
                : 'bg-white border-gray-200/90 shadow-md'
            }`}>
              
              {/* Available Count */}
              <div className="text-xs text-center text-gray-400 dark:text-slate-500 font-medium">
                {stockCountDisplay} Available
              </div>

              {/* Quantity Stepper: Pill-shaped track matching reference image */}
              <div className={`w-full max-w-[210px] mx-auto rounded-full border px-3 py-1 flex items-center justify-between transition-colors ${
                isDarkMode
                  ? 'bg-[#0e121a] border-white/10'
                  : 'bg-gray-50/90 border-gray-200'
              }`}>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <span className={`text-base font-extrabold min-w-[24px] text-center ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-full bg-[#ff3838] hover:bg-[#e02424] text-white flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 font-bold" />
                </button>
              </div>

              {/* Total Amount Row */}
              <div className="flex items-center justify-between pt-2">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Total Amount
                </span>
                <div className={`text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                  {currency === 'USD' ? (
                    <>
                      <span>{totalUsd}</span>{' '}
                      <span className="text-xs font-bold text-gray-400">USD</span>
                    </>
                  ) : (
                    <>
                      <span>{totalKhr}</span>{' '}
                      <span className="text-xs font-bold text-gray-400">KHR</span>
                    </>
                  )}
                </div>
              </div>

              {/* Big Red Checkout Button matching reference image */}
              <button
                type="button"
                onClick={() => onInstantBuy(product)}
                className="w-full py-3.5 rounded-xl bg-[#e02424] hover:bg-[#c81e1e] text-white font-black text-base shadow-lg hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer text-center"
              >
                Checkout
              </button>

              {/* 3 Stacked Protection Cards matching reference image */}
              <div className="space-y-2.5 pt-2 text-xs">
                {/* 1. G2G Protection */}
                <div className={`p-3 rounded-xl flex items-start space-x-3 border transition-colors ${
                  isDarkMode ? 'bg-[#0e121a] border-white/5' : 'bg-gray-50/80 border-gray-100'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-gray-400 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      G2G Protection
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5 leading-tight">
                      Payment Released Only After Confirmation.
                    </div>
                  </div>
                </div>

                {/* 2. Instant Delivery */}
                <div className={`p-3 rounded-xl flex items-start space-x-3 border transition-colors ${
                  isDarkMode ? 'bg-[#0e121a] border-white/5' : 'bg-gray-50/80 border-gray-100'
                }`}>
                  <Truck className="w-4 h-4 text-gray-400 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Instant Delivery
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5 leading-tight">
                      Automated Delivery System Active.
                    </div>
                  </div>
                </div>

                {/* 3. 14-Day Coverage */}
                <div className={`p-3 rounded-xl flex items-start space-x-3 border transition-colors ${
                  isDarkMode ? 'bg-[#0e121a] border-white/5' : 'bg-gray-50/80 border-gray-100'
                }`}>
                  <Shield className="w-4 h-4 text-gray-400 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      14-Day Coverage
                    </div>
                    <div className="text-[11px] text-gray-400 dark:text-slate-500 mt-0.5 leading-tight">
                      Insured For 14 Days From Delivery
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Other Sellers (12) Comparison Table matching reference image */}
        <div id="other-sellers" className="mt-14 pt-8 border-t border-gray-200 dark:border-white/10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className={`text-base sm:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Other Sellers ({otherSellers.length})
            </h2>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-4 text-xs">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Online Sellers</span>
                <input
                  type="checkbox"
                  checked={filterOnlineOnly}
                  onChange={(e) => setFilterOnlineOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-8 h-4.5 rounded-full transition-colors relative p-0.5 ${
                  filterOnlineOnly ? 'bg-[#ff3838]' : isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    filterOnlineOnly ? 'translate-x-3.5' : 'translate-x-0'
                  }`} />
                </div>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <span className={isDarkMode ? 'text-slate-300' : 'text-gray-600'}>Instant</span>
                <input
                  type="checkbox"
                  checked={filterInstantOnly}
                  onChange={(e) => setFilterInstantOnly(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-8 h-4.5 rounded-full transition-colors relative p-0.5 ${
                  filterInstantOnly ? 'bg-[#ff3838]' : isDarkMode ? 'bg-slate-700' : 'bg-gray-300'
                }`}>
                  <div className={`w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    filterInstantOnly ? 'translate-x-3.5' : 'translate-x-0'
                  }`} />
                </div>
              </label>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
                    isDarkMode ? 'bg-[#141824] border-white/10 text-slate-200' : 'bg-white border-gray-200 text-gray-800 shadow-2xs'
                  }`}
                >
                  <span className={isDarkMode ? 'text-slate-400' : 'text-gray-500'}>Sort by</span>
                  <span className="font-bold">
                    {sortBy === 'recommended' && 'Recommended'}
                    {sortBy === 'price-low' && 'Price: Low to High'}
                    {sortBy === 'price-high' && 'Price: High to Low'}
                    {sortBy === 'most-sold' && 'Most Sold'}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                </button>

                {sortDropdownOpen && (
                  <div className={`absolute right-0 mt-1 w-44 rounded-xl border shadow-xl py-1 z-30 ${
                    isDarkMode ? 'bg-[#181d2a] border-white/10 text-white' : 'bg-white border-gray-200 text-gray-900'
                  }`}>
                    {[
                      { id: 'recommended', label: 'Recommended' },
                      { id: 'price-low', label: 'Price: Low to High' },
                      { id: 'price-high', label: 'Price: High to Low' },
                      { id: 'most-sold', label: 'Most Sold' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.id as any);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full px-3.5 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                          sortBy === opt.id
                            ? 'bg-[#ff3838]/10 text-[#ff3838] font-bold'
                            : isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-100'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {sortBy === opt.id && <Check className="w-3 h-3 text-[#ff3838]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 12 Sellers list */}
          <div className="space-y-2.5">
            {filteredSellers.map((seller) => {
              const sellerPriceUsd = seller.priceUsd;
              const sellerPriceKhr = Math.round(sellerPriceUsd * 4100);

              return (
                <div
                  key={seller.id}
                  className={`rounded-2xl p-3 sm:p-4 border flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 transition-all ${
                    isDarkMode
                      ? 'bg-[#121622] border-white/[0.06] hover:border-white/20'
                      : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-2xs'
                  }`}
                >
                  {/* Seller Identity */}
                  <div className="flex items-center space-x-3 min-w-[140px] sm:min-w-[170px]">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-white/10">
                      <img src={seller.avatar} alt={seller.name} className="w-full h-full object-cover" />
                      {seller.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-black" />
                      )}
                    </div>
                    <div>
                      <div className={`font-bold text-xs sm:text-sm leading-none ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {seller.name}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                        <span>Lvl {seller.level}</span>
                        <CheckCircle2 className="w-2.5 h-2.5 text-sky-400" />
                      </div>
                    </div>
                  </div>

                  {/* Rating & Sold count */}
                  <div className="flex items-center space-x-2 text-xs min-w-[120px]">
                    <div className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold border border-emerald-500/20 text-[11px] flex items-center gap-1">
                      <ThumbsUp className="w-2.5 h-2.5" />
                      <span>{seller.rating}</span>
                    </div>
                    <span className={`text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`}>
                      {seller.soldCount} sold
                    </span>
                  </div>

                  {/* Delivery & Stock badges */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                    <span className={`px-2 py-0.5 rounded font-mono ${
                      isDarkMode ? 'bg-[#181d2a] text-slate-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      Min: {seller.minOrder}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-mono ${
                      isDarkMode ? 'bg-[#181d2a] text-slate-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {seller.stock}
                    </span>
                    <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                      seller.isInstant
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : isDarkMode ? 'bg-[#181d2a] text-slate-300' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {seller.isInstant && <Zap className="w-2.5 h-2.5" />}
                      <span>{seller.deliveryTime}</span>
                    </span>
                    {seller.hasVolumeDiscount && (
                      <span className="px-2 py-0.5 rounded-full border border-red-500/80 text-red-500 text-[9px] font-bold">
                        Volume Discount
                      </span>
                    )}
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center space-x-3 ml-auto sm:ml-0 shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] text-gray-400">From</div>
                      <div className={`text-xs sm:text-sm font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {currency === 'USD' ? `${sellerPriceUsd.toFixed(2)} USD` : `${sellerPriceKhr.toLocaleString()} KHR`}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onInstantBuy(product)}
                      className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                        isDarkMode
                          ? 'bg-[#181d2a] border-white/10 text-slate-200 hover:border-white/30 hover:text-white'
                          : 'bg-white border-gray-300 text-gray-800 hover:border-gray-400 hover:text-black shadow-2xs'
                      }`}
                    >
                      View
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
