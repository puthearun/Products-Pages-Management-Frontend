import React, { useRef, useEffect } from 'react';
import { Search, TrendingUp } from 'lucide-react';
import { HeroAnimationBackground } from './HeroAnimationBackground';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../types';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onCategoryClick?: (cat: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  products,
  onSelectProduct,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { isDarkMode } = useTheme();

  // Keyboard shortcut: Pressing '/' focuses search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered recommendations for live search dropdown
  const filteredSuggestions = searchQuery.trim() === ''
    ? []
    : products.filter(p =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 4);

  const topSearchTags = ['roblox', 'iptv', 'chatgpt', 'valorant', 'discord'];

  return (
    <section className={`relative w-full overflow-hidden min-h-[400px] sm:min-h-[460px] lg:min-h-[500px] flex items-center transition-colors duration-500 ${isDarkMode ? 'bg-[#0a0c10]' : 'bg-white'
      }`}>

      {/* 🚀 LIVE ANIMATED BACKGROUND (Theme Responsive) */}
      <HeroAnimationBackground />

      <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 py-7 sm:py-10 lg:py-12 w-full">
        <div className="max-w-2xl">

          {/* Big Bold Headline matching reference image */}
          <h1 className={`text-2xl sm:text-4xl lg:text-[46px] font-black leading-[1.12] sm:leading-[1.1] mb-2 sm:mb-3 tracking-tight transition-colors break-words ${isDarkMode ? 'text-white' : 'text-gray-950'
            }`}>
            Marketplace for Everything <br />
            <span className="text-[#ff6259]">
              Pages & Accounts
            </span>
          </h1>

          {/* Subheading matching reference image */}
          <p className={`text-xs sm:text-sm lg:text-[15px] font-normal leading-relaxed mb-4 sm:mb-6 max-w-lg transition-colors ${isDarkMode ? 'text-[#9ca3af]' : 'text-gray-600'
            }`}>
            A modern marketplace website for browsing, managing, and purchasing pages, digital accounts, and services with secure listings, clear categories, and a seamless user experience.
          </p>

          {/* Exact Reference Search Bar */}
          <div className="relative max-w-xl">
            <div className={`w-full h-11 sm:h-12 rounded-xl px-3.5 sm:px-4 flex items-center transition-all duration-200 ${isDarkMode
              ? 'bg-[#18191c] border border-white/[0.04] focus-within:border-white/20'
              : 'bg-[#edf2f6] border border-gray-200/80 shadow-inner focus-within:border-gray-400 focus-within:bg-white'
              }`}>
              <Search className={`w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3.5 shrink-0 stroke-[1.75] ${isDarkMode ? 'text-[#8a8d94]' : 'text-gray-500'
                }`} />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search in PSD"
                className={`w-full bg-transparent text-sm sm:text-[15px] focus:outline-none font-normal tracking-wide ${isDarkMode
                  ? 'text-white placeholder-[#71747d]'
                  : 'text-gray-900 placeholder-gray-500'
                  }`}
              />

              {/* Shortcut chip '/' */}
              <div className={`hidden sm:flex items-center justify-center w-7 h-7 rounded-md text-xs font-mono font-medium shrink-0 ml-3 select-none ${isDarkMode
                ? 'border border-[#32353b] text-[#8a8d94]'
                : 'border border-gray-300 bg-white text-gray-600 shadow-xs'
                }`}>
                <span>/</span>
              </div>
            </div>

            {/* Predictive dropdown suggestions */}
            {filteredSuggestions.length > 0 && (
              <div className={`absolute top-full left-0 right-0 mt-2 rounded-2xl py-2 z-50 shadow-2xl backdrop-blur-xl ${isDarkMode
                ? 'bg-[#151922] neu-flat border border-white/5 text-white'
                : 'bg-white border border-gray-200 shadow-2xl text-gray-900'
                }`}>
                <div className={`px-4 py-1.5 text-[11px] uppercase tracking-wider font-bold flex items-center justify-between border-b ${isDarkMode ? 'text-slate-400 border-white/[0.04]' : 'text-gray-500 border-gray-100'
                  }`}>
                  <span>Matching Marketplace Items</span>
                  <span className="text-[10px]">{filteredSuggestions.length} found</span>
                </div>
                {filteredSuggestions.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectProduct(item);
                      onSearchChange('');
                    }}
                    className={`px-4 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-9 h-9 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <div className={`text-sm font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {item.title}
                        </div>
                        <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                          {item.category} • by {item.seller.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-[#ff4747]">${item.price.toFixed(2)}</div>
                      <div className="text-[10px] text-emerald-500 font-semibold">Instant Delivery</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Top searches tags row */}
          <div className="mt-3.5 sm:mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full flex-nowrap sm:flex-wrap touch-pan-x overscroll-x-contain select-none">
            <span className="text-[11px] font-extrabold text-[#ff4747] flex items-center gap-1.5 mr-1 tracking-wider uppercase shrink-0">
              <TrendingUp className="w-3.5 h-3.5 text-[#ff4747]" /> TOP SEARCHES
            </span>
            {topSearchTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onSearchChange(tag)}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-all shrink-0 ${isDarkMode
                  ? 'neu-flat-sm text-slate-300 hover:text-white hover:border-red-500/30'
                  : 'bg-white border border-gray-200 text-gray-700 hover:text-black hover:border-gray-400 shadow-xs'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
