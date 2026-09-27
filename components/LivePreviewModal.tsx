import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, Zap, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import type { Product } from '../types';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

interface LivePreviewModalProps {
  product: Product | null;
  onClose: () => void;
  currency: 'USD' | 'KHR';
  onAddToCart: (p: Product) => void;
  onInstantBuy: (p: Product) => void;
}

export const LivePreviewModal: React.FC<LivePreviewModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
  onInstantBuy,
}) => {
  const { isDarkMode } = useTheme();
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!product) return null;

  const safePriceUsd = Number(product.price) || 0;
  const safePriceKhr = typeof product.priceKhr === 'number' && !isNaN(product.priceKhr)
    ? product.priceKhr
    : Math.round(safePriceUsd * 4100);

  const displayPrice = currency === 'USD'
    ? `$${safePriceUsd.toFixed(2)}`
    : `${safePriceKhr.toLocaleString()} ៛`;

  const viewportWidth = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[375px]',
  }[viewport];

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 backdrop-blur-md animate-fadeIn transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/45'
      }`}>
      <div className={`relative w-full max-w-6xl h-[96vh] sm:h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 border ${isDarkMode
          ? 'bg-[#0e121a] border-white/10 text-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]'
          : 'bg-white border-gray-200/90 text-gray-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)]'
        }`}>

        {/* Top Control Bar */}
        <div className={`h-14 sm:h-16 px-3 sm:px-6 flex items-center justify-between shrink-0 gap-2 border-b transition-colors ${isDarkMode
            ? 'bg-[#131722] border-white/[0.08]'
            : 'bg-gray-50/95 border-gray-200'
          }`}>

          {/* Title & Category */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-extrabold uppercase shrink-0 ${isDarkMode
                ? 'neu-inset text-[#ff5252]'
                : 'bg-red-50 border border-red-200 text-[#ff3838]'
              }`}>
              {product.category}
            </span>
            <h2 className={`text-xs sm:text-base font-extrabold truncate max-w-[120px] xs:max-w-xs sm:max-w-md ${isDarkMode ? 'text-white' : 'text-gray-950'
              }`}>
              {product.title}
            </h2>
          </div>

          {/* Viewport Switcher (Responsive for all screens) */}
          <div className={`flex items-center space-x-0.5 sm:space-x-1 p-0.5 sm:p-1 rounded-xl shrink-0 ${isDarkMode ? 'neu-inset' : 'bg-gray-200/70 border border-gray-300/50'
            }`}>
            <button
              type="button"
              onClick={() => setViewport('desktop')}
              className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${viewport === 'desktop'
                  ? isDarkMode ? 'neu-flat-sm text-[#ff4747]' : 'bg-white text-[#ff3838] shadow-xs'
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              title="Desktop View"
              aria-label="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${viewport === 'tablet'
                  ? isDarkMode ? 'neu-flat-sm text-[#ff4747]' : 'bg-white text-[#ff3838] shadow-xs'
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              title="Tablet View"
              aria-label="Tablet View"
            >
              <Tablet className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              className={`p-1.5 sm:p-2 rounded-lg transition-all cursor-pointer ${viewport === 'mobile'
                  ? isDarkMode ? 'neu-flat-sm text-[#ff4747]' : 'bg-white text-[#ff3838] shadow-xs'
                  : isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-600 hover:text-black'
                }`}
              title="Mobile View"
              aria-label="Mobile View"
            >
              <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Theme Toggle within Preview Modal */}
          <div className="hidden xs:flex items-center shrink-0">
            <ThemeToggle size="sm" showLabel={false} />
          </div>

          {/* Right Action & Close */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
            <div className="text-right hidden sm:block">
              <div className={`text-sm sm:text-base font-black ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                {displayPrice}
              </div>
              <div className="text-[10px] text-emerald-500 font-semibold flex items-center gap-1 justify-end">
                <Zap className="w-2.5 h-2.5" /> Instant Delivery
              </div>
            </div>

            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className={`hidden sm:flex p-2.5 rounded-xl transition-all cursor-pointer ${isDarkMode
                  ? 'neu-flat-sm text-slate-300 hover:text-white'
                  : 'bg-white border border-gray-200 text-gray-700 hover:text-black shadow-xs'
                }`}
              title="Add to Cart"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                onInstantBuy(product);
                onClose();
              }}
              className="neu-pill-red px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold flex items-center space-x-1 sm:space-x-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-transform"
            >
              <Zap className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Buy Now</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 sm:p-2 rounded-xl transition-colors cursor-pointer ${isDarkMode
                  ? 'neu-flat-sm text-slate-400 hover:text-white'
                  : 'bg-gray-100 border border-gray-200 text-gray-500 hover:text-black'
                }`}
              title="Close Preview"
              aria-label="Close Preview"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

        {/* Viewport Frame / Simulated Interactive Page */}
        <div className={`flex-1 overflow-y-auto p-2.5 sm:p-6 flex justify-center items-start transition-colors ${isDarkMode ? 'bg-[#07090d]' : 'bg-[#f1f5f9]'
          }`}>
          <div className={`${viewportWidth} max-w-full transition-all duration-300 rounded-2xl overflow-hidden border shadow-2xl ${isDarkMode
              ? 'bg-[#0f1218] border-white/10'
              : 'bg-white border-gray-200'
            }`}>

            {/* Simulated Browser URL bar */}
            <div className={`h-10 px-4 flex items-center space-x-2 border-b transition-colors ${isDarkMode
                ? 'bg-[#141822] border-white/5'
                : 'bg-gray-100 border-gray-200'
              }`}>
              <div className="flex space-x-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className={`flex-1 max-w-sm mx-auto h-6 rounded-md px-3 flex items-center text-[10px] font-mono truncate ${isDarkMode
                  ? 'neu-inset text-slate-400'
                  : 'bg-white border border-gray-200 text-gray-500'
                }`}>
                https://preview.psd-market.com/product/{product.slug || product.id}
              </div>
            </div>

            {/* Interactive Page Demonstration */}
            <div className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">

              {/* Demo Page Hero Banner */}
              <div className={`relative rounded-3xl overflow-hidden p-6 sm:p-10 border transition-all ${isDarkMode
                  ? 'neu-convex border-white/5 text-white'
                  : 'bg-gradient-to-br from-red-50/50 via-white to-gray-50 border-gray-200 text-gray-900 shadow-sm'
                }`}>
                <div className="max-w-xl space-y-3 sm:space-y-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold ${isDarkMode
                      ? 'neu-flat-sm text-[#ff5252]'
                      : 'bg-white border border-red-200 text-[#ff3838] shadow-xs'
                    }`}>
                    ⭐ {product.category}
                  </div>
                  <h1 className={`text-xl sm:text-3xl lg:text-4xl font-black leading-tight ${isDarkMode ? 'text-white' : 'text-gray-950'
                    }`}>
                    {product.title}
                  </h1>
                  <p className={`text-xs sm:text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-gray-600'
                    }`}>
                    {product.description}
                  </p>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-1">
                      {product.tags.map(tag => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${isDarkMode
                              ? 'neu-inset text-slate-300'
                              : 'bg-gray-100 border border-gray-200 text-gray-700'
                            }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Demo Feature Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 flex items-start space-x-3 border transition-all ${isDarkMode
                        ? 'neu-flat border-white/5 bg-[#121622]/60'
                        : 'bg-white border-gray-200 shadow-xs'
                      }`}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        Included Feature {idx + 1}
                      </h4>
                      <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        {feat}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Deliverables & Seller Note */}
              <div className={`rounded-2xl p-4 sm:p-6 border flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${isDarkMode
                  ? 'neu-flat border-white/5 bg-[#131822]'
                  : 'bg-gray-50 border-gray-200 shadow-xs'
                }`}>
                <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#ff3838] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className={`text-sm font-bold flex items-center gap-1.5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      <span className="truncate">Listed by {product.seller.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                    </h4>
                    <p className={`text-xs truncate ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      ⭐ {product.seller.rating} • {product.seller.sales} sales • Response: {product.seller.responseTime}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isDarkMode
                        ? 'neu-pill-secondary text-white'
                        : 'bg-white border border-gray-200 text-gray-800 shadow-xs hover:border-gray-300'
                      }`}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onInstantBuy(product);
                      onClose();
                    }}
                    className="neu-pill-red px-4 sm:px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Purchase ({displayPrice})</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
