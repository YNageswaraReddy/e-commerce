import React from 'react';
import { Check, Package, Clock, Truck, Home, Download } from 'lucide-react';
import { OrderDetails } from '../types';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative w-full max-w-2xl bg-[#faf9f6] rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-6">
        {/* Top Celebration Banner */}
        <div className="bg-stone-900 text-stone-100 p-8 text-center relative">
          <div className="w-12 h-12 bg-emerald-600/90 text-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
            <Check className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div className="text-xs uppercase tracking-widest text-stone-400 font-medium">
            Order Confirmed · Preparing Shipment
          </div>
          <h2 className="font-editorial text-3xl font-normal mt-1 text-white">
            Thank you, {order.shippingAddress.fullName.split(' ')[0]}
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            Order Reference <span className="font-mono text-white font-semibold">{order.orderId}</span>
          </p>
        </div>

        {/* Fulfillment Timeline */}
        <div className="bg-stone-50 px-6 py-4 border-b border-stone-200">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-3 text-center">
            Estimated Delivery: 3–5 Business Days
          </div>
          <div className="flex items-center justify-between text-xs text-stone-700 max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center mb-1">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[11px]">Placed</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-900 mx-2" />
            <div className="flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-full bg-stone-900 text-white flex items-center justify-center mb-1">
                <Package className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-[11px]">Inspecting</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-300 mx-2" />
            <div className="flex flex-col items-center text-center text-stone-400">
              <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center mb-1">
                <Truck className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px]">Dispatched</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-300 mx-2" />
            <div className="flex flex-col items-center text-center text-stone-400">
              <div className="w-7 h-7 rounded-full bg-stone-200 flex items-center justify-center mb-1">
                <Home className="w-3.5 h-3.5" />
              </div>
              <span className="text-[11px]">Arrived</span>
            </div>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[50vh] overflow-y-auto">
          {/* Order Details Grid */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-stone-200">
            <div>
              <span className="text-stone-400 block mb-0.5">Delivery Address</span>
              <p className="font-medium text-stone-900">{order.shippingAddress.fullName}</p>
              <p className="text-stone-600">{order.shippingAddress.street}</p>
              <p className="text-stone-600">
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}
              </p>
              <p className="text-stone-600">{order.shippingAddress.country}</p>
            </div>
            <div>
              <span className="text-stone-400 block mb-0.5">Payment &amp; Date</span>
              <p className="font-medium text-stone-900">{order.paymentMethod}</p>
              <p className="text-stone-600 mt-1">Date: {order.date}</p>
              <p className="text-stone-600">Confirmation sent to: {order.shippingAddress.email}</p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <h4 className="font-editorial text-sm text-stone-900">
              Items Purchased
            </h4>
            <div className="border border-stone-200 rounded-xl overflow-hidden divide-y divide-stone-100 bg-white">
              {order.items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="p-3 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-medium text-stone-900">{item.product.name}</span>
                    <span className="text-stone-500 block text-[11px]">
                      Variant: {item.selectedColor.name} · Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono tabular-nums font-semibold text-stone-900">
                    ${item.product.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Breakdown */}
          <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-mono tabular-nums text-stone-900">${order.subtotal}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Discount applied</span>
                <span className="font-mono tabular-nums">-${order.discount}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="font-mono tabular-nums text-stone-900">
                {order.shipping === 0 ? 'Complimentary' : `$${order.shipping}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (Included)</span>
              <span className="font-mono tabular-nums text-stone-900">${order.tax}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-stone-300 text-sm font-semibold text-stone-900">
              <span>Total Paid</span>
              <span className="font-mono tabular-nums">${order.total}</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-white border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 border border-stone-300 rounded-md hover:bg-stone-50 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Print Receipt
          </button>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-50 text-xs font-medium rounded-md transition-colors"
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};
