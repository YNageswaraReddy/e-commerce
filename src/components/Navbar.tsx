import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  onSelectCategory,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  const navLinks = [
    { label: 'All Objects', category: 'All' },
    { label: 'Lighting', category: 'Lighting' },
    { label: 'Ceramics', category: 'Ceramics' },
    { label: 'Textiles', category: 'Textiles' },
    { label: 'Audio', category: 'Audio & Objects' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/95 backdrop-blur-md border-b border-stone-200/80">
      {/* Promotional Top Announcement Banner */}
      {showAnnouncement && (
        <div className="bg-stone-900 text-stone-200 text-xs py-2 px-4 flex items-center justify-between text-center border-b border-stone-800">
          <div className="w-6" /> {/* spacer for balance */}
          <p className="font-normal tracking-wide">
            Complimentary carbon-neutral dispatch on orders over $150 &nbsp;·&nbsp; Use code{' '}
            <span className="font-semibold text-amber-200 tracking-wider">WELCOME15</span> for 15% off
          </p>
          <button
            onClick={() => setShowAnnouncement(false)}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Bar (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single element, no badges or subtitles) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-editorial text-2xl md:text-3xl font-light tracking-tight text-stone-900 whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
        >
          LUMEN &amp; OAK
        </a>

        {/* Zone 2: 4-5 Clean Single-Line Text Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <button
              key={link.category}
              onClick={() => {
                onSelectCategory(link.category);
                const el = document.getElementById('collection-grid');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-stone-950 transition-colors py-1 relative whitespace-nowrap shrink-0 text-stone-700 hover:underline underline-offset-8 decoration-stone-400"
            >
              {link.label}
            </button>
          ))}
          <a
            href="#craft-story"
            className="hover:text-stone-950 transition-colors py-1 whitespace-nowrap shrink-0 text-stone-700 hover:underline underline-offset-8 decoration-stone-400"
          >
            Our Atelier
          </a>
        </nav>

        {/* Zone 3: Actions (Search, Wishlist, Bag) */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
            className="p-2 text-stone-700 hover:text-stone-950 rounded-full hover:bg-stone-200/60 transition-colors relative"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="View wishlist"
            className="p-2 text-stone-700 hover:text-stone-950 rounded-full hover:bg-stone-200/60 transition-colors relative"
          >
            <Heart className="w-4.5 h-4.5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-stone-900 text-white text-[10px] font-semibold rounded-full flex items-center justify-center tabular-nums">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Primary Action: Shopping Bag Button */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping bag"
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-white bg-stone-900 rounded-md hover:bg-stone-800 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="bg-stone-800 px-1.5 py-0.5 rounded text-[11px] font-mono tabular-nums text-stone-200">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Expandable Search Input Tray */}
      {showSearch && (
        <div className="border-t border-stone-200/80 bg-white/95 px-4 py-3 shadow-inner">
          <div className="max-w-2xl mx-auto relative flex items-center">
            <Search className="w-4 h-4 text-stone-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ceramics, lighting, textiles, brass objects..."
              className="w-full pl-9 pr-9 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-stone-900 focus:border-stone-900"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-stone-400 hover:text-stone-700 text-xs"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
