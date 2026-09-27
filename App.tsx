import { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { TrustBar } from './components/TrustBar';
import { CategoryFilter } from './components/CategoryFilter';
import { FilterSortBar } from './components/FilterSortBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { Footer } from './components/Footer';
import { BecomeSellerModal } from './components/BecomeSellerModal';
import { LivePreviewModal } from './components/LivePreviewModal';
import { CartDrawer } from './components/CartDrawer';
import { AuthModal } from './components/AuthModal';
import type { Product, CartItem } from './types';
import { Layers } from 'lucide-react';
import { useTheme } from './context/ThemeContext';
import { FALLBACK_PRODUCTS } from './data/mockProducts';

export function App() {
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [currency, setCurrency] = useState<'USD' | 'KHR'>(() => {
    try {
      const saved = localStorage.getItem('psd_currency');
      return (saved === 'USD' || saved === 'KHR') ? saved : 'KHR';
    } catch {
      return 'KHR';
    }
  });

  const handleCurrencyChange = (newCurrency: 'USD' | 'KHR') => {
    setCurrency(newCurrency);
    try {
      localStorage.setItem('psd_currency', newCurrency);
    } catch (e) {
      console.warn('Could not save currency to localStorage:', e);
    }
  };

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Fetch products from NestJS API (or fallback if backend offline)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProducts(data);
            return;
          }
        }
        setProducts(FALLBACK_PRODUCTS);
      } catch (err) {
        console.warn('Backend API not responding, using offline marketplace items:', err);
        setProducts(FALLBACK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    'All',
    'Digital Products',
    'AI Prompts',
    'Web Designs',
    'UI UX Designs',
    'Social Media Content',
    'Page Templates'
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        if (activeCategory !== 'All' && p.category !== activeCategory) {
          return false;
        }
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchTag = p.tags?.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchTag) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return b.salesCount - a.salesCount; // 'popular'
      });
  }, [products, activeCategory, searchQuery, sortBy]);

  // Cart Actions
  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleInstantBuy = (product: Product) => {
    handleAddToCart(product);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProductCreated = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setActiveCategory(newProduct.category);
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-red-500 selection:text-white transition-colors duration-500 ease-in-out w-full max-w-full overflow-x-clip ${isDarkMode ? 'bg-[#0d1016] text-slate-100' : 'bg-[#edf2f7] text-slate-800'
      }`}>
      {/* 1. Header & Navigation */}
      <Navbar
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSellerModal={() => setIsSellerModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onSelectCategory={(cat) => {
          setSelectedProduct(null);
          setActiveCategory(cat);
          const el = document.getElementById('marketplace');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        activeCategory={activeCategory}
      />

      {/* Main View: Dedicated Product Detail Page OR Marketplace Catalog */}
      {selectedProduct ? (
        <ProductDetailPage
          product={selectedProduct}
          currency={currency}
          onBack={() => {
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onAddToCart={handleAddToCart}
          onInstantBuy={handleInstantBuy}
        />
      ) : (
        <>
          {/* 2. Hero Section (Workstation image, headline, neumorphic search) */}
          <HeroSection
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            products={products}
            onSelectProduct={(p) => {
              setSelectedProduct(p);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCategoryClick={(cat) => {
              setActiveCategory(cat);
              document.getElementById('marketplace')?.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* 3. Trust Bar (4 key pillars from reference image) */}
          <TrustBar />

          {/* 4. Main Marketplace Section */}
          <main id="marketplace" className="flex-1 max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-10 py-6 sm:py-10 w-full">

            {/* Marketplace Section Title */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-6 gap-3 sm:gap-4">
              <div>
                <h2 className={`text-xl sm:text-3xl font-extrabold tracking-tight transition-colors ${isDarkMode ? 'text-white' : 'text-slate-900'
                  }`}>
                  Featured Web Pages & Services
                </h2>
                <p className={`text-xs sm:text-sm mt-1 transition-colors ${isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                  A modern marketplace website for browsing, managing, buy and sell pages, digital accounts, and services with secure listings, clear categories, and a seamless user experience.
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6 sm:mb-8">
              <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={setActiveCategory}
              />

              {/* Search & Sort Bar matching reference image ("Type to filter" + "Sort by Recommended") */}
              <FilterSortBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortByChange={setSortBy}
              />
            </div>

            {/* Results Counter Header matching reference image */}
            {!loading && (
              <div className={`text-sm sm:text-[15px] mb-4 sm:mb-5 select-none font-normal transition-colors duration-200 ${isDarkMode ? 'text-[#9aa0a6]' : 'text-[#70757a]'
                }`}>
                About <span className={`font-bold transition-colors duration-200 ${isDarkMode ? 'text-white' : 'text-[#202124]'
                  }`}>
                  {products.length > 0 ? Math.round(103440 * (filteredProducts.length / products.length)).toLocaleString() : '103,440'}
                </span> results
              </div>
            )}

            {/* Products Grid */}
            {loading ? (
              <div className="py-20 text-center space-y-4">
                <div className="w-10 h-10 border-2 border-[#ff3838] border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className={`rounded-3xl p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 my-6 sm:my-10 border transition-all ${isDarkMode
                ? 'neu-flat border-white/5 text-white'
                : 'bg-white border-gray-200 text-gray-900 shadow-md'
                }`}>
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center ${isDarkMode
                  ? 'neu-inset text-slate-400'
                  : 'bg-gray-100 border border-gray-200 text-gray-500'
                  }`}>
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-gray-950'
                  }`}>
                  No Matching Products Found
                </h3>
                <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                  We couldn't find any templates matching your filter criteria. Try searching for a different keyword or resetting filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                  }}
                  className="neu-pill-red px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:scale-105 active:scale-95 transition-transform"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    onPreview={(p) => {
                      setSelectedProduct(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onAddToCart={handleAddToCart}
                    onInstantBuy={handleInstantBuy}
                  />
                ))}
              </div>
            )}

          </main>
        </>
      )}

      {/* 5. Footer (Redesigned like reference image with 3D tech workstation, payment badges, and bottom bar) */}
      <Footer onSelectCategory={(cat) => {
        setSelectedProduct(null);
        setActiveCategory(cat);
      }} />

      {/* 6. Modals & Drawers */}
      <BecomeSellerModal
        isOpen={isSellerModalOpen}
        onClose={() => setIsSellerModalOpen(false)}
        onProductCreated={handleProductCreated}
      />

      <LivePreviewModal
        product={previewProduct}
        onClose={() => setPreviewProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        currency={currency}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
}

export default App;
