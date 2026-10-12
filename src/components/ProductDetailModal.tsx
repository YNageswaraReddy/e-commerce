import React, { useState } from 'react';
import { X, Star, Heart, Check, Truck, Shield, ArrowRight, Share2 } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, color: ProductColor, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1800);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 1500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#faf9f6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Close / Share */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <button
            onClick={handleShare}
            title="Share object"
            className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/60 transition-colors shadow-sm"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-600 hover:text-stone-900 border border-stone-200/60 transition-colors shadow-sm"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Visual Gallery View */}
          <div className="md:col-span-6 bg-stone-100 flex flex-col items-center justify-center p-6 border-b md:border-b-0 md:border-r border-stone-200 relative min-h-[360px]">
            <div className="w-full aspect-square max-w-[340px]">
              <ProductVisual
                product={product}
                selectedColorHex={selectedColor.hex}
                className="w-full h-full rounded-xl"
              />
            </div>

            {/* Selected Color Name Marker */}
            <div className="mt-4 text-xs text-stone-500 font-medium">
              Variant: <span className="text-stone-800">{selectedColor.name}</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-stone-600">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-stone-800">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span className="font-medium tabular-nums">{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2 className="font-editorial text-2xl sm:text-3xl text-stone-900 leading-tight">
                {product.name}
              </h2>
              <p className="text-sm text-stone-500 mt-1 font-light">
                {product.tagline}
              </p>

              {/* Price & Stock Indicator */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-semibold text-stone-900 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  {product.stockCount} in stock
                </span>
              </div>

              {/* Color Variant Picker */}
              <div className="mt-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-2">
                  Finish / Shade: <span className="font-normal text-stone-600">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`group relative p-1 rounded-full transition-all ${
                        selectedColor.name === color.name
                          ? 'ring-2 ring-stone-900 ring-offset-2'
                          : 'hover:ring-1 hover:ring-stone-400'
                      }`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-stone-300"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Add to Bag CTA */}
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center border border-stone-300 rounded-lg bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 text-sm"
                  >
                    –
                  </button>
                  <span className="px-2 text-sm font-medium tabular-nums min-w-[1.5rem] text-center text-stone-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                    className="px-3 py-2 text-stone-600 hover:text-stone-900 disabled:opacity-30 text-sm"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-5 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm ${
                    addedAnimation
                      ? 'bg-emerald-700 text-white'
                      : 'bg-stone-900 text-white hover:bg-stone-800'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <span>Add to Bag</span>
                      <span className="opacity-75">·</span>
                      <span className="font-mono tabular-nums">${product.price * quantity}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Save to wishlist"
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-stone-300 bg-white text-stone-600 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-4 pt-4 border-t border-stone-200/70 grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Dispatches in 24–48h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-stone-500" />
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>

            {/* Informational Tabs (Specifications, Provenance, Reviews) */}
            <div className="pt-4 border-t border-stone-200">
              <div className="flex items-center gap-4 text-xs font-medium border-b border-stone-200 pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'details'
                      ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'materials'
                      ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Materials &amp; Specs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-stone-900 border-b-2 border-stone-900 font-semibold'
                      : 'text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              <div className="pt-3 text-xs text-stone-600 leading-relaxed min-h-[90px]">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p>{product.description}</p>
                    <div className="text-[11px] text-stone-500 pt-1">
                      Origin: <span className="text-stone-700">{product.origin}</span>
                    </div>
                  </div>
                )}

                {activeTab === 'materials' && (
                  <div className="space-y-1.5">
                    <div>
                      <span className="font-semibold text-stone-700">Composition: </span>
                      {product.materials}
                    </div>
                    <div>
                      <span className="font-semibold text-stone-700">Dimensions: </span>
                      {product.dimensions}
                    </div>
                    <div className="text-[11px] text-stone-500 pt-1">
                      Care: Wipe with damp microfiber cloth. Store away from direct sunlight.
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3 max-h-36 overflow-y-auto pr-1">
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="border-b border-stone-100 pb-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-stone-800">{rev.author}</span>
                          <span className="text-stone-400">{rev.date}</span>
                        </div>
                        <p className="mt-1 text-stone-600">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
