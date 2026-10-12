import React, { useState } from 'react';
import { X, Lock, CheckCircle2, CreditCard, Truck, ArrowLeft, Shield } from 'lucide-react';
import { CartItem, OrderDetails } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    fullName: 'Clara Vance',
    email: 'clara.vance@example.com',
    phone: '+1 (555) 234-5678',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'Portland',
    postalCode: '97201',
    country: 'United States',
    paymentMethod: 'credit_card',
    cardNumber: '•••• •••• •••• 4821',
    cardExp: '08/28',
    cardCvc: '412',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder: OrderDetails = {
        orderId: `LO-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items,
        subtotal,
        discount,
        shipping,
        tax: Math.round(subtotal * 0.08),
        total: total + Math.round(subtotal * 0.08),
        shippingAddress: {
          fullName: formData.fullName,
          email: formData.email,
          street: formData.street,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod:
          formData.paymentMethod === 'credit_card'
            ? 'Credit Card ending in 4821'
            : 'Cash on Delivery (Verified)',
      };

      onOrderSuccess(generatedOrder);
    }, 1000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#faf9f6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-stone-700" />
            <h2 className="font-editorial text-xl font-normal text-stone-900">
              Secure Checkout
            </h2>
            <span className="text-xs text-stone-400">· 256-bit SSL</span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close checkout"
            className="p-1.5 rounded-md text-stone-400 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-stone-100 px-6 py-2.5 border-b border-stone-200 flex items-center gap-4 text-xs">
          <div className={`flex items-center gap-1.5 font-medium ${step === 1 ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}>
              1
            </span>
            <span>Shipping Destination</span>
          </div>
          <span className="text-stone-300">/</span>
          <div className={`flex items-center gap-1.5 font-medium ${step === 2 ? 'text-stone-900 font-semibold' : 'text-stone-500'}`}>
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-700'}`}>
              2
            </span>
            <span>Payment &amp; Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[75vh] overflow-y-auto">
          {/* Main Form (8 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6">
            {step === 1 ? (
              <form onSubmit={handleProceedToPayment} className="space-y-4">
                <h3 className="font-editorial text-lg text-stone-900">
                  Recipient &amp; Delivery Address
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Email for Receipt
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Street Address &amp; Suite / Apt
                  </label>
                  <input
                    type="text"
                    name="street"
                    required
                    value={formData.street}
                    onChange={handleInputChange}
                    className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Country
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                    >
                      <option>United States</option>
                      <option>United Kingdom</option>
                      <option>Canada</option>
                      <option>Germany</option>
                      <option>Japan</option>
                      <option>Australia</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone (for courier delivery notifications)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900 focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <button
                    type="submit"
                    className="w-full py-3 bg-stone-900 text-stone-50 text-xs font-medium rounded-lg hover:bg-stone-800 transition-colors shadow-sm"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-editorial text-lg text-stone-900">
                    Payment Method
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Edit Address
                  </button>
                </div>

                {/* Payment Selection Options */}
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white border border-stone-300 rounded-lg cursor-pointer hover:border-stone-900 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                      className="text-stone-900"
                    />
                    <CreditCard className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-medium text-stone-800">
                      Credit or Debit Card
                    </span>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-stone-300 rounded-lg cursor-pointer hover:border-stone-900 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="text-stone-900"
                    />
                    <Truck className="w-4 h-4 text-stone-700" />
                    <span className="text-xs font-medium text-stone-800">
                      Cash on Delivery (Pay upon delivery inspect)
                    </span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit_card' && (
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-lg space-y-3">
                    <div>
                      <label className="block text-[11px] font-medium text-stone-600 mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Expiration (MM/YY)
                        </label>
                        <input
                          type="text"
                          name="cardExp"
                          value={formData.cardExp}
                          onChange={handleInputChange}
                          className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-stone-600 mb-1">
                          Security CVC
                        </label>
                        <input
                          type="text"
                          name="cardCvc"
                          value={formData.cardCvc}
                          onChange={handleInputChange}
                          className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-stone-500 bg-stone-100 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-stone-700 shrink-0" />
                  <span>
                    Your purchase is protected by our 30-day handcrafted satisfaction guarantee.
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-stone-50 text-xs font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isSubmitting ? (
                      <span>Authorizing Secure Transaction...</span>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Place Order · ${total + Math.round(subtotal * 0.08)}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar (5 Cols) */}
          <div className="md:col-span-5 bg-stone-100/70 p-6 sm:p-8 border-t md:border-t-0 md:border-l border-stone-200 flex flex-col justify-between">
            <div>
              <h4 className="font-editorial text-sm font-medium text-stone-900 mb-4">
                Order Summary ({items.length} items)
              </h4>

              <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                {items.map((it) => (
                  <div
                    key={`${it.product.id}-${it.selectedColor.name}`}
                    className="flex justify-between items-center text-xs"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-medium text-stone-800 truncate">
                        {it.product.name}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        Qty {it.quantity} · {it.selectedColor.name}
                      </p>
                    </div>
                    <span className="font-mono tabular-nums text-stone-900 shrink-0">
                      ${it.product.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-stone-200 space-y-2 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono tabular-nums text-stone-900">${subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount</span>
                  <span className="font-mono tabular-nums">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono tabular-nums text-stone-900">
                  {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span className="font-mono tabular-nums text-stone-900">
                  ${Math.round(subtotal * 0.08)}
                </span>
              </div>
              <div className="flex justify-between pt-3 border-t border-stone-300 text-sm font-semibold text-stone-900">
                <span>Final Total</span>
                <span className="font-mono tabular-nums">
                  ${total + Math.round(subtotal * 0.08)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
