import React from 'react';
import { X, Heart, Plus, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { ProductVisual } from './ProductVisual';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  allProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  allProducts,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const savedProducts = allProducts.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className="w-screen max-w-md bg-[#faf9f6] shadow-2xl flex flex-col border-l border-stone-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-rose-600 fill-rose-600" />
              <h2 className="font-editorial text-xl font-normal text-stone-900">
                Saved Objects
              </h2>
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                ({savedProducts.length})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {savedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <Heart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="font-editorial text-lg text-stone-900 mb-1">
                  Your wishlist is empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs">
                  Tap the heart on any object in our collection to bookmark it for later reflection.
                </p>
              </div>
            ) : (
              savedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200 shadow-xs"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-100 bg-stone-100">
                    <ProductVisual product={product} className="w-full h-full" />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <h4 className="font-editorial text-sm font-medium text-stone-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs text-stone-500 line-clamp-1">
                          {product.tagline}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="text-stone-400 hover:text-stone-700 text-xs p-1"
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-semibold text-stone-900 tabular-nums">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded text-xs font-medium transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        Move to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
