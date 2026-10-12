import React from 'react';
import { Compass, Flame, Leaf, Award } from 'lucide-react';

export const CraftStory: React.FC = () => {
  return (
    <section id="craft-story" className="py-20 bg-stone-900 text-stone-100 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3">
            Atelier Philosophy &amp; Material Ethics
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight [text-wrap:balance]">
            Reclaiming tactile permanence in a disposable world.
          </h2>
          <p className="mt-4 text-stone-300 text-base leading-relaxed font-light">
            Every object in our collection begins with single-origin raw materials: unrefined iron clay, virgin spun brass, European stone-washed flax, and mouth-blown borosilicate glass. We partner directly with historic family ateliers rather than mass manufacturing conglomerates.
          </p>
        </div>

        {/* 3 Craft Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-stone-800">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-300">
              <Flame className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl text-white font-normal">
              1,280°C High-Fire Firing
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Our stoneware vessels are kiln-fired for 48 uninterrupted hours using native pinewood ash. The intense heat vitrifies the clay into dense, non-porous stone that resists chipping for decades.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-300">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl text-white font-normal">
              Living Patina &amp; Honest Metals
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              We never apply artificial chemical lacquers to brass or bronze. As you handle our trays and lamp bases, natural oxidation develops a rich, golden patina unique to your personal home environment.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-10 h-10 rounded-lg bg-stone-800 flex items-center justify-center text-amber-300">
              <Leaf className="w-5 h-5" />
            </div>
            <h3 className="font-editorial text-xl text-white font-normal">
              100% Plastic-Free Packaging
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed font-light">
              Every shipment is cradled in biodegradable molded cellulose pulp, water-activated paper tape, and unbleached cotton dust bags that can be reused for wardrobe storage or produce.
            </p>
          </div>
        </div>

        {/* Atelier Quote Callout */}
        <div className="mt-16 p-8 rounded-2xl bg-stone-800/60 border border-stone-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs text-stone-400 uppercase tracking-widest font-mono">
              Mashiko Artisan Guild · Established 1853
            </div>
            <p className="font-editorial text-lg text-stone-200 italic font-light">
              &ldquo;When a vessel is made with true patience, you do not merely see its shape—your hands remember its quiet presence.&rdquo;
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3 text-xs text-stone-400">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Certified Heritage Craft Guild Member</span>
          </div>
        </div>
      </div>
    </section>
  );
};
