import React, { useState } from 'react';
import { X, Sparkles, DollarSign } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import type { Product } from '../types';

interface BecomeSellerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductCreated: (newProduct: Product) => void;
}

export const BecomeSellerModal: React.FC<BecomeSellerModalProps> = ({
  isOpen,
  onClose,
  onProductCreated,
}) => {
  const { isDarkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Landing Pages');
  const [price, setPrice] = useState('29');
  const [shortDesc, setShortDesc] = useState('');
  const [description] = useState('Full responsive web page template with documentation.');
  const [demoUrl, setDemoUrl] = useState('https://demo.preview.dev');
  const [selectedTech, setSelectedTech] = useState<string[]>(['React', 'Tailwind CSS']);
  const [thumbnailUrl] = useState('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80');
  const [sellerName, setSellerName] = useState('ProCreator Studio');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const techOptions: string[] = [];

  const toggleTech = (t: string) => {
    if (selectedTech.includes(t)) {
      setSelectedTech(selectedTech.filter(item => item !== t));
    } else {
      setSelectedTech([...selectedTech, t]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          price: parseFloat(price) || 29,
          shortDesc,
          description,
          demoUrl,
          thumbnail: thumbnailUrl,
          seller: {
            name: sellerName,
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
            verified: true,
            rating: 5.0,
            responseTime: '< 1 hour',
          },
          features: [
            '100% Fully Responsive Layout',
            'Modern Design System',
            'Full Clean Source Code Included',
            'Commercial Lifetime License',
          ],
          tags: [category.toLowerCase(), ...selectedTech.map(t => t.toLowerCase())],
        }),
      });

      if (response.ok) {
        const newProduct = await response.json();
        onProductCreated(newProduct);
        onClose();
        alert('Product published successfully to marketplace!');
      } else {
        alert('Failed to publish product. Please check fields.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to backend server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-md animate-fadeIn transition-colors ${isDarkMode ? 'bg-black/80' : 'bg-slate-900/45'
      }`}>
      <div className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-5 sm:p-8 shadow-2xl transition-all ${isDarkMode
        ? 'neu-flat border border-white/10 text-white'
        : 'bg-white border border-gray-200 text-gray-900'
        }`}>

        {/* Header */}
        <div className={`flex items-center justify-between pb-4 sm:pb-6 border-b ${isDarkMode ? 'border-white/[0.06]' : 'border-gray-100'
          }`}>
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 ${isDarkMode ? 'neu-inset' : 'bg-amber-50 border border-amber-200'
              }`}>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className={`text-lg sm:text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-gray-950'}`}>
                List Your Web Page / Service
              </h2>
              <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                Sell your custom pages & templates to clients worldwide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 sm:p-2 rounded-xl transition-colors shrink-0 ${isDarkMode ? 'neu-flat-sm text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-black'
              }`}
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">

          {/* Title */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
              Page / Template Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Apex Esports Clan Landing Page"
              className={`w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 ${isDarkMode
                ? 'neu-inset text-white placeholder-slate-500'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white'
                }`}
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none ${isDarkMode
                  ? 'neu-inset text-white bg-[#11141b]'
                  : 'bg-gray-50 border border-gray-200 text-gray-900'
                  }`}
              >
                <option value="Digital Products">Digital Products</option>
                <option value="Page Templates">Page Templates</option>
              </select>
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                Price (USD) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <DollarSign className="w-4 h-4" />
                </div>
                <input
                  type="number"
                  required
                  min="1"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`w-full rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 ${isDarkMode
                    ? 'neu-inset text-white'
                    : 'bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white'
                    }`}
                />
              </div>
            </div>
          </div>

          {/* Short description */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
              Short Highlights Description *
            </label>
            <textarea
              required
              rows={2}
              value={shortDesc}
              onChange={(e) => setShortDesc(e.target.value)}
              placeholder="e.g. Modern responsive dark & light layout with 60fps canvas animations."
              className={`w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 ${isDarkMode
                ? 'neu-inset text-white placeholder-slate-500'
                : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white'
                }`}
            />
          </div>

          {/* Tech stack selection */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>
              Frameworks & Tech Stack
            </label>
            <div className="flex flex-wrap gap-2">
              {techOptions.map((t) => {
                const isSelected = selectedTech.includes(t);
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => toggleTech(t)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${isSelected
                      ? 'neu-pill-red text-white'
                      : isDarkMode
                        ? 'neu-flat-sm text-slate-300 hover:text-white'
                        : 'bg-gray-100 border border-gray-200 text-gray-700 hover:text-black'
                      }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seller / Studio Name & Live Demo URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                Creator / Studio Display Name
              </label>
              <input
                type="text"
                value={sellerName}
                onChange={(e) => setSellerName(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none ${isDarkMode
                  ? 'neu-inset text-white'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white'
                  }`}
              />
            </div>

            <div>
              <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'
                }`}>
                Live Preview URL
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                className={`w-full rounded-xl px-4 py-2.5 text-sm focus:outline-none ${isDarkMode
                  ? 'neu-inset text-white'
                  : 'bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white'
                  }`}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${isDarkMode ? 'neu-flat-sm text-slate-400 hover:text-white' : 'bg-gray-100 text-gray-700 hover:text-black'
                }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="neu-pill-red px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Product to Live Marketplace'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
