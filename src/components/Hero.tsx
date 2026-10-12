import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { ProductVisual } from './ProductVisual';
import { PRODUCTS } from '../data/products';

interface HeroProps {
  onExplore: () => void;
  onSelectProduct: (product: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onSelectProduct }) => {
  const featuredProduct = PRODUCTS[0]; // Komorebi Amber Lamp

  return (
    <section className="relative border-b border-stone-200/80 bg-[#faf9f6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Editorial Headline & Intent */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-widest font-medium text-stone-500">
              Autumn · Winter 2026 Collection
            </div>

            <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.12] [text-wrap:balance]">
              Objects shaped by patience, fire, and quiet geometry.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-light leading-relaxed max-w-xl">
              Handcrafted in historic pottery towns, glass ateliers, and heritage mills. 
              We curate tactile pieces designed to age with grace and inhabit everyday rituals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExplore}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-stone-900 text-stone-50 text-sm font-medium rounded-md hover:bg-stone-800 transition-all duration-200 shadow-sm active:scale-[0.99] whitespace-nowrap"
              >
                Explore Collection
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onSelectProduct(featuredProduct)}
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-stone-300 bg-white/60 hover:bg-white text-stone-800 text-sm font-medium rounded-md transition-colors whitespace-nowrap"
              >
                View Featured Lamp
              </button>
            </div>

            {/* Quiet Editorial Attribution */}
            <div className="pt-4 flex items-center gap-3 text-xs text-stone-500">
              <span>Featured Atelier</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-stone-700">Murano Glass &amp; Kyoto Brass</span>
              <span aria-hidden="true">·</span>
              <span>Limited to 80 numbered pieces</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onSelectProduct(featuredProduct)}
              className="group cursor-pointer relative rounded-2xl overflow-hidden border border-stone-200/90 bg-stone-100 shadow-sm transition-all duration-300 hover:shadow-md"
            >
              {/* Product Visual */}
              <div className="aspect-[4/3] sm:aspect-square relative">
                <ProductVisual product={featuredProduct} className="w-full h-full" />

                {/* Subtle Floating Label */}
                <div className="absolute top-4 left-4 bg-stone-900/85 backdrop-blur-md text-stone-100 px-3 py-1 rounded text-xs font-medium tracking-wide">
                  Signature Release
                </div>
              </div>

              {/* Card Footer Bar */}
              <div className="p-5 bg-white/95 border-t border-stone-200/80 flex items-center justify-between">
                <div>
                  <h3 className="font-editorial text-lg text-stone-900 group-hover:text-amber-800 transition-colors">
                    {featuredProduct.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {featuredProduct.materials.split(',')[0]}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-base font-semibold text-stone-900 tabular-nums">
                    ${featuredProduct.price}
                  </div>
                  <div className="text-[11px] text-stone-500 line-through tabular-nums">
                    ${featuredProduct.originalPrice}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Trust Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-700">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-stone-900">Small-Batch Production</span>
              <span className="text-stone-500">Strictly limited series</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Truck className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-stone-900">Carbon-Neutral Shipping</span>
              <span className="text-stone-500">Recycled pulp packaging</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-stone-900">30-Day In-Home Trial</span>
              <span className="text-stone-500">Complimentary returns</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck className="w-4 h-4 text-stone-500 shrink-0" />
            <div className="text-xs">
              <span className="font-semibold block text-stone-900">Lifetime Craft Warranty</span>
              <span className="text-stone-500">Repairable modular design</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
