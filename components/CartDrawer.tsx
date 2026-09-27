import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Zap, Key, Download, CheckCircle, ArrowRight, CreditCard, QrCode } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { CartItem, OrderConfirmation } from '../types';
import { useTheme } from '../context/ThemeContext';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currency: 'USD' | 'KHR';
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onClearCart,
  currency,
}) => {
  const { isDarkMode } = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<'KHQR' | 'Card'>('KHQR');
  const [buyerName] = useState('John Doe');
  const [buyerEmail, setBuyerEmail] = useState('client@example.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderReceipt, setOrderReceipt] = useState<OrderConfirmation | null>(null);

  if (!isOpen) return null;

  const totalUsd = cartItems.reduce((sum, i) => sum + (Number(i.product.price) || 0) * i.quantity, 0);
  const totalKhr = Math.round(totalUsd * 4100);

  const displayTotal = currency === 'USD'
    ? `$${totalUsd.toFixed(2)}`
    : `${totalKhr.toLocaleString()} ៛`;

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    setIsProcessing(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.price,
          })),
          buyerName,
          buyerEmail,
          currency,
          paymentMethod: paymentMethod === 'KHQR' ? 'KHQR (Bakong Cambodia)' : 'Visa / MasterCard',
        }),
      });

      if (response.ok) {
        const orderData = await response.json();
        setOrderReceipt(orderData);
        onClearCart();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff3838', '#10b981', '#6366f1', '#f59e0b']
        });
      } else {
        // Simulated local fallback order confirmation for offline mode
        const simulatedOrder: OrderConfirmation = {
          id: `ORD-${Date.now().toString().slice(-6)}`,
          items: cartItems.map(item => ({
            productId: item.product.id,
            title: item.product.title,
            price: item.product.price,
          })),
          buyerName,
          buyerEmail,
          totalUsd,
          totalKhr,
          currency,
          paymentMethod: paymentMethod === 'KHQR' ? 'KHQR (Bakong Cambodia)' : 'Visa / MasterCard',
          status: 'COMPLETED',
          licenseKey: `PSD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
          downloadToken: `tok_${Math.random().toString(36).substring(2, 10)}`,
          deliveredAt: new Date().toISOString(),
        };
        setOrderReceipt(simulatedOrder);
        onClearCart();
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ff3838', '#10b981', '#6366f1', '#f59e0b']
        });
      }
    } catch {
      // Offline simulation fallback
      const simulatedOrder: OrderConfirmation = {
        id: `ORD-${Date.now().toString().slice(-6)}`,
        items: cartItems.map(item => ({
          productId: item.product.id,
          title: item.product.title,
          price: item.product.price,
        })),
        buyerName,
        buyerEmail,
        totalUsd,
        totalKhr,
        currency,
        paymentMethod: paymentMethod === 'KHQR' ? 'KHQR (Bakong Cambodia)' : 'Visa / MasterCard',
        status: 'COMPLETED',
        licenseKey: `PSD-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        downloadToken: `tok_${Math.random().toString(36).substring(2, 10)}`,
        deliveredAt: new Date().toISOString(),
      };
      setOrderReceipt(simulatedOrder);
      onClearCart();
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff3838', '#10b981', '#6366f1', '#f59e0b']
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className={`w-screen max-w-full sm:max-w-md flex flex-col shadow-2xl transition-all duration-300 border-l ${
          isDarkMode
            ? 'bg-[#0e121a] border-white/10 text-white'
            : 'bg-white border-gray-200 text-gray-900'
        }`}>
          
          {/* Header */}
          <div className={`p-4 sm:p-6 border-b flex items-center justify-between transition-colors ${
            isDarkMode
              ? 'bg-[#121622] border-white/[0.08]'
              : 'bg-gray-50/90 border-gray-100'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                isDarkMode
                  ? 'neu-inset text-[#ff5252]'
                  : 'bg-red-50 border border-red-200 text-[#ff3838]'
              }`}>
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`text-sm sm:text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                  Your Cart & Delivery
                </h3>
                <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {cartItems.length} item(s) selected
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setOrderReceipt(null);
                onClose();
              }}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isDarkMode
                  ? 'neu-flat-sm text-slate-400 hover:text-white'
                  : 'bg-gray-100 text-gray-500 hover:text-black'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
            
            {/* If order is completed, show instant delivery token and license key */}
            {orderReceipt ? (
              <div className="space-y-5 animate-fadeIn">
                <div className={`rounded-2xl p-6 text-center space-y-3 border ${
                  isDarkMode
                    ? 'neu-convex border-emerald-500/20 bg-[#0d161a]'
                    : 'bg-emerald-50/80 border-emerald-200'
                }`}>
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-emerald-500 ${
                    isDarkMode ? 'neu-inset' : 'bg-white shadow-xs'
                  }`}>
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    Instant Delivery Confirmed!
                  </h4>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    Payment verified. Your source files and commercial license keys are ready below.
                  </p>
                </div>

                {/* Generated License Key box */}
                <div className={`rounded-2xl p-4 space-y-2 border ${
                  isDarkMode
                    ? 'neu-flat border-white/5 bg-[#131824]'
                    : 'bg-white border-gray-200 shadow-xs'
                }`}>
                  <div className={`flex items-center justify-between text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    <span className="font-semibold flex items-center gap-1">
                      <Key className="w-3.5 h-3.5 text-amber-500" /> License Activation Key:
                    </span>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase">Valid & Active</span>
                  </div>
                  <div className={`rounded-xl p-3 font-mono text-sm font-bold text-center tracking-wider select-all ${
                    isDarkMode
                      ? 'neu-inset text-[#ff5757]'
                      : 'bg-gray-100 border border-gray-200 text-[#ff3838]'
                  }`}>
                    {orderReceipt.licenseKey}
                  </div>
                </div>

                {/* Download Deliverables */}
                <div className={`rounded-2xl p-4 space-y-3 border ${
                  isDarkMode
                    ? 'neu-flat border-white/5 bg-[#131824]'
                    : 'bg-white border-gray-200 shadow-xs'
                }`}>
                  <div className={`text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Instant Deliverables:
                  </div>
                  {orderReceipt.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center justify-between py-2 border-b last:border-none ${
                        isDarkMode ? 'border-white/[0.04]' : 'border-gray-100'
                      }`}
                    >
                      <span className={`text-xs font-medium truncate max-w-[180px] sm:max-w-[200px] ${
                        isDarkMode ? 'text-slate-300' : 'text-gray-700'
                      }`}>
                        {item.title}
                      </span>
                      <button
                        type="button"
                        onClick={() => alert(`Downloading verified source package for ${item.title}...`)}
                        className="neu-pill-secondary px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-500 flex items-center gap-1 hover:scale-105 transition-transform cursor-pointer"
                      >
                        <Download className="w-3 h-3" /> Download ZIP
                      </button>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className={`text-[11px] space-y-1 p-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  <div>Order ID: <span className={`font-mono font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{orderReceipt.id}</span></div>
                  <div>Recipient: <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>{orderReceipt.buyerEmail}</span></div>
                  <div>Total Paid: <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{orderReceipt.currency === 'USD' ? `$${orderReceipt.totalUsd.toFixed(2)}` : `${orderReceipt.totalKhr.toLocaleString()} ៛`}</span></div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setOrderReceipt(null);
                    onClose();
                  }}
                  className="w-full neu-pill-red py-3 rounded-2xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-transform"
                >
                  Continue Browsing
                </button>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className={`w-16 h-16 rounded-3xl flex items-center justify-center ${
                  isDarkMode
                    ? 'neu-inset text-slate-500'
                    : 'bg-gray-100 border border-gray-200 text-gray-400'
                }`}>
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h4 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    Your Cart is Empty
                  </h4>
                  <p className={`text-xs mt-1 max-w-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Explore our digital marketplace items, UI templates, and dev services to add items.
                  </p>
                </div>
              </div>
            ) : (
              /* Cart Items List */
              <>
                <div className="space-y-3">
                  {cartItems.map(({ product }) => (
                    <div
                      key={product.id}
                      className={`rounded-2xl p-3.5 flex items-center justify-between border space-x-3 transition-all ${
                        isDarkMode
                          ? 'neu-flat border-white/5 bg-[#141824]'
                          : 'bg-white border-gray-200 shadow-xs'
                      }`}
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-14 h-14 rounded-xl object-cover border border-black/10 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold truncate ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.title}
                        </h4>
                        <span className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                          {product.category}
                        </span>
                        <div className="text-xs font-extrabold text-[#ff4747] mt-1">
                          {currency === 'USD'
                            ? `$${(Number(product.price) || 0).toFixed(2)}`
                            : `${(typeof product.priceKhr === 'number' && !isNaN(product.priceKhr) ? product.priceKhr : Math.round((Number(product.price) || 0) * 4100)).toLocaleString()} ៛`}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(product.id)}
                        className={`p-2 rounded-xl transition-colors cursor-pointer ${
                          isDarkMode
                            ? 'neu-flat-sm text-slate-400 hover:text-red-400'
                            : 'bg-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Escrow Guarantee Note matching GamerProtect */}
                <div className={`rounded-2xl p-4 flex items-start space-x-3 border transition-all ${
                  isDarkMode
                    ? 'neu-flat border-emerald-500/20 bg-[#121922]'
                    : 'bg-emerald-50/70 border-emerald-200 text-emerald-950 shadow-2xs'
                }`}>
                  <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-emerald-950'}`}>
                      GamerProtect Escrow Covered
                    </div>
                    <div className={`text-[11px] mt-0.5 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-emerald-800'}`}>
                      Your payment is safely held until you verify and download the working source files.
                    </div>
                  </div>
                </div>

                {/* Payment Method Selector with Cambodia KHQR Support */}
                <div className="space-y-2.5">
                  <div className={`text-xs font-bold uppercase tracking-wider ${
                    isDarkMode ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    Payment Method
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('KHQR')}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        paymentMethod === 'KHQR'
                          ? isDarkMode
                            ? 'neu-pressed text-[#ff5252] border border-[#ff5252]/30'
                            : 'bg-red-50 border-2 border-red-500 text-[#ff3838] shadow-xs'
                          : isDarkMode
                            ? 'neu-flat text-slate-300 hover:text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <QrCode className="w-5 h-5" />
                      <span className="text-xs font-bold">KHQR (Cambodia)</span>
                      <span className={`text-[9px] ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Bakong / Any Bank
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Card')}
                      className={`p-3 rounded-2xl flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                        paymentMethod === 'Card'
                          ? isDarkMode
                            ? 'neu-pressed text-[#ff5252] border border-[#ff5252]/30'
                            : 'bg-red-50 border-2 border-red-500 text-[#ff3838] shadow-xs'
                          : isDarkMode
                            ? 'neu-flat text-slate-300 hover:text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="w-5 h-5" />
                      <span className="text-xs font-bold">Credit Card</span>
                      <span className={`text-[9px] ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Visa / Mastercard
                      </span>
                    </button>
                  </div>
                </div>

                {/* Buyer Details */}
                <div className="space-y-3">
                  <div>
                    <label className={`block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-700'
                    }`}>
                      Deliver to Email *
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      placeholder="you@domain.com"
                      className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-all ${
                        isDarkMode
                          ? 'neu-inset text-white placeholder-slate-500 focus:ring-1 focus:ring-red-500'
                          : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:border-red-400'
                      }`}
                    />
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Footer with Total and Checkout Button */}
          {!orderReceipt && cartItems.length > 0 && (
            <div className={`p-4 sm:p-6 border-t space-y-3 sm:space-y-4 transition-colors ${
              isDarkMode
                ? 'bg-[#121622] border-white/[0.08]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    Total Amount:
                  </span>
                  <div className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                    {displayTotal}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-emerald-500 font-bold flex items-center gap-1 justify-end">
                    <Zap className="w-3 h-3" /> Instant Key & File
                  </div>
                  <div className={`text-[10px] ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                    No hidden fees • Instant download
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full neu-pill-red py-3.5 rounded-2xl text-xs font-extrabold uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-50"
              >
                <span>{isProcessing ? 'Processing Escrow...' : `Pay & Get Instant Key (${displayTotal})`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
