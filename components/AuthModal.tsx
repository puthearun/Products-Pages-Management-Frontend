import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Key, User, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { isDarkMode } = useTheme();
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  // Sync mode whenever initialMode or isOpen changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setIsForgotPassword(false);
    }
  }, [isOpen, initialMode]);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Clear transient notifications after a timeout
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgotPassword) {
      setNotification(`Password recovery instructions sent to ${email || 'your email'}.`);
      setTimeout(() => {
        setIsForgotPassword(false);
      }, 2000);
      return;
    }

    if (mode === 'login') {
      alert(`Welcome back, ${email || 'Creator'}! Logged into PSD Pages Marketplace.`);
    } else {
      alert(`Welcome to PSD Pages, ${name || 'Creator'}! Your seller account has been activated.`);
    }
    onClose();
  };

  const handleSocialLogin = (provider: 'Facebook' | 'Google') => {
    setNotification(`Connecting with ${provider}...`);
    setTimeout(() => {
      alert(`Successfully authenticated via ${provider}! Welcome to PSD Pages.`);
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      {/* 1. Backdrop Studio Lighting & Frosted Scenery */}
      <div
        className="fixed inset-0 transition-opacity duration-500 cursor-pointer"
        onClick={onClose}
      >
        {/* Real 3D Studio Backdrop Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url('/auth-bg.jpg')` }}
        />

        {/* Ambient Gradient Overlay & Frosted Glass Blur */}
        <div
          className={`absolute inset-0 transition-colors duration-500 backdrop-blur-md ${isDarkMode
            ? 'bg-[#090b10]/88'
            : 'bg-[#ede5dc]/65'
            }`}
        />

        {/* Dynamic Warm Ambient Radial Glow Spheres */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-tr from-amber-400/25 via-orange-500/20 to-rose-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-orange-400/20 via-amber-300/15 to-transparent blur-3xl pointer-events-none" />
      </div>

      {/* 2. Modal Content Container */}
      <div className="relative z-10 w-full max-w-4xl mx-auto my-auto flex flex-col md:flex-row items-stretch justify-center gap-5 sm:gap-6">

        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close authentication modal"
          className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-30 w-9 h-9 rounded-full bg-white/80 dark:bg-[#161a22]/90 text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white shadow-lg border border-black/5 dark:border-white/10 flex items-center justify-center backdrop-blur-md hover:scale-110 active:scale-95 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Notification Toast */}
        {notification && (
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 px-4 py-2 rounded-full bg-neutral-900/90 dark:bg-white/90 text-white dark:text-neutral-900 text-xs font-medium shadow-xl backdrop-blur-md animate-fadeIn flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
            <span>{notification}</span>
          </div>
        )}

        {/* ==========================================================
            LEFT COLUMN: THE AUTH CARD + "NEW IN" FLOATING MINI-CARD
            ========================================================== */}
        <div className="w-full md:w-[410px] lg:w-[440px] flex flex-col gap-4 sm:gap-5">

          {/* Main Auth Form Card */}
          <div className="auth-card-glass rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300">

            {/* Top Bar: Brand & Mode Switcher */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 relative flex items-center justify-center">
                  <img
                    src="/logo-white.png"
                    alt="PSD Logo"
                    className="w-full h-full object-contain dark:block hidden"
                  />
                  <img
                    src="/logo.png"
                    alt="PSD Logo"
                    className="w-full h-full object-contain dark:hidden block"
                  />
                </div>
                <span className="text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-200">
                  PSD
                </span>
              </div>

              {/* Mode Switcher */}
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setMode(mode === 'login' ? 'signup' : 'login');
                }}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors cursor-pointer"
              >
                {mode === 'login' ? 'Sign up' : 'Log in'}
              </button>
            </div>

            {/* Title & Social Row */}
            <div className="flex items-center justify-between mt-6 mb-5 sm:mb-6">
              <h2
                id="auth-modal-title"
                className="text-2xl sm:text-3xl font-medium tracking-tight text-neutral-900 dark:text-white"
              >
                {isForgotPassword ? 'Reset key' : mode === 'login' ? 'Log in' : 'Sign up'}
              </h2>

              {/* Social Login Pills */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Facebook')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 text-xs font-medium shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title="Sign in with Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook</span>
                </button>

                {/* Google Companion Pill */}
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="p-1.5 rounded-full border border-neutral-300/80 dark:border-neutral-700/80 bg-white/70 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-neutral-700 dark:text-neutral-300 shadow-xs hover:shadow-sm transition-all active:scale-95 cursor-pointer"
                  title="Sign in with Google"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.14C3.27 21.43 7.34 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.59H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.41l4.03-3.14z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.57 1.25 6.59l4.03 3.14c.95-2.83 3.6-4.98 6.72-4.98z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Inputs Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">

              {/* Sign Up Mode: Full Name / Studio Input */}
              {mode === 'signup' && !isForgotPassword && (
                <div className="auth-input-pill flex items-center px-3.5 py-2.5 sm:py-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0 shadow-2xs mr-3">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500/70 dark:placeholder:text-neutral-400 outline-none font-normal"
                  />
                </div>
              )}

              {/* Email Address Pill Input */}
              <div className="auth-input-pill flex items-center px-3.5 py-2.5 sm:py-3">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0 shadow-2xs mr-3 text-xs sm:text-sm font-semibold">
                  @
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-mail address"
                  className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500/70 dark:placeholder:text-neutral-400 outline-none font-normal"
                />
              </div>

              {/* Password Pill Input (with embedded "I forgot" button) */}
              {!isForgotPassword && (
                <div className="auth-input-pill flex items-center px-3.5 py-2.5 sm:py-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/80 dark:bg-white/10 flex items-center justify-center text-neutral-600 dark:text-neutral-300 shrink-0 shadow-2xs mr-3">
                    <Key className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500/70 dark:placeholder:text-neutral-400 outline-none font-normal pr-2"
                  />
                  {/* Embedded "I forgot" Pill Badge */}
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(true)}
                    className="px-3 py-1 rounded-full bg-white dark:bg-neutral-800 text-[11px] font-medium text-neutral-700 dark:text-neutral-300 shadow-[0_1px_3px_rgba(0,0,0,0.1)] hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-black dark:hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    Forget Password
                  </button>
                </div>
              )}

              {/* Forgot Password Mode: Back link */}
              {isForgotPassword && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(false)}
                    className="text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:underline cursor-pointer"
                  >
                    ← Back to Log in
                  </button>
                </div>
              )}

              {/* Bottom Action Row: Disclaimer & Iconic Peanut Action Button */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <p className="text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight max-w-[210px]">
                  {isForgotPassword ? (
                    'Enter your account email to receive an instant secure reset link.'
                  ) : (
                    <>
                      For use by verified creators (+855). Keep access keys secure. In case of issues contact our{' '}
                      <button
                        type="button"
                        onClick={() => alert("PSD Pages Hotline: support@psdpages.com • 24/7 Creator Assistance")}
                        className="underline text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white cursor-pointer"
                      >
                        hotline
                      </button>
                      .
                    </>
                  )}
                </p>

                {/* The Signature Peanut Action Button */}
                <button
                  type="submit"
                  className="auth-peanut-btn group"
                  title={isForgotPassword ? 'Send Reset Link' : mode === 'login' ? 'Log in' : 'Create Account'}
                >
                  <span className="text-xs font-medium tracking-wide">
                    {isForgotPassword ? 'Reset' : mode === 'login' ? 'Enter' : 'Create'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>
            </form>

            {/* Bottom Centered Subtitle */}
            <div className="mt-5 text-center text-[10px] sm:text-[11px] text-neutral-500 dark:text-neutral-400 font-light">
              Please create responsibly!
            </div>
          </div>

          {/* ==========================================================
              BOTTOM-LEFT FLOATING MINI-CARD (NEW IN / C.LAB JOINTS)
              ========================================================== */}
          <div className="w-full rounded-[24px] sm:rounded-[28px] bg-[#14161a] text-white p-4 sm:p-5 shadow-xl border border-white/5 flex items-center justify-between transition-all hover:bg-[#191c22]">
            <div>
              <h4 className="text-lg sm:text-xl font-normal tracking-tight text-white">New in</h4>
              <p className="text-xs text-neutral-400 font-light mt-0.5">PSD Products & Accounts</p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                const el = document.getElementById('marketplace');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xs font-medium text-neutral-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer group"
            >
              <span>Discover</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

        {/* ==========================================================
            RIGHT COLUMN: THE EDITORIAL SHOWCASE CARD
            ========================================================== */}
        <div className="hidden md:flex md:w-[320px] lg:w-[360px] flex-col justify-between rounded-[32px] sm:rounded-[36px] p-6 lg:p-7 relative overflow-hidden auth-showcase-glass transition-all duration-300">

          {/* Top Row: Brand & Grand Opening (No Date) */}
          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="text-3xl lg:text-4xl font-light text-neutral-900 dark:text-neutral-100 tracking-tight leading-none">
                PSD
              </div>
              <div className="text-3xl lg:text-4xl font-light text-neutral-400 dark:text-neutral-500 tracking-tight leading-none mt-1">
                Website
              </div>
            </div>

            <div className="text-right text-xs font-light text-neutral-600 dark:text-neutral-400 leading-snug">
              Grand opening
              <br />
              <span className="font-normal text-neutral-900 dark:text-neutral-200">
                New store
              </span>
            </div>
          </div>

          {/* Center Graphic: The Ethereal Sunset Sphere with Split Frosted Refraction (No Time or Location) */}
          <div className="relative my-8 h-48 w-full flex items-center overflow-hidden rounded-2xl">

            {/* The Vibrant Glowing Warm Orange Sun Orb */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 shadow-[0_0_50px_rgba(249,115,22,0.55)] transition-transform duration-700 hover:scale-105" />

            {/* The Left Vertical Frosted Glass Partition */}
            <div className="absolute inset-y-0 left-0 w-[58%] auth-split-frost p-4 flex flex-col justify-center rounded-l-2xl z-10">
              <div className="text-xs text-neutral-700 dark:text-neutral-300 font-light leading-relaxed">
                <span className="font-medium text-neutral-900 dark:text-white block">
                  Layered
                </span>
                Page & Account
                <br />
                Instant Delivery
              </div>
              <div className="mt-2 text-[10px] text-neutral-500 dark:text-neutral-400 tracking-wider uppercase font-semibold">
                PSD Global Drop
              </div>
            </div>
          </div>

          {/* Bottom Row: Starburst Logo & "Join in" Peanut Button */}
          <div className="flex items-center justify-between relative z-10 pt-2">

            {/* Starburst Flower Radial Icon */}
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 stroke-current text-neutral-800 dark:text-neutral-200"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <line x1="12" y1="2" x2="12" y2="7" strokeLinecap="round" />
                <line x1="12" y1="17" x2="12" y2="22" strokeLinecap="round" />
                <line x1="2" y1="12" x2="7" y2="12" strokeLinecap="round" />
                <line x1="17" y1="12" x2="22" y2="12" strokeLinecap="round" />
                <line x1="4.93" y1="4.93" x2="8.46" y2="8.46" strokeLinecap="round" />
                <line x1="15.54" y1="15.54" x2="19.07" y2="19.07" strokeLinecap="round" />
                <line x1="4.93" y1="19.07" x2="8.46" y2="15.54" strokeLinecap="round" />
                <line x1="15.54" y1="8.46" x2="19.07" y2="4.93" strokeLinecap="round" />
              </svg>
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 tracking-tight">
                PSD Pages
              </span>
            </div>

            {/* "Join in" Peanut Pill Button */}
            <button
              type="button"
              onClick={() => {
                setIsForgotPassword(false);
                setMode('signup');
              }}
              className="auth-peanut-btn group text-xs font-medium"
              title="Join PSD Pages Community"
            >
              <span>Join in</span>
              <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
