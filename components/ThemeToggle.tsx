import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
  size?: 'sm' | 'md';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  showLabel = true,
  className = '',
  size = 'md',
}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isPressed, setIsPressed] = useState(false);

  const isSmall = size === 'sm';

  const handleClick = (e: React.MouseEvent) => {
    toggleTheme(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      toggleTheme({
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2,
      });
    }
  };

  // Exact dimensional geometry for pixel-perfect motion
  // sm: track 50px wide, 26px high, padding 3px -> knob 20px -> travel: 50 - 6 - 20 = 24px
  // md: track 60px wide, 32px high, padding 4px -> knob 24px -> travel: 60 - 8 - 24 = 28px
  const trackWidth = isSmall ? '50px' : '60px';
  const trackHeight = isSmall ? '26px' : '32px';
  const knobSize = isSmall ? '20px' : '24px';
  const knobTravel = isSmall ? 24 : 28;

  return (
    <div
      onClick={handleClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onKeyDown={handleKeyDown}
      className={`inline-flex items-center gap-2.5 cursor-pointer select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#ff3838]/60 focus-visible:ring-offset-2 rounded-full p-0.5 transition-all duration-300 ${className}`}
      title={isDarkMode ? 'Switch to Light mode' : 'Switch to Night mode'}
      role="button"
      tabIndex={0}
      aria-label={isDarkMode ? 'Switch to Light mode' : 'Switch to Night mode'}
    >
      {showLabel && (
        <span
          className={`text-xs font-semibold tracking-wide transition-colors duration-400 ${
            isDarkMode
              ? 'text-slate-300 group-hover:text-white'
              : 'text-slate-700 group-hover:text-slate-950'
          }`}
        >
          {isDarkMode ? 'Night mode' : 'Light mode'}
        </span>
      )}

      {/* Neumorphic Track Container with Ambient Day/Night Atmosphere */}
      <div
        style={{
          width: trackWidth,
          height: trackHeight,
        }}
        className={`relative flex items-center rounded-full transition-all duration-500 ease-out cursor-pointer p-[3px] md:p-[4px] ${
          isDarkMode
            ? 'bg-gradient-to-r from-[#0a0d14] via-[#0f1420] to-[#121726] border border-white/10 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.85),inset_-1px_-1px_3px_rgba(255,255,255,0.06)]'
            : 'bg-gradient-to-r from-[#d2dbeb] via-[#dce4f2] to-[#e6eef8] border border-black/[0.08] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.12),inset_-2px_-2px_4px_rgba(255,255,255,0.9)]'
        }`}
      >
        {/* Day Cue (Subtle Warm Sun Dot on Left) */}
        <div
          className={`absolute left-2 flex items-center justify-center pointer-events-none transition-all duration-500 ${
            isDarkMode ? 'opacity-30 scale-75' : 'opacity-0 scale-50'
          }`}
        >
          <Sun className="w-2.5 h-2.5 text-amber-400 stroke-[2.5]" />
        </div>

        {/* Night Cue (Subtle Cool Moon Dot on Right) */}
        <div
          className={`absolute right-2 flex items-center justify-center pointer-events-none transition-all duration-500 ${
            isDarkMode ? 'opacity-0 scale-50' : 'opacity-35 scale-75'
          }`}
        >
          <Moon className="w-2.5 h-2.5 text-indigo-400 stroke-[2.5]" />
        </div>

        {/* Tactile Gliding Knob with Kinetic Spring Physics & Morphing Icon */}
        <div
          style={{
            width: knobSize,
            height: knobSize,
            transform: isDarkMode
              ? `translateX(${knobTravel}px) ${isPressed ? 'scale(1.08, 0.92)' : 'scale(1)'}`
              : `translateX(0px) ${isPressed ? 'scale(1.08, 0.92)' : 'scale(1)'}`,
            transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), background 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
          }}
          className={`rounded-full flex items-center justify-center relative shrink-0 z-10 ${
            isDarkMode
              ? 'bg-gradient-to-tr from-[#e01e37] via-[#ff3838] to-[#ff6b81] border border-white/40 shadow-[0_2px_8px_rgba(255,46,68,0.7),0_0_14px_rgba(255,56,56,0.5),0_1px_3px_rgba(0,0,0,0.5)]'
              : 'bg-gradient-to-tr from-[#f59e0b] via-[#fbbf24] to-[#fef08a] border border-white/80 shadow-[0_2px_8px_rgba(245,158,11,0.65),0_0_12px_rgba(251,191,36,0.45),0_1px_2px_rgba(0,0,0,0.15)]'
          }`}
        >
          {/* Sun Icon (rotates away & collapses when going dark) */}
          <Sun
            style={{
              transform: isDarkMode ? 'rotate(140deg) scale(0.2)' : 'rotate(0deg) scale(1)',
              opacity: isDarkMode ? 0 : 1,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.35s ease',
            }}
            className={`absolute pointer-events-none ${
              isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'
            } text-amber-950 stroke-[2.8] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]`}
            aria-hidden="true"
          />

          {/* Moon Icon (rotates in & expands when going dark) */}
          <Moon
            style={{
              transform: isDarkMode ? 'rotate(0deg) scale(1)' : 'rotate(-140deg) scale(0.2)',
              opacity: isDarkMode ? 1 : 0,
              transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.35s ease',
            }}
            className={`absolute pointer-events-none ${
              isSmall ? 'w-3 h-3' : 'w-3.5 h-3.5'
            } text-white stroke-[2.4] fill-white/40 drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]`}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
