import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (cat: string) => void;
  sortBy?: string;
  onSortByChange?: (s: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onSelectCategory,
}) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-full">
      {/* Category Pills Row with Touch Momentum Scroll */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none max-w-full -mx-1 px-1 touch-pan-x overscroll-x-contain select-none">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                isActive
                  ? isDarkMode
                    ? 'neu-pressed text-[#ff4757] scale-95'
                    : 'bg-red-50 text-[#ff3838] border border-red-200 font-bold shadow-xs'
                  : isDarkMode
                    ? 'neu-flat-interactive text-slate-300 hover:text-white'
                    : 'bg-white border border-gray-200 text-gray-700 hover:text-black hover:bg-gray-50 shadow-xs'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
};
