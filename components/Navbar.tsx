import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  User,
  Check,
  Menu,
  X,
  Sparkles,
  Layers,
  ShoppingBag,
  Search,
  ChevronDown,
  Layout,
  Package,
  Bot,
  Share2,
  Flame,
  ArrowRight,
} from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currency: 'USD' | 'KHR';
  onCurrencyChange: (c: 'USD' | 'KHR') => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSellerModal: () => void;
  onOpenAuthModal: () => void;
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

// Structured category definitions for professional navigation
const PRIMARY_NAV_ITEMS = [
  { id: 'All', label: 'All Products', icon: Layers },
  { id: 'Page Templates', label: 'Page Templates', icon: Layout },
  { id: 'Accounts', label: 'Accounts', icon: User },
  { id: 'Digital Products', label: 'Digital Products', icon: Package },
];

const MORE_CATEGORIES = [
  { id: 'AI Prompts', label: 'AI Prompts', icon: Bot, tag: 'Trending' },
  { id: 'UI UX Designs', label: 'UI UX Designs', icon: Flame, tag: 'Popular' },
  { id: 'Social Media Content', label: 'Social Media', icon: Share2, tag: 'New' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  onCurrencyChange,
  cartCount,
  onOpenCart,
  onOpenSellerModal,
  onOpenAuthModal,
  onSelectCategory,
  activeCategory,
}) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCartBumping, setIsCartBumping] = useState(false);

  const { isDarkMode } = useTheme();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const moreMenuRef = useRef<HTMLDivElement>(null);
  const prevCartCountRef = useRef(cartCount);

  // 1. Smooth GPU-accelerated scroll tracking with micro-progress bar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          setIsScrolled(currentScroll > 15);

          const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const progress = winHeight > 0 ? (currentScroll / winHeight) * 100 : 0;
          setScrollProgress(Math.min(100, Math.max(0, progress)));

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Cart count bump micro-animation
  useEffect(() => {
    if (cartCount > prevCartCountRef.current) {
      setIsCartBumping(true);
      const timer = setTimeout(() => setIsCartBumping(false), 450);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartCount;
  }, [cartCount]);

  // 3. Click-outside listener & Escape key handler for dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setShowMoreMenu(false);
      }
    };


    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowLangMenu(false);
        setShowMoreMenu(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 4. Lock background scroll when mobile menu is active
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // 5. Global Keyboard shortcut for search (Ctrl+K or Cmd+K)
  const triggerSearchFocus = useCallback(() => {
    const input = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement | null;
    if (input) {
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => input.focus(), 250);
    } else {
      const el = document.getElementById('marketplace');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handleGlobalShortcuts = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        triggerSearchFocus();
      }
    };
    window.addEventListener('keydown', handleGlobalShortcuts);
    return () => window.removeEventListener('keydown', handleGlobalShortcuts);
  }, [triggerSearchFocus]);

  const handleSelectNavCategory = (cat: string) => {
    onSelectCategory(cat);
    setShowMoreMenu(false);
    setIsMobileMenuOpen(false);
  };

  const isMoreCategoryActive = MORE_CATEGORIES.some((c) => c.id === activeCategory);
  const activeMoreCategory = MORE_CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-in-out ${isScrolled
          ? isDarkMode
            ? 'bg-[#0d1016]/92 border-b border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-xl'
            : 'bg-white/94 border-b border-gray-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl'
          : isDarkMode
            ? 'bg-[#0d1016]/80 border-b border-white/[0.04] backdrop-blur-md'
            : 'bg-white/85 border-b border-gray-100/90 shadow-2xs backdrop-blur-md'
          }`}
      >
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 h-16 flex items-center justify-between gap-2 sm:gap-4">

          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center space-x-3 sm:space-x-5 lg:space-x-7">
            {/* Brand Logo with 3D Monogram Cube */}
            <button
              type="button"
              onClick={() => handleSelectNavCategory('All')}
              className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3838]/70 rounded-xl p-1"
              aria-label="PSD Marketplace - Home"
            >
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ease-out">
                {/* Dark Mode: White Logo */}
                <img
                  src="/logo-white.png"
                  alt="PSD Logo"
                  className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                />
                {/* Light Mode: Black Logo */}
                <img
                  src="/logo.png"
                  alt="PSD Logo"
                  className={`w-full h-full object-contain absolute inset-0 transition-opacity duration-300 ${isDarkMode ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                />
              </div>
              <div className="flex items-center">
                <span
                  className={`font-black text-lg sm:text-xl tracking-tight flex items-center gap-0.5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-gray-950'
                    }`}
                >
                  PSD
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (Polished category links with icons & active glow) */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {PRIMARY_NAV_ITEMS.map((item) => {
                const isActive = activeCategory === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNavCategory(item.id)}
                    className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${isActive
                      ? isDarkMode
                        ? 'bg-red-500/15 text-[#ff4757] border border-red-500/30 shadow-[0_0_15px_rgba(255,71,87,0.25)]'
                        : 'bg-red-50 text-[#ff3838] border border-red-200 font-bold shadow-xs'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                        : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100/80'
                      }`}
                  >
                    <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'scale-110 text-[#ff4757]' : 'opacity-70'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff3838] animate-pulse ml-0.5" />
                    )}
                  </button>
                );
              })}

              {/* More Categories Dropdown Menu */}
              <div className="relative" ref={moreMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowMoreMenu(!showMoreMenu)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${isMoreCategoryActive
                    ? isDarkMode
                      ? 'bg-red-500/15 text-[#ff4757] border border-red-500/30'
                      : 'bg-red-50 text-[#ff3838] border border-red-200 font-bold'
                    : isDarkMode
                      ? 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                      : 'text-gray-600 hover:text-gray-950 hover:bg-gray-100/80'
                    }`}
                  aria-expanded={showMoreMenu}
                  aria-haspopup="true"
                >
                  <span>{activeMoreCategory ? activeMoreCategory.label : 'Explore'}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${showMoreMenu ? 'rotate-180 text-[#ff4757]' : 'opacity-70'
                      }`}
                  />
                </button>

                {showMoreMenu && (
                  <div
                    className={`absolute left-0 mt-2 w-56 rounded-2xl py-2 z-50 shadow-2xl border animate-navbar-dropdown ${isDarkMode
                      ? 'bg-[#151922] border-white/10 text-white shadow-black/80'
                      : 'bg-white border-gray-200 text-gray-800 shadow-xl'
                      }`}
                  >
                    <div
                      className={`px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-400'
                        }`}
                    >
                      More Categories
                    </div>

                    {MORE_CATEGORIES.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeCategory === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectNavCategory(item.id)}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer ${isActive
                            ? isDarkMode
                              ? 'bg-red-500/15 text-[#ff5252] font-bold'
                              : 'bg-red-50 text-[#ff3838] font-bold'
                            : isDarkMode
                              ? 'text-slate-200 hover:bg-white/5'
                              : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#ff4747]" />
                            <span>{item.label}</span>
                          </span>
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${item.tag === 'Hot'
                              ? 'bg-red-500/20 text-[#ff4757]'
                              : item.tag === 'Popular'
                                ? 'bg-amber-500/20 text-amber-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                              }`}
                          >
                            {item.tag}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 lg:space-x-3 shrink-0">
            {/* Theme Toggle (Night / Light Mode) */}
            <div className="shrink-0">
              <ThemeToggle size="sm" showLabel={false} />
            </div>

            {/* Region / Currency Switcher: KH or USD */}
            <div className="relative shrink-0" ref={langMenuRef}>
              <button
                type="button"
                onClick={() => setShowLangMenu(!showLangMenu)}
                className={`group flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${isDarkMode
                  ? 'bg-[#151922] border border-white/10 text-slate-300 hover:text-white hover:border-white/20 hover:bg-[#1a202c]'
                  : 'bg-[#f4f5f7] border border-gray-200/80 text-[#606773] hover:text-gray-900 hover:bg-[#ebeef2]'
                  }`}
                title={`Currency: ${currency === 'KHR' ? 'Cambodia (KH / ៛)' : 'United States (USD / $)'} - Click to switch`}
                aria-label={`Select Region / Currency - Current: ${currency === 'KHR' ? 'KH' : 'USD'}`}
                aria-expanded={showLangMenu}
              >
                {currency === 'KHR' ? (
                  /* Cambodia Flag */
                  <svg
                    viewBox="0 0 32 32"
                    className="w-4.5 h-4.5 rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-black/10"
                    aria-hidden="true"
                  >
                    <rect width="32" height="32" fill="#032ea6" />
                    <rect y="8" width="32" height="16" fill="#e11927" />
                    <g fill="#ffffff">
                      <rect x="7" y="19.5" width="18" height="1.6" rx="0.3" />
                      <rect x="8.5" y="18" width="15" height="1.4" rx="0.3" />
                      <rect x="9.8" y="16.5" width="12.4" height="1.4" />
                      <path d="M16 8.8 L18 13 H14 Z" />
                      <rect x="14.5" y="13" width="3" height="3.8" />
                      <path d="M11.8 11 L13.3 14.2 H10.3 Z" />
                      <rect x="10.8" y="14.2" width="2.4" height="2.5" />
                      <path d="M20.2 11 L21.7 14.2 H18.7 Z" />
                      <rect x="18.8" y="14.2" width="2.4" height="2.5" />
                    </g>
                  </svg>
                ) : (
                  /* USA Flag */
                  <svg
                    viewBox="0 0 32 32"
                    className="w-4.5 h-4.5 rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-black/10"
                    aria-hidden="true"
                  >
                    <rect width="32" height="32" fill="#b22234" />
                    <path
                      d="M0 2.46h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0z"
                      fill="#ffffff"
                    />
                    <rect width="14" height="17.2" fill="#3c3b6e" />
                    <g fill="#ffffff">
                      <circle cx="3.5" cy="3.5" r="0.9" />
                      <circle cx="7" cy="3.5" r="0.9" />
                      <circle cx="10.5" cy="3.5" r="0.9" />
                      <circle cx="5.25" cy="6.2" r="0.9" />
                      <circle cx="8.75" cy="6.2" r="0.9" />
                      <circle cx="3.5" cy="8.9" r="0.9" />
                      <circle cx="7" cy="8.9" r="0.9" />
                      <circle cx="10.5" cy="8.9" r="0.9" />
                      <circle cx="5.25" cy="11.6" r="0.9" />
                      <circle cx="8.75" cy="11.6" r="0.9" />
                      <circle cx="3.5" cy="14.3" r="0.9" />
                      <circle cx="7" cy="14.3" r="0.9" />
                      <circle cx="10.5" cy="14.3" r="0.9" />
                    </g>
                  </svg>
                )}
                <span className="font-semibold text-xs sm:text-[13px] tracking-tight">
                  {currency === 'KHR' ? 'KH' : 'USD'}
                </span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${showLangMenu ? 'rotate-180 text-[#ff4757]' : 'opacity-60'
                    }`}
                />
              </button>

              {/* Currency Dropdown Menu with Smooth Entrance */}
              {showLangMenu && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-2xl py-2 z-50 shadow-2xl border animate-navbar-dropdown ${isDarkMode
                    ? 'bg-[#151922] border-white/10 text-white shadow-black/80'
                    : 'bg-white border-gray-200 text-gray-800 shadow-xl'
                    }`}
                >
                  <div
                    className={`px-3.5 py-1 text-[10px] uppercase font-bold tracking-wider ${isDarkMode ? 'text-slate-400' : 'text-gray-400'
                      }`}
                  >
                    Select Currency
                  </div>

                  {/* Option: KH */}
                  <button
                    type="button"
                    onClick={() => {
                      onCurrencyChange('KHR');
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer ${currency === 'KHR'
                      ? isDarkMode
                        ? 'bg-red-500/15 text-[#ff5252] font-bold'
                        : 'bg-red-50 text-[#ff3838] font-bold'
                      : isDarkMode
                        ? 'text-slate-200 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <svg viewBox="0 0 32 32" className="w-4.5 h-4.5 rounded-full overflow-hidden shrink-0 shadow-2xs">
                        <rect width="32" height="32" fill="#032ea6" />
                        <rect y="8" width="32" height="16" fill="#e11927" />
                        <g fill="#ffffff">
                          <rect x="7" y="19.5" width="18" height="1.6" rx="0.3" />
                          <rect x="8.5" y="18" width="15" height="1.4" rx="0.3" />
                          <rect x="9.8" y="16.5" width="12.4" height="1.4" />
                          <path d="M16 8.8 L18 13 H14 Z" />
                          <rect x="14.5" y="13" width="3" height="3.8" />
                          <path d="M11.8 11 L13.3 14.2 H10.3 Z" />
                          <rect x="10.8" y="14.2" width="2.4" height="2.5" />
                          <path d="M20.2 11 L21.7 14.2 H18.7 Z" />
                          <rect x="18.8" y="14.2" width="2.4" height="2.5" />
                        </g>
                      </svg>
                      <span>KH - Khmer Riel (៛)</span>
                    </span>
                    {currency === 'KHR' && <Check className="w-4 h-4 text-[#ff3838]" />}
                  </button>

                  {/* Option: USD */}
                  <button
                    type="button"
                    onClick={() => {
                      onCurrencyChange('USD');
                      setShowLangMenu(false);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs transition-colors cursor-pointer ${currency === 'USD'
                      ? isDarkMode
                        ? 'bg-red-500/15 text-[#ff5252] font-bold'
                        : 'bg-red-50 text-[#ff3838] font-bold'
                      : isDarkMode
                        ? 'text-slate-200 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <svg viewBox="0 0 32 32" className="w-4.5 h-4.5 rounded-full overflow-hidden shrink-0 shadow-2xs">
                        <rect width="32" height="32" fill="#b22234" />
                        <path
                          d="M0 2.46h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0zm0 4.92h32v2.46H0z"
                          fill="#ffffff"
                        />
                        <rect width="14" height="17.2" fill="#3c3b6e" />
                        <g fill="#ffffff">
                          <circle cx="3.5" cy="3.5" r="0.9" />
                          <circle cx="7" cy="3.5" r="0.9" />
                          <circle cx="10.5" cy="3.5" r="0.9" />
                          <circle cx="5.25" cy="6.2" r="0.9" />
                          <circle cx="8.75" cy="6.2" r="0.9" />
                          <circle cx="3.5" cy="8.9" r="0.9" />
                          <circle cx="7" cy="8.9" r="0.9" />
                          <circle cx="10.5" cy="8.9" r="0.9" />
                          <circle cx="5.25" cy="11.6" r="0.9" />
                          <circle cx="8.75" cy="11.6" r="0.9" />
                          <circle cx="3.5" cy="14.3" r="0.9" />
                          <circle cx="7" cy="14.3" r="0.9" />
                          <circle cx="10.5" cy="14.3" r="0.9" />
                        </g>
                      </svg>
                      <span>USD - US Dollar ($)</span>
                    </span>
                    {currency === 'USD' && <Check className="w-4 h-4 text-[#ff3838]" />}
                  </button>

                  <div
                    className={`mt-2 pt-2 px-3 border-t text-[10px] flex items-center justify-between ${isDarkMode ? 'border-white/5 text-slate-400' : 'border-gray-100 text-gray-500'
                      }`}
                  >
                    <span>Rate: 1 USD ≈ 4,100 ៛</span>
                    <span className="text-[#ff4757] font-semibold">Live update</span>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Icon Button with Interactive Bounce Badge */}
            <button
              type="button"
              onClick={onOpenCart}
              className={`relative p-2 sm:p-2.5 rounded-full transition-all duration-200 cursor-pointer group ${isDarkMode
                ? 'bg-[#151922] border border-white/10 text-slate-300 hover:text-white hover:border-white/25 hover:bg-[#1a202c]'
                : 'bg-[#f4f5f7] border border-gray-200/80 text-gray-700 hover:text-black hover:bg-[#ebeef2]'
                }`}
              title={`Cart (${cartCount} items)`}
              aria-label={`View Shopping Cart containing ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#ff3838] text-white text-[9px] font-black flex items-center justify-center shadow-md shadow-red-500/40 ${isCartBumping ? 'animate-badge-bump' : ''
                    }`}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Become a Seller Button (Desktop Only) */}
            <button
              type="button"
              onClick={onOpenSellerModal}
              className={`hidden xl:flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all duration-200 shrink-0 cursor-pointer ${isDarkMode
                ? 'border-white/[0.08] text-slate-300 hover:text-white hover:border-white/20 hover:bg-white/[0.04]'
                : 'border-gray-200 text-gray-700 hover:text-black hover:border-gray-300 hover:bg-gray-50'
                }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Become a seller</span>
            </button>

            {/* Red Pill Login / Signup Button */}
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="neu-pill-red px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide flex items-center space-x-1.5 sm:space-x-2 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 shrink-0 cursor-pointer"
            >
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
              <span>
                Login<span className="hidden sm:inline"> / signup</span>
              </span>
            </button>

            {/* Mobile / Tablet Hamburger Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-200 cursor-pointer ${isDarkMode
                ? 'neu-flat-sm text-slate-300 hover:text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:text-black shadow-xs'
                }`}
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 transition-transform duration-200 rotate-90" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 6. Dynamic Reading Scroll Progress Bar across the bottom border of header */}
        <div className="w-full h-[2px] bg-transparent overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#ff3838] via-[#ff6b81] to-[#ffa502] transition-all duration-100 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* 7. Mobile / Tablet Drawer Menu Panel with Backdrop Blur & Smooth Animation */}
        {isMobileMenuOpen && (
          <div
            className={`lg:hidden border-t px-4 py-5 space-y-4 max-h-[calc(100vh-4.25rem)] overflow-y-auto animate-drawer-down transition-colors ${isDarkMode
              ? 'bg-[#0d1016]/98 border-white/[0.08] text-white shadow-2xl backdrop-blur-2xl'
              : 'bg-white/98 border-gray-200 text-gray-900 shadow-2xl backdrop-blur-2xl'
              }`}
          >
            {/* Quick Search in Mobile Menu */}
            <div className="pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  triggerSearchFocus();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium border transition-colors ${isDarkMode
                  ? 'bg-[#151922] border-white/10 text-slate-300'
                  : 'bg-gray-100 border-gray-200 text-gray-600'
                  }`}
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#ff4747]" />
                  <span>Search pages, accounts & templates...</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>

            {/* Section: Primary Categories */}
            <div className="space-y-1">
              <div
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'
                  }`}
              >
                Marketplace Categories
              </div>

              {PRIMARY_NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNavCategory(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                      ? isDarkMode
                        ? 'neu-pressed text-[#ff4757]'
                        : 'bg-red-50 text-[#ff3838] font-bold border border-red-200 shadow-xs'
                      : isDarkMode
                        ? 'text-slate-200 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-[#ff4747]" />
                      <span>{item.label}</span>
                    </span>
                    {isActive && <Check className="w-4 h-4 text-[#ff3838]" />}
                  </button>
                );
              })}
            </div>

            {/* Section: Secondary Categories */}
            <div className="space-y-1 pt-2 border-t border-white/[0.06]">
              <div
                className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'
                  }`}
              >
                More Specialized Assets
              </div>

              {MORE_CATEGORIES.map((item) => {
                const Icon = item.icon;
                const isActive = activeCategory === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNavCategory(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${isActive
                      ? isDarkMode
                        ? 'neu-pressed text-[#ff4757]'
                        : 'bg-red-50 text-[#ff3838] font-bold border border-red-200 shadow-xs'
                      : isDarkMode
                        ? 'text-slate-200 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 opacity-75" />
                      <span>{item.label}</span>
                    </span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${item.tag === 'Hot'
                        ? 'bg-red-500/20 text-[#ff4757]'
                        : item.tag === 'Popular'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                        }`}
                    >
                      {item.tag}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions in Mobile Menu */}
            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCart();
                }}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${isDarkMode
                  ? 'neu-flat-interactive text-white border border-white/10'
                  : 'bg-white border border-gray-200 text-gray-900 shadow-xs'
                  }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#ff4747]" />
                <span>View Shopping Cart ({cartCount})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenSellerModal();
                }}
                className={`w-full flex items-center justify-center space-x-2 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${isDarkMode
                  ? 'neu-flat-interactive text-white border border-white/10'
                  : 'bg-white border border-gray-200 text-gray-900 shadow-xs'
                  }`}
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Become a Verified Seller</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to maintain exact page layout flow when header is fixed */}
      <div className="h-16 w-full shrink-0 pointer-events-none" aria-hidden="true" />
    </>
  );
};
