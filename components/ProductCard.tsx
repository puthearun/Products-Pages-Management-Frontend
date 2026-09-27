import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  currency: 'USD' | 'KHR';
  onPreview: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onInstantBuy?: (product: Product) => void;
}

const REGIONS = ['NA', 'EUW', 'GLOBAL', 'ASIA', 'TW', 'JP', 'TR', 'RU'];

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  onPreview,
  onAddToCart,
}) => {
  const { isDarkMode } = useTheme();

  const safePriceUsd = Number(product.price) || 0;
  const safePriceKhr = typeof product.priceKhr === 'number' && !isNaN(product.priceKhr)
    ? product.priceKhr
    : Math.round(safePriceUsd * 4100);

  // Deterministic region based on product id for realistic e-commerce breadcrumb
  const charSum = product.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const region = (product as any).region || REGIONS[charSum % REGIONS.length];

  // Number of available offers derived from reviews/sales
  const offersCount = product.reviewCount 
    ? Math.max(1, Math.floor(product.reviewCount / 14)) 
    : 3;

  // Watermark text (PSD / WEB / UI / AI)
  const watermark = product.category?.toUpperCase().includes('WEB')
    ? 'WEB'
    : product.category?.toUpperCase().includes('PROMPT')
    ? 'AI'
    : product.category?.toUpperCase().includes('DESIGN')
    ? 'UI'
    : 'PSD';

  return (
    <div
      onClick={() => onPreview(product)}
      className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group cursor-pointer transition-all duration-300 min-h-[195px] select-none ${
        isDarkMode
          ? 'bg-[#141824] border border-white/[0.07] hover:border-white/20 shadow-xs hover:shadow-lg'
          : 'bg-white border border-gray-200/90 hover:border-gray-300 shadow-xs hover:shadow-md'
      }`}
    >
      {/* Subtle background watermark matching reference image */}
      <span
        className={`absolute top-2 right-3 text-4xl sm:text-5xl font-black select-none pointer-events-none tracking-tighter uppercase font-sans transition-opacity ${
          isDarkMode ? 'text-white/[0.04]' : 'text-gray-300/25'
        }`}
      >
        {watermark}
      </span>

      {/* Top Section: Breadcrumb Title & Sold Count */}
      <div className="relative z-10">
        <h3
          className={`font-bold text-[13.5px] sm:text-[14.5px] leading-snug line-clamp-2 pr-7 transition-colors ${
            isDarkMode
              ? 'text-white group-hover:text-[#ff4747]'
              : 'text-gray-900 group-hover:text-[#ff4747]'
          }`}
          title={`${region} > ${product.category} > ${product.title}`}
        >
          {region} &gt; {product.category} &gt; {product.title}
        </h3>

        <div className={`text-[11px] sm:text-xs font-medium mt-1 ${
          isDarkMode ? 'text-slate-400' : 'text-gray-400'
        }`}>
          {product.salesCount.toLocaleString()} Sold
        </div>
      </div>

      {/* Middle Section: Overlapping Avatars & Offers Available */}
      <div className="flex items-center justify-between my-3 sm:my-4 relative z-10">
        {/* Stacked Profile Avatar Badge matching reference image */}
        <div className="flex items-center">
          <svg
            viewBox="0 0 54 28"
            className="w-12 h-6 sm:w-14 sm:h-7 overflow-visible select-none shrink-0"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Circle 3 (Rightmost / Lightest / Back) */}
            <circle
              cx="39"
              cy="14"
              r="11.5"
              fill={isDarkMode ? '#3b4252' : '#cfd2d7'}
              stroke={isDarkMode ? '#141824' : '#ffffff'}
              strokeWidth="2.5"
            />

            {/* Circle 2 (Middle / Medium grey) */}
            <circle
              cx="26"
              cy="14"
              r="11.5"
              fill={isDarkMode ? '#576073' : '#a6aab2'}
              stroke={isDarkMode ? '#141824' : '#ffffff'}
              strokeWidth="2.5"
            />

            {/* Circle 1 (Leftmost / Dark grey / Front) */}
            <circle
              cx="13"
              cy="14"
              r="11.5"
              fill={isDarkMode ? '#798396' : '#787c84'}
              stroke={isDarkMode ? '#141824' : '#ffffff'}
              strokeWidth="2.5"
            />

            {/* Hollow User outline silhouette icon inside Circle 1 */}
            <circle
              cx="13"
              cy="10.8"
              r="3.2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
            />
            <path
              d="M 7.2 20.2 C 7.2 16.6 9.6 15.8 13 15.8 C 16.4 15.8 18.8 16.6 18.8 20.2"
              fill="none"
              stroke="#ffffff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Available Offers Counter */}
        <div className="text-right">
          <div className={`font-bold text-xs sm:text-sm leading-tight ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {offersCount} offers
          </div>
          <div className={`text-[11px] font-normal mt-0.5 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`}>
            Available
          </div>
        </div>
      </div>

      {/* Bottom Section: Price ("From X.XX USD") & Action Arrow */}
      <div className="flex items-center justify-between pt-1 relative z-10">
        <div>
          <div className={`text-[11px] font-normal leading-none mb-1 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`}>
            From
          </div>
          <div className={`text-sm sm:text-base lg:text-[17px] font-extrabold tracking-tight leading-none ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {currency === 'USD' ? (
              <>
                <span>{safePriceUsd.toFixed(2)}</span>{' '}
                <span className={`text-xs sm:text-sm font-semibold ml-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  USD
                </span>
              </>
            ) : (
              <>
                <span>{safePriceKhr.toLocaleString()}</span>{' '}
                <span className={`text-xs sm:text-sm font-semibold ml-0.5 ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  KHR
                </span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* Quick Add to Cart button (smoothly visible on hover / touch) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            aria-label="Add to cart"
            title="Add to cart"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100 ${
              isDarkMode
                ? 'bg-[#181d2c] border-white/10 text-slate-300 hover:text-white hover:border-[#ff4747]/50'
                : 'bg-white border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 shadow-xs'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Arrow button matching reference image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(product);
            }}
            aria-label="View product details"
            title="View product details"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl border flex items-center justify-center transition-all duration-200 cursor-pointer ${
              isDarkMode
                ? 'bg-[#181d2c] border-white/10 text-slate-300 hover:border-white/30 hover:text-white'
                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-400 hover:text-black shadow-xs'
            }`}
          >
            <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
