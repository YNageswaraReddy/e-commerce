import React, { useState, useEffect, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, Check, Sparkles, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from './data/products';
import { Product, CartItem, ProductColor, OrderDetails } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CraftStory } from './components/CraftStory';
import { Footer } from './components/Footer';

export default function App() {
  // Cart state with localStorage restoration
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('lumen_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('lumen_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Filter & Search state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);

  // Floating Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('lumen_cart', JSON.stringify(cartItems));
    } catch {
      // storage unavailable
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('lumen_wishlist', JSON.stringify(wishlistIds));
    } catch {
      // storage unavailable
    }
  }, [wishlistIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart handler
  const handleAddToCart = (product: Product, color?: ProductColor, quantity = 1) => {
    const targetColor = color || product.colors[0];

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor.name === targetColor.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: updated[existingIdx].quantity + quantity,
        };
        return updated;
      } else {
        return [...prev, { product, quantity, selectedColor: targetColor }];
      }
    });

    showToast(`Added ${product.name} (${targetColor.name}) to bag`);
  };

  // Update item quantity
  const handleUpdateQuantity = (productId: string, colorName: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor.name === colorName) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item
  const handleRemoveItem = (productId: string, colorName: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor.name === colorName)
      )
    );
  };

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from saved objects');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist');
        return [...prev, productId];
      }
    });
  };

  // Apply promo code
  const handleApplyPromo = (code: string) => {
    if (code === 'WELCOME15') {
      setPromoCode('WELCOME15');
      setDiscountRate(0.15);
      return true;
    }
    if (code === 'FREESHIP') {
      setPromoCode('FREESHIP');
      return true;
    }
    return false;
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.materials.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (inStockOnly) {
      result = result.filter((p) => p.inStock);
    }

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured default order
        break;
    }

    return result;
  }, [selectedCategory, searchQuery, inStockOnly, sortBy]);

  // Financial calculations for Checkout
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const isFreeShipping = subtotal >= 150 || promoCode === 'FREESHIP';
  const shippingCost = cartItems.length === 0 ? 0 : isFreeShipping ? 0 : 15;
  const currentTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-stone-900 selection:bg-stone-200">
      {/* Top Navigation */}
      <Navbar
        cartCount={cartItems.reduce((acc, it) => acc + it.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Showcase */}
      <Hero
        onExplore={() => {
          const el = document.getElementById('collection-grid');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Main Catalog Section */}
      <main id="collection-grid" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full">
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-stone-200/80">
          <div>
            <div className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-1">
              Curated Catalog
            </div>
            <h2 className="font-editorial text-3xl font-light text-stone-900">
              The Permanent Collection
            </h2>
            <p className="text-xs text-stone-500 mt-1 font-light">
              Showing {filteredProducts.length} handcrafted {filteredProducts.length === 1 ? 'object' : 'objects'}
              {selectedCategory !== 'All' && ` in ${selectedCategory}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-stone-200 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
              <label htmlFor="sort-select" className="text-stone-500">Sort:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* In Stock Toggle */}
            <button
              onClick={() => setInStockOnly(!inStockOnly)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                inStockOnly
                  ? 'bg-stone-900 border-stone-900 text-white'
                  : 'bg-white border-stone-200 text-stone-700 hover:border-stone-300'
              }`}
            >
              In Stock Only
            </button>
          </div>
        </div>

        {/* Category Tabs (Segmented controls compliant with Section 1.A) */}
        <div className="pt-6 pb-8 overflow-x-auto">
          <div className="flex items-center gap-1.5 p-1 bg-stone-200/60 rounded-xl w-fit">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-white text-stone-950 shadow-sm font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid (3-column desktop / 2-column tablet) */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center bg-stone-100/60 rounded-2xl border border-dashed border-stone-300 p-8">
            <h3 className="font-editorial text-xl text-stone-800 mb-2">
              No objects found matching your query
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mb-6">
              Try adjusting your search terms or clearing current category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setInStockOnly(false);
              }}
              className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-md hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={(p) => setSelectedProduct(p)}
                onAddToCart={(p, color) => handleAddToCart(p, color, 1)}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={handleToggleWishlist}
              />
            ))}
          </div>
        )}
      </main>

      {/* Craft Story Section */}
      <CraftStory />

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(p, color, qty) => {
          handleAddToCart(p, color, qty);
          setSelectedProduct(null);
          setIsCartOpen(true);
        }}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onContinueShopping={() => setIsCartOpen(false)}
        discountRate={discountRate}
        promoCode={promoCode}
        onApplyPromo={handleApplyPromo}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        allProducts={PRODUCTS}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, p.colors[0], 1)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discountAmount}
        shipping={shippingCost}
        total={currentTotal}
        onOrderSuccess={(order) => {
          setIsCheckoutOpen(false);
          setCartItems([]);
          setCompletedOrder(order);
        }}
      />

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Floating Action Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-stone-100 px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-stone-800 transition-all duration-300">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-stone-400 hover:text-white ml-1 p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}
    </div>
  );
}
