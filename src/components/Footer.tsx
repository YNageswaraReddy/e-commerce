import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#1c1917] text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14 pb-14 border-b border-stone-800/80">
          {/* Brand & Manifesto (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-editorial text-2xl tracking-tight text-white block">
              LUMEN &amp; OAK
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              An independent studio dedicated to the tactile culture of living. Curating stoneware, warm architectural lighting, pure flax textiles, and acoustic objects.
            </p>
            <div className="pt-2 text-[11px] text-stone-500 font-mono">
              KYOTO · STOCKHOLM · PORTLAND
            </div>
          </div>

          {/* Quick Links (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Lighting &amp; Glass</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Wheel-Thrown Ceramics</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Belgian Linen</a></li>
              <li><a href="#collection-grid" className="hover:text-white transition-colors">Solid Brass Objects</a></li>
              <li><a href="#craft-story" className="hover:text-white transition-colors">Atelier Archive</a></li>
            </ul>
          </div>

          {/* Care & Service (2 Cols) */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              Client Service
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li><span className="hover:text-white transition-colors cursor-pointer">Shipping &amp; Duties</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">30-Day Home Trial</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Material Care Guide</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Trade &amp; Architecture</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Warranty &amp; Repairs</span></li>
            </ul>
          </div>

          {/* Newsletter / The Slow Journal (3 Cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-wider text-stone-200 font-semibold">
              The Slow Journal
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Quiet dispatches on ceramic history, seasonal recipes, and release invitations.
            </p>

            {subscribed ? (
              <div className="p-3 bg-stone-800/80 rounded-lg border border-stone-700 text-xs text-emerald-400 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>You are subscribed to the journal.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full text-xs px-3 py-2.5 bg-stone-800/90 border border-stone-700 rounded-md text-stone-100 placeholder-stone-500 focus:outline-none focus:border-stone-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-stone-700 hover:bg-stone-600 text-white rounded transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[10px] text-stone-500">
                  No promotional spam. You can unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            &copy; {new Date().getFullYear()} LUMEN &amp; OAK Atelier Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-stone-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-stone-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-stone-400 cursor-pointer">Carbon Offset Audit</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
