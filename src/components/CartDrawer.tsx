import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Sparkles, Tag, Check } from 'lucide-react';
import { CartItem } from '../types';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, colorName: string, delta: number) => void;
  onRemoveItem: (productId: string, colorName: string) => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
  discountRate: number;
  promoCode: string;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onContinueShopping,
  discountRate,
  promoCode,
  onApplyPromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 150;
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * discountRate);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || promoCode === 'FREESHIP';
  const shippingCost = items.length === 0 ? 0 : isFreeShipping ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (success) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "WELCOME15"');
      setPromoSuccess(false);
    }
  };

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
          <div className="p-5 border-b border-stone-200/90 flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-stone-800" />
              <h2 className="font-editorial text-xl font-normal text-stone-900">
                Your Selection
              </h2>
              <span className="text-xs font-mono text-stone-500 tabular-nums">
                ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart"
              className="p-1.5 rounded-md text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-stone-50 px-5 py-3 border-b border-stone-200/80">
              <div className="flex items-center justify-between text-xs text-stone-700 mb-1.5 font-medium">
                {isFreeShipping ? (
                  <span className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    Complimentary dispatch unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="tabular-nums font-semibold">${amountToFreeShipping}</strong> more for complimentary delivery
                  </span>
                )}
                <span className="text-[11px] font-mono text-stone-500 tabular-nums">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 rounded-full ${
                    isFreeShipping ? 'bg-emerald-700' : 'bg-stone-800'
                  }`}
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-editorial text-lg text-stone-900 mb-1">
                  Your bag is currently empty
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mb-6">
                  Explore our collection of handcrafted lighting, ceramics, and daily design objects.
                </p>
                <button
                  onClick={onContinueShopping}
                  className="px-5 py-2.5 bg-stone-900 text-stone-50 text-xs font-medium rounded-md hover:bg-stone-800 transition-colors"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="flex gap-4 p-3 bg-white rounded-xl border border-stone-200/80 shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-stone-100 bg-stone-100 relative">
                    <ProductVisual
                      product={item.product}
                      selectedColorHex={item.selectedColor.hex}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-editorial text-sm font-medium text-stone-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-stone-300"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          <span>{item.selectedColor.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.product.id, item.selectedColor.name)}
                        className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-200 rounded bg-stone-50 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, -1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-medium"
                        >
                          –
                        </button>
                        <span className="px-2 font-mono tabular-nums text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.selectedColor.name, 1)}
                          className="px-2 py-0.5 text-stone-600 hover:text-stone-950 font-medium"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-sm font-semibold text-stone-900 font-mono tabular-nums">
                        ${item.product.price * item.quantity}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200/90 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => {
                      setPromoInput(e.target.value);
                      setPromoError('');
                    }}
                    placeholder="Promo code (e.g. WELCOME15)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-300 rounded focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-800 rounded transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoSuccess && (
                <div className="text-xs text-emerald-700 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Promo code applied successfully!</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-rose-600">{promoError}</div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100 font-normal">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-stone-900">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount ({discountRate * 100}%)</span>
                    <span className="font-mono tabular-nums">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-mono tabular-nums text-stone-900">
                    {shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-stone-200 text-sm font-semibold text-stone-900">
                  <span>Total</span>
                  <span className="font-mono tabular-nums">${total}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-lg flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-stone-400">
                Taxes calculated at next step · 30-day trial guarantee
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
