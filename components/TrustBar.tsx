import React from 'react';
import { ShieldCheck, Zap, Star, Headphones } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const TrustBar: React.FC = () => {
  const { isDarkMode } = useTheme();

  const trustItems = [
    {
      icon: ShieldCheck,
      title: 'GamerProtect',
      subtitle: 'Every Transaction Covered',
      badge: 'Escrow Secured',
      color: 'text-emerald-500',
      lightBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: Zap,
      title: 'Instant Delivery',
      subtitle: '80% of orders under 5 min',
      badge: 'Automated Key/File',
      color: 'text-amber-500',
      lightBg: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      icon: Star,
      title: '4.7 / 5 Rating',
      subtitle: 'From 2M+ verified reviews',
      badge: 'Top Rated',
      color: 'text-yellow-500',
      lightBg: 'bg-yellow-50 text-yellow-600 border-yellow-100',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      subtitle: 'Ready to Help You Anytime',
      badge: '< 30s Response',
      color: 'text-sky-500',
      lightBg: 'bg-sky-50 text-sky-600 border-sky-100',
    },
  ];

  return (
    <div className={`w-full py-2.5 sm:py-3.5 transition-colors duration-300 border-y ${
      isDarkMode
        ? 'bg-[#0a0c10] border-white/[0.04] shadow-inner'
        : 'bg-white border-gray-100'
    }`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-4">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                className={`rounded-xl p-2.5 sm:p-3 flex items-center space-x-3 group cursor-default transition-all duration-200 ${
                  isDarkMode
                    ? 'neu-flat-interactive'
                    : 'bg-white border border-gray-100 shadow-2xs hover:shadow-xs'
                }`}
              >
                {/* Icon container */}
                <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200 ${
                  isDarkMode
                    ? 'neu-inset'
                    : `${item.lightBg} border shadow-2xs`
                }`}>
                  <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isDarkMode ? item.color : ''}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`text-xs sm:text-[13px] font-bold tracking-tight transition-colors truncate ${
                    isDarkMode
                      ? 'text-white group-hover:text-[#ff4747]'
                      : 'text-gray-900 group-hover:text-[#ff4747]'
                  }`}>
                    {item.title}
                  </h4>
                  <p className={`text-[10px] sm:text-[11px] truncate mt-0.5 font-normal ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
