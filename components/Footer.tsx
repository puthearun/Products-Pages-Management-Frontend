import React, { useState } from 'react';
import {
  ShieldCheck,
  Users,
  Headphones,
  ArrowRight,
  HelpCircle,
  X as CloseIcon,
  CheckCircle2,
  Lock,
  MessageCircle,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FooterProps {
  onSelectCategory?: (category: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { isDarkMode } = useTheme();
  const [isLearnMoreOpen, setIsLearnMoreOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Payment methods list matching the exact reference image
  const paymentMethods = [
    {
      name: 'JCB',
      badge: (
        <svg viewBox="0 0 36 24" className="h-5 w-auto" fill="none">
          <rect x="1" y="2" width="10" height="20" rx="3" fill="#003B75" />
          <rect x="13" y="2" width="10" height="20" rx="3" fill="#D81E05" />
          <rect x="25" y="2" width="10" height="20" rx="3" fill="#007D34" />
          <text x="6" y="16" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">J</text>
          <text x="18" y="16" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">C</text>
          <text x="30" y="16" fill="#ffffff" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">B</text>
        </svg>
      ),
    },
    {
      name: 'American Express',
      badge: (
        <svg viewBox="0 0 38 24" className="h-5 w-auto">
          <rect width="38" height="24" rx="3" fill="#006FCF" />
          <text x="19" y="10.5" fill="#ffffff" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">AMERICAN</text>
          <text x="19" y="17.5" fill="#ffffff" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">EXPRESS</text>
        </svg>
      ),
    },
    {
      name: 'NETELLER',
      badge: (
        <span className="text-[#81BE00] font-black italic tracking-tighter text-xs font-sans">
          NETELLER
        </span>
      ),
    },
    {
      name: 'Rapid Transfer',
      badge: (
        <span className={`font-black italic text-xs tracking-tight font-sans flex items-center ${
          isDarkMode ? 'text-white' : 'text-gray-950'
        }`}>
          RAPID<span className="text-[#00A859] font-bold text-[8px] ml-0.5 not-italic">transfer</span>
        </span>
      ),
    },
    {
      name: 'Skrill',
      badge: (
        <div className="flex flex-col items-center leading-none">
          <span className="text-[#811E68] font-black text-xs tracking-tight font-sans">Skrill</span>
          <span className={`text-[6px] font-semibold tracking-tighter -mt-0.5 ${
            isDarkMode ? 'text-slate-400' : 'text-gray-600'
          }`}>
            moneybookers
          </span>
        </div>
      ),
    },
    {
      name: 'PayPal',
      badge: (
        <div className="flex items-center gap-0.5 font-bold">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0">
            <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.808 1.614 1.127.98 1.636 2.378 1.513 4.156-.25 3.633-2.52 5.86-6.046 5.86h-2.14l-1.48 9.387a.64.64 0 0 1-.633.52H7.076z" fill="#003087"/>
            <path d="M8.71 13.064l1.32-8.384a.64.64 0 0 1 .633-.52h5.112c2.14 0 3.737.452 4.743 1.344.92.817 1.336 1.98 1.235 3.46-.208 3.028-2.1 4.883-5.038 4.883H14.1l-1.09 6.906a.64.64 0 0 1-.632.52H8.71a.64.64 0 0 1-.633-.74l.633-4.01z" fill="#0079C1"/>
          </svg>
          <span className="text-[11px] font-black italic tracking-tighter font-sans">
            <span className="text-[#003087]">Pay</span><span className="text-[#0079C1]">Pal</span>
          </span>
        </div>
      ),
    },
    {
      name: 'Mastercard',
      badge: (
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 32 20" className="w-6 h-3.5">
            <circle cx="11" cy="10" r="9" fill="#EB001B" />
            <circle cx="21" cy="10" r="9" fill="#F79E1B" fillOpacity="0.9" />
          </svg>
          <span className={`text-[6.5px] font-bold -mt-0.5 tracking-tighter font-sans ${
            isDarkMode ? 'text-slate-300' : 'text-gray-900'
          }`}>
            mastercard
          </span>
        </div>
      ),
    },
    {
      name: 'CVS',
      badge: (
        <svg viewBox="0 0 38 24" className="h-5 w-auto">
          <rect width="38" height="24" rx="3" fill="#CC0000" />
          <path d="M10 8.5c-.8-1-2.2-1-3 0s-.8 2.2 0 3.2l3 3.3 3-3.3c.8-1 .8-2.2 0-3.2s-2.2-1-3 0z" fill="#ffffff" />
          <text x="24" y="16.5" fill="#ffffff" fontSize="9" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.5">CVS</text>
        </svg>
      ),
    },
    {
      name: 'Dollar General',
      badge: (
        <svg viewBox="0 0 38 24" className="h-5 w-auto">
          <rect width="38" height="24" rx="3" fill="#FFDD00" />
          <text x="19" y="10.5" fill="#000000" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">DOLLAR</text>
          <text x="19" y="17.5" fill="#000000" fontSize="5.5" fontWeight="900" textAnchor="middle" fontFamily="sans-serif" letterSpacing="0.2">GENERAL</text>
        </svg>
      ),
    },
    {
      name: 'Apple Pay',
      badge: (
        <div className={`px-2 py-0.5 rounded flex items-center gap-1 font-bold text-[9.5px] border ${
          isDarkMode ? 'border-white/30 text-white' : 'border-black text-black'
        }`}>
          <svg viewBox="0 0 170 170" className="w-2.5 h-2.5 fill-current">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.83-11.7-14.35-6.08-9.67-10.85-20.64-14.3-32.9-3.46-12.27-5.19-24.12-5.19-35.56 0-14.79 3.59-26.69 10.78-35.68 7.18-8.99 16.3-13.57 27.34-13.73 4.8 0 10.11 1.24 15.93 3.73 5.82 2.49 9.53 3.78 11.13 3.89 1.82 0 5.83-1.4 12.03-4.19 6.21-2.79 11.53-4.04 15.98-3.77 12.24.63 21.96 4.85 29.17 12.65-10.68 6.47-15.89 15.47-15.63 27 0 9.87 3.82 18.06 11.45 24.58 3.59 3.08 7.82 5.4 12.68 6.96-2.4 7.24-5.34 14.34-8.82 21.3zM119.22 33.15c0-7.23 2.65-13.88 7.95-19.95 5.3-6.07 11.83-9.87 19.6-11.41.25 1.54.38 3.09.38 4.65 0 7.18-2.75 13.99-8.25 20.44-5.5 6.45-12.06 10.15-19.68 11.09-.27-1.57-.4-3.11-.4-4.82z" />
          </svg>
          <span className="font-semibold tracking-tight">Pay</span>
        </div>
      ),
    },
    {
      name: 'Visa',
      badge: (
        <span className="font-black italic text-[#1A1F71] text-xs sm:text-sm tracking-wider font-sans">
          VISA
        </span>
      ),
    },
    {
      name: 'Google Pay',
      badge: (
        <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full border ${
          isDarkMode ? 'border-white/20 text-white' : 'border-gray-300 text-gray-900'
        }`}>
          <svg viewBox="0 0 24 24" className="w-3 h-3 shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
          </svg>
          <span className="text-[9.5px] font-bold font-sans">Pay</span>
        </div>
      ),
    },
    {
      name: 'Bitcoin',
      badge: (
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
          <circle cx="12" cy="12" r="11" fill="#F7931A" />
          <text x="12" y="16.5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₿</text>
        </svg>
      ),
    },
    {
      name: 'Ethereum',
      badge: (
        <svg viewBox="0 0 32 32" className="w-4.5 h-4.5">
          <path d="M16 3l-8 13.5 8 4.5 8-4.5L16 3z" fill="#8A92B2"/>
          <path d="M16 3v18l8-4.5L16 3z" fill="#627EEA"/>
          <path d="M16 22.5l-8-4.5L16 29l8-11-8 4.5z" fill="#8A92B2"/>
          <path d="M16 22.5V29l8-11-8 4.5z" fill="#627EEA"/>
        </svg>
      ),
    },
    {
      name: 'Tether',
      badge: (
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
          <circle cx="12" cy="12" r="11" fill="#26A17B" />
          <text x="12" y="16.5" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">₮</text>
        </svg>
      ),
    },
    {
      name: 'Pay Later',
      badge: (
        <svg viewBox="0 0 46 22" className="h-5 w-auto">
          <rect width="46" height="22" rx="3" fill="#FFC439" />
          <text x="7" y="15.5" fill="#003087" fontSize="11" fontWeight="900" fontStyle="italic" fontFamily="sans-serif">P</text>
          <text x="26" y="14.5" fill="#003087" fontSize="7" fontWeight="800" textAnchor="middle" fontFamily="sans-serif" letterSpacing="-0.2">Pay Later</text>
        </svg>
      ),
    },
    {
      name: 'USDC',
      badge: (
        <svg viewBox="0 0 24 24" className="w-5.5 h-5.5">
          <circle cx="12" cy="12" r="10" fill="none" stroke="#2775CA" strokeWidth="2" />
          <text x="12" y="16.5" fill="#2775CA" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">$</text>
        </svg>
      ),
    },
  ];

  return (
    <footer className={`w-full mt-10 sm:mt-14 relative overflow-hidden border-t transition-colors duration-500 ${isDarkMode ? 'bg-[#080a0f] text-slate-400 border-white/[0.05]' : 'bg-gray-50/70 text-gray-600 border-gray-200'
      }`}>
      {/* =========================================================================
          SECTION 1: TRADE SECURELY WITH PSD PROTECT (FULL SIZE LIKE REFERENCE IMAGE)
          ========================================================================= */}
      <div className={`w-full relative overflow-hidden border-b transition-colors ${
        isDarkMode ? 'bg-[#080a0f] border-white/[0.06]' : 'bg-white border-gray-200'
      }`}>
        {/* 3D Tech Workstation Background (Preserved Project Image) */}
        <div
          className="absolute inset-0 bg-cover bg-right md:bg-[center_right_-20px] lg:bg-center"
          style={{
            backgroundImage: 'url(/psd-protect-banner.jpg)',
          }}
        />

        {/* Seamless Gradient Overlay to ensure text readability */}
        <div className={`absolute inset-0 ${isDarkMode
          ? 'bg-gradient-to-r from-[#080a0f] via-[#080a0f]/95 via-50% to-[#080a0f]/75 md:to-transparent'
          : 'bg-gradient-to-r from-white via-white/95 via-50% to-white/75 md:to-transparent'
          }`} />
        <div className={`absolute inset-0 md:hidden ${isDarkMode ? 'bg-[#080a0f]/92' : 'bg-white/94'} backdrop-blur-xs`} />

        {/* Content Container - Full Size / Spacious layout */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 py-10 sm:py-14 space-y-6 sm:space-y-8 w-full min-h-[360px] sm:min-h-[420px] flex flex-col justify-center">
          {/* Big Bold Headline */}
          <div className="space-y-1">
            <h2 className={`text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] transition-colors ${isDarkMode ? 'text-white' : 'text-gray-950'
              }`}>
              Trade Securely with <br />
              <span className="text-[#ff4757]">PSD Protect</span>
            </h2>
          </div>

          {/* 3 Rounded Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 max-w-3xl pt-1">
            {/* Card 1: Dual Security */}
            <div className={`rounded-2xl p-3.5 sm:p-4 md:p-5 border transition-all duration-300 group ${isDarkMode
              ? 'bg-[#131720]/80 backdrop-blur-md border-white/[0.06] neu-flat-sm hover:border-[#ff4757]/30'
              : 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm hover:shadow-md hover:border-[#ff4757]/40'
              }`}>
              <div className="flex items-center md:items-start md:flex-col gap-3.5 md:gap-0">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3 text-[#ff4757] group-hover:scale-105 transition-transform ${isDarkMode ? 'neu-inset border border-[#ff4757]/40' : 'bg-red-50 border border-red-200'
                  }`}>
                  <ShieldCheck className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm md:text-base font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    Dual Security
                  </h3>
                  <p className={`text-[11px] sm:text-xs mt-0.5 md:mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Escrow for buyers and seller protection.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Vetted Community */}
            <div className={`rounded-2xl p-3.5 sm:p-4 md:p-5 border transition-all duration-300 group ${isDarkMode
              ? 'bg-[#131720]/80 backdrop-blur-md border-white/[0.06] neu-flat-sm hover:border-[#ff4757]/30'
              : 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm hover:shadow-md hover:border-[#ff4757]/40'
              }`}>
              <div className="flex items-center md:items-start md:flex-col gap-3.5 md:gap-0">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3 text-[#ff4757] group-hover:scale-105 transition-transform ${isDarkMode ? 'neu-inset border border-[#ff4757]/40' : 'bg-red-50 border border-red-200'
                  }`}>
                  <Users className="w-4.5 h-4.5 sm:w-5 sm:h-5 md:w-5.5 md:h-5.5" />
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm md:text-base font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    Vetted Community
                  </h3>
                  <p className={`text-[11px] sm:text-xs mt-0.5 md:mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Monitored trades and verified sellers.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Trusted Support */}
            <div className={`rounded-2xl p-3.5 sm:p-4 md:p-5 border transition-all duration-300 group ${isDarkMode
              ? 'bg-[#131720]/80 backdrop-blur-md border-white/[0.06] neu-flat-sm hover:border-[#ff4757]/30'
              : 'bg-white/95 backdrop-blur-md border-gray-200 shadow-sm hover:shadow-md hover:border-[#ff4757]/40'
              }`}>
              <div className="flex items-center md:items-start md:flex-col gap-3.5 md:gap-0">
                <div className={`w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0 md:mb-3 text-[#ff4757] group-hover:scale-105 transition-transform ${isDarkMode ? 'neu-inset border border-[#ff4757]/40' : 'bg-red-50 border border-red-200'
                  }`}>
                  <Headphones className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6" />
                </div>
                <div>
                  <h3 className={`text-xs sm:text-sm md:text-base font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    Trusted Support
                  </h3>
                  <p className={`text-[11px] sm:text-xs mt-0.5 md:mt-1 leading-snug ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    24/7 global assistance and positive reviews.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Learn More Button */}
          <div className="pt-2">
            <button
              onClick={() => setIsLearnMoreOpen(true)}
              className="neu-pill-red px-7 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-bold text-white tracking-wider flex items-center space-x-2.5 transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(255,71,87,0.4)]"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: PAYMENT BADGES CAROUSEL / ROW (MATCHING REFERENCE IMAGE)
          ========================================================================= */}
      <div className={`w-full border-b py-3 sm:py-3.5 transition-colors ${
        isDarkMode ? 'bg-[#0a0c10] border-white/[0.04]' : 'bg-[#fafbfc] border-gray-200'
      }`}>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
          <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x overscroll-x-contain select-none">
            {paymentMethods.map((pm) => (
              <div
                key={pm.name}
                className={`min-w-[48px] sm:min-w-[52px] h-9 sm:h-9.5 px-2 rounded-xl border flex items-center justify-center shrink-0 transition-all duration-200 ${isDarkMode
                  ? 'bg-[#121620] border-white/[0.06] hover:border-white/20 hover:bg-[#161c28]'
                  : 'bg-white border-gray-200 shadow-2xs hover:border-gray-400 hover:shadow-xs'
                  }`}
                title={pm.name}
              >
                {pm.badge}
              </div>
            ))}

            {/* +200 more pill button matching reference image */}
            <button
              onClick={() => setIsHelpOpen(true)}
              className={`px-3.5 py-1.5 rounded-full border text-xs font-bold tracking-tight flex items-center space-x-1.5 shrink-0 transition-all group ml-1 ${
                isDarkMode
                  ? 'bg-[#121620] border-white/10 text-slate-200 hover:border-white/30 hover:text-white'
                  : 'bg-white border-gray-200 text-gray-800 shadow-2xs hover:border-gray-400 hover:text-black'
              }`}
            >
              <span>+200 more</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#ff4757] group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 3: BOTTOM FOOTER BAR (MATCHING REFERENCE IMAGE)
          ========================================================================= */}
      <div className={`border-t py-5 sm:py-6 text-xs transition-colors ${isDarkMode ? 'bg-[#0b0e14] border-white/[0.04] text-slate-400' : 'bg-white border-gray-200 text-gray-600'
        }`}>
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          {/* Left Column: Mission text & links row */}
          <div className="space-y-3 text-center lg:text-left w-full lg:w-auto">
            <p className={`text-[11px] sm:text-[12px] leading-relaxed max-w-2xl mx-auto lg:mx-0 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
              PSD is a comprehensive online marketplace for all things web pages, UI templates, and developer services. We are dedicated to innovating for the creator community's benefit.
            </p>

            <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1.5 sm:gap-y-2 text-[11px] ${isDarkMode ? 'text-slate-400' : 'text-gray-600'
              }`}>
              <span className={`font-semibold ${isDarkMode ? 'text-slate-300' : 'text-gray-900 font-bold'}`}>
                © 2026 PSD.com
              </span>
              <span className={isDarkMode ? 'text-slate-700' : 'text-gray-300'}>•</span>
              <a href="#marketplace" className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                About Us
              </a>
              <span className={isDarkMode ? 'text-slate-700' : 'text-gray-300'}>•</span>
              <button onClick={() => setIsLearnMoreOpen(true)} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                Terms of Service
              </button>
              <span className={isDarkMode ? 'text-slate-700' : 'text-gray-300'}>•</span>
              <button onClick={() => setIsLearnMoreOpen(true)} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                Legal
              </button>
              <span className={isDarkMode ? 'text-slate-700' : 'text-gray-300'}>•</span>
              <button onClick={() => setIsLearnMoreOpen(true)} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                Privacy Policy
              </button>
              <span className={isDarkMode ? 'text-slate-700' : 'text-gray-300'}>•</span>
              <button onClick={() => setIsHelpOpen(true)} className={`transition-colors ${isDarkMode ? 'hover:text-white' : 'hover:text-black'}`}>
                Help Center
              </button>
            </div>
          </div>

          {/* Right Column: Social Icons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2 sm:gap-2.5 shrink-0">
            {/* Discord */}
            <a
              href="https://discord.com"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-[#5865F2] hover:bg-[#5865F2]/10 shadow-xs'
                }`}
              title="Discord"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>

            {/* Telegram */}
            <a
              href="https://web.telegram.org/k/"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-[#229ED9]/50 hover:bg-[#229ED9]/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-[#229ED9] hover:bg-[#229ED9]/10 shadow-xs'
                }`}
              title="Telegram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l-.313 4.674c.46 0 .663-.211.921-.46l2.211-2.15 4.6 3.398c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.414z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-[#E1306C]/50 hover:bg-[#E1306C]/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-[#E1306C] hover:bg-[#E1306C]/10 shadow-xs'
                }`}
              title="Instagram"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-[#1877F2] hover:bg-[#1877F2]/10 shadow-xs'
                }`}
              title="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-[#0A66C2]/50 hover:bg-[#0A66C2]/10'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-[#0A66C2] hover:bg-[#0A66C2]/10 shadow-xs'
                }`}
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkMode
                ? 'neu-flat-interactive text-slate-400 hover:text-white hover:border-white/40'
                : 'bg-white border border-gray-200 text-gray-600 hover:text-black hover:border-gray-400 shadow-xs'
                }`}
              title="X (Twitter)"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 4: FLOATING QUICK SUPPORT BUTTON (MATCHING ORANGE BADGE IN IMAGE)
          ========================================================================= */}
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#e64a19] to-[#ff5722] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(230,74,25,0.6)] hover:scale-110 active:scale-95 transition-all duration-200 group"
        title="Need Help?"
      >
        <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {/* =========================================================================
          MODAL 1: LEARN MORE (PSD PROTECT DETAILS)
          ========================================================================= */}
      {isLearnMoreOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fadeIn transition-colors ${
          isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'
        }`}>
          <div className={`relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 border transition-all ${
            isDarkMode
              ? 'bg-[#131722] border-white/10 text-white neu-flat shadow-2xl'
              : 'bg-white border-gray-200/90 text-gray-900 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)]'
          }`}>
            <button
              onClick={() => setIsLearnMoreOpen(false)}
              className={`absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1a202e] border border-white/10 text-slate-400 hover:text-white'
                  : 'bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-950 hover:bg-gray-200'
              }`}
              title="Close"
              aria-label="Close modal"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center space-x-3.5 pr-8">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isDarkMode
                  ? 'neu-inset border border-[#ff4757]/40 text-[#ff4757]'
                  : 'bg-red-50 border border-red-200 text-[#ff3838] shadow-xs'
              }`}>
                <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-950'
                }`}>
                  PSD Protect Escrow Guarantee
                </h3>
                <p className={`text-xs mt-0.5 font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  100% Protection for Buyers & Verified Creators
                </p>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-3.5">
              <div className={`flex items-start space-x-3.5 p-3.5 rounded-2xl border transition-all ${
                isDarkMode
                  ? 'bg-[#171c28]/90 border-white/[0.06] shadow-inner'
                  : 'bg-gray-50/90 border-gray-200/80 shadow-2xs'
              }`}>
                <div className="p-2 rounded-xl bg-red-500/10 text-[#ff4757] shrink-0 mt-0.5">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-950'
                  }`}>
                    Full Escrow Hold
                  </h4>
                  <p className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    Your payment is held in escrow until you have downloaded, inspected, and verified the page template or service delivery.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-3.5 p-3.5 rounded-2xl border transition-all ${
                isDarkMode
                  ? 'bg-[#171c28]/90 border-white/[0.06] shadow-inner'
                  : 'bg-gray-50/90 border-gray-200/80 shadow-2xs'
              }`}>
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-950'
                  }`}>
                    Verified Sellers Only
                  </h4>
                  <p className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    All creators pass rigorous code audits, responsive QA testing, and identity verification before publishing on PSD.
                  </p>
                </div>
              </div>

              <div className={`flex items-start space-x-3.5 p-3.5 rounded-2xl border transition-all ${
                isDarkMode
                  ? 'bg-[#171c28]/90 border-white/[0.06] shadow-inner'
                  : 'bg-gray-50/90 border-gray-200/80 shadow-2xs'
              }`}>
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-500 shrink-0 mt-0.5">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-950'
                  }`}>
                    24/7 Dispute Resolution
                  </h4>
                  <p className={`text-[11px] sm:text-xs mt-1 leading-relaxed ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-600'
                  }`}>
                    Our dedicated mediation team assists in real-time. If a product does not match specifications, get a replacement or instant refund.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsLearnMoreOpen(false)}
                className="w-full py-3.5 rounded-2xl neu-pill-red font-bold text-xs text-white uppercase tracking-wider cursor-pointer shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Got It, Thank You
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL 2: 24/7 HELP & SUPPORT
          ========================================================================= */}
      {isHelpOpen && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fadeIn transition-colors ${
          isDarkMode ? 'bg-black/80' : 'bg-slate-900/40'
        }`}>
          <div className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 space-y-5 sm:space-y-6 border transition-all ${
            isDarkMode
              ? 'bg-[#131722] border-white/10 text-white neu-flat shadow-2xl'
              : 'bg-white border-gray-200/90 text-gray-900 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.18)]'
          }`}>
            <button
              onClick={() => setIsHelpOpen(false)}
              className={`absolute top-5 right-5 sm:top-6 sm:right-6 p-2 rounded-xl transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1a202e] border border-white/10 text-slate-400 hover:text-white'
                  : 'bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-950 hover:bg-gray-200'
              }`}
              title="Close"
              aria-label="Close modal"
            >
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex items-center space-x-3.5 pr-8">
              <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                isDarkMode
                  ? 'neu-inset border border-[#ff5722]/40 text-[#ff5722]'
                  : 'bg-orange-50 border border-orange-200 text-[#ff5722] shadow-xs'
              }`}>
                <HelpCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className={`text-lg sm:text-xl font-extrabold tracking-tight ${
                  isDarkMode ? 'text-white' : 'text-gray-950'
                }`}>
                  PSD Support Center
                </h3>
                <p className={`text-xs mt-0.5 font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  We're here to help 24 hours a day, 7 days a week
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:support@psd-market.com"
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all group ${
                  isDarkMode
                    ? 'bg-[#171c28]/90 border-white/[0.06] hover:border-white/20 hover:bg-[#1c2232]'
                    : 'bg-gray-50/90 border-gray-200/80 hover:border-gray-300 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 rounded-xl bg-red-500/10 text-[#ff4757]">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-950'
                    }`}>
                      Email Ticket
                    </div>
                    <div className={`text-[11px] mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      Average reply time &lt; 15 mins
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} />
              </a>

              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all group ${
                  isDarkMode
                    ? 'bg-[#171c28]/90 border-white/[0.06] hover:border-white/20 hover:bg-[#1c2232]'
                    : 'bg-gray-50/90 border-gray-200/80 hover:border-gray-300 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 rounded-xl bg-[#5865F2]/10 text-[#5865F2]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <div className={`text-xs sm:text-sm font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-950'
                    }`}>
                      Discord Community
                    </div>
                    <div className={`text-[11px] mt-0.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      Connect directly with creators and devs
                    </div>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-400'
                }`} />
              </a>
            </div>

            <button
              type="button"
              onClick={() => setIsHelpOpen(false)}
              className={`w-full py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1a202e] border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                  : 'bg-gray-100 border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-200'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
