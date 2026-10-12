import React, { useState } from 'react';
import { Heart, Plus, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <article
      onClick={() => onSelect(product)}
      className="group cursor-pointer flex flex-col bg-white border border-stone-200/90 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-stone-300"
    >
      {/* Visual Canvas (takes ~65%-70% of height) */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden border-b border-stone-100">
        <ProductVisual
          product={product}
          selectedColorHex={selectedColor.hex}
          className="w-full h-full"
        />

        {/* Top Badges / Tags (Zero-Pill Discipline: At most 1 subtle tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-sm text-stone-100 text-[11px] font-medium px-2.5 py-1 rounded">
            {product.badge}
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleHeartClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors backdrop-blur-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 shadow-sm'
              : 'bg-white/80 text-stone-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Bottom Quick-Add Bar that glides in on card hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 shadow-md transition-all duration-200 ${
              justAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add · ${product.price}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata with Typographic Separator */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>★ {product.rating.toFixed(1)}</span>
            <span className="text-stone-400">({product.reviewCount})</span>
          </div>

          {/* Product Title */}
          <h3 className="font-editorial text-lg font-normal text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Subtle Tagline */}
          <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Bar: Color Swatches & Price */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          {/* Interactive Color Swatches */}
          <div
            className="flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {product.colors.map((c) => (
              <button
                key={c.name}
                title={c.name}
                onClick={() => setSelectedColor(c)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-stone-900 ring-offset-1 border-transparent scale-110'
                    : 'border-stone-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>

          {/* Price Alignment */}
          <div className="flex items-baseline gap-2">
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
            <span className="text-sm font-semibold text-stone-900 tabular-nums">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};
