import React, { useState, useRef, useEffect } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface FilterSortBarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortByChange: (sort: string) => void;
}

export const FilterSortBar: React.FC<FilterSortBarProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortByChange,
}) => {
  const { isDarkMode } = useTheme();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortDropdownRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'popular', label: 'Recommended' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label || 'Recommended';

  // Outside click listener for sort dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortDropdownRef.current && !sortDropdownRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 my-4 sm:my-5 select-none">
      
      {/* 1. Left: Search Input Box ("Type to filter") matching image */}
      <div className="flex-1 relative min-w-0">
        <div className={`relative w-full h-11 sm:h-12 rounded-2xl flex items-center px-3.5 sm:px-4 transition-all duration-200 border ${
          isDarkMode
            ? 'bg-[#121622] border-white/10 focus-within:border-white/25 focus-within:bg-[#151926] neu-inset'
            : 'bg-white border-gray-200/90 shadow-2xs focus-within:border-red-400 focus-within:ring-2 focus-within:ring-red-400/10'
        }`}>
          <Search className={`w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0 mr-2.5 transition-colors ${
            isDarkMode ? 'text-slate-400' : 'text-gray-400'
          }`} />
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Type to filter"
            className={`w-full bg-transparent text-xs sm:text-sm font-normal focus:outline-none tracking-wide ${
              isDarkMode
                ? 'text-white placeholder-slate-400'
                : 'text-gray-900 placeholder-gray-400'
            }`}
          />

          {/* Quick Clear Button when typing */}
          {searchQuery.trim() !== '' && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className={`p-1 rounded-full transition-colors shrink-0 ml-2 cursor-pointer ${
                isDarkMode ? 'text-slate-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
              }`}
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Right: "Sort by Recommended ⌄" matching image */}
      <div className="relative shrink-0 self-end sm:self-auto" ref={sortDropdownRef}>
        <button
          type="button"
          onClick={() => setIsSortOpen(!isSortOpen)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm transition-all duration-150 cursor-pointer ${
            isDarkMode
              ? 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
              : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100/70'
          }`}
          aria-haspopup="listbox"
          aria-expanded={isSortOpen}
        >
          <span className={`font-normal ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
            Sort by
          </span>
          <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
            {currentSortLabel}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5 transition-transform duration-200 ${
            isSortOpen ? 'rotate-180 text-[#ff4747]' : isDarkMode ? 'text-slate-400' : 'text-gray-500'
          }`} />
        </button>

        {/* Dropdown Menu */}
        {isSortOpen && (
          <div className={`absolute right-0 mt-1.5 w-48 sm:w-52 rounded-2xl py-1.5 z-40 shadow-2xl border transition-all animate-fadeIn ${
            isDarkMode
              ? 'bg-[#151924] border-white/10 text-white neu-flat'
              : 'bg-white border-gray-200 text-gray-900 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.15)]'
          }`}>
            <div className={`px-3 py-1 text-[10px] uppercase font-bold tracking-wider border-b ${
              isDarkMode ? 'text-slate-400 border-white/[0.05]' : 'text-gray-400 border-gray-100'
            }`}>
              Select Ordering
            </div>
            {sortOptions.map((option) => {
              const isSelected = option.value === sortBy;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSortByChange(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold transition-colors cursor-pointer ${
                    isSelected
                      ? isDarkMode
                        ? 'bg-red-500/15 text-[#ff5252] font-bold'
                        : 'bg-red-50 text-[#ff3838] font-bold'
                      : isDarkMode
                        ? 'text-slate-200 hover:bg-white/5 hover:text-white'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#ff3838]" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
