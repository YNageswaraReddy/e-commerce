import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'lumen-pendant-01',
    name: 'Komorebi Amber Lamp',
    tagline: 'Hand-blown fluted amber glass with solid brushed brass dimmer base',
    category: 'Lighting',
    price: 185,
    originalPrice: 220,
    rating: 4.9,
    reviewCount: 38,
    description:
      'Inspired by the dappled play of sunlight filtering through cedar leaves. The Komorebi lamp features mouth-blown borosilicate glass with tactile micro-ribbing, casting warm radial caustic refractions across surfaces. Finished with a heavy spun brass base and integrated step-free touch dimmer.',
    materials: 'Mouth-blown tinted glass, brushed architectural brass, braided cotton cord',
    dimensions: '22 cm (H) × 16 cm (W) · Weight: 1.4 kg',
    origin: 'Handcrafted in Murano & assembled in Kyoto',
    inStock: true,
    stockCount: 14,
    badge: 'Signature',
    visualType: 'lamp',
    colors: [
      { name: 'Warm Amber', hex: '#d97706' },
      { name: 'Smoked Obsidian', hex: '#44403c' },
      { name: 'Frosted Opal', hex: '#e7e5e4' }
    ],
    accentGradient: 'from-amber-100/60 to-orange-50/40',
    reviews: [
      {
        id: 'r1',
        author: 'Evelyn V.',
        rating: 5,
        date: 'Oct 2, 2026',
        comment: 'The glass thickness and ambient glow transformed our study. The smooth brass dimmer feels exceedingly satisfying.',
        verified: true
      },
      {
        id: 'r2',
        author: 'Julian M.',
        rating: 5,
        date: 'Sep 24, 2026',
        comment: 'Heavier and more substantial than expected. The subtle ribbing creates magical shadows on the wall.',
        verified: true
      }
    ]
  },
  {
    id: 'ceramic-vase-02',
    name: 'Sora Fluted Stoneware Vase',
    tagline: 'Wheel-thrown porous stoneware with volcanic slip and matte glaze',
    category: 'Ceramics',
    price: 110,
    rating: 4.8,
    reviewCount: 29,
    description:
      'Individually thrown using iron-rich coarse clay on a slow kick-wheel. Each Sora vessel undergoes a 48-hour wood firing at 1,280°C, creating subtle organic gradation in tone and tactile sand-like tooth. Designed for solitary branches, dried grasses, or sculptural Ikebana arrangements.',
    materials: 'High-fire stoneware clay, natural wood-ash glaze',
    dimensions: '28 cm (H) × 12 cm (W) · Rim: 4 cm',
    origin: 'Mashiko, Tochigi Prefecture',
    inStock: true,
    stockCount: 9,
    badge: 'Limited Run',
    visualType: 'vase',
    colors: [
      { name: 'Raw Sandstone', hex: '#d6c7b2' },
      { name: 'Charcoal Basalt', hex: '#292524' },
      { name: 'Terracotta Rust', hex: '#9a3412' }
    ],
    accentGradient: 'from-stone-100/80 to-stone-200/40',
    reviews: [
      {
        id: 'r3',
        author: 'Clara S.',
        rating: 5,
        date: 'Sep 18, 2026',
        comment: 'The unglazed tactile finish feels alive in your hands. Truly one-of-a-kind craft.',
        verified: true
      }
    ]
  },
  {
    id: 'linen-throw-03',
    name: 'Waffle Weave Belgian Linen Throw',
    tagline: 'Stone-washed flax linen with double-layered thermal honeycomb structure',
    category: 'Textiles',
    price: 145,
    rating: 4.9,
    reviewCount: 46,
    description:
      'Woven from 100% certified European flax linen using traditional dobby looms in Flanders. Pre-washed with natural river pumice stones for deep, broken-in softness without compromising the enduring resilience of the flax bast fiber. Naturally breathable, anti-static, and temperature-regulating year-round.',
    materials: '100% Certified Masters of Linen® European Flax (340 GSM)',
    dimensions: '140 cm × 200 cm (Generous King/Duo size)',
    origin: 'Woven in Kortrijk, Belgium',
    inStock: true,
    stockCount: 22,
    badge: 'Best Seller',
    visualType: 'throw',
    colors: [
      { name: 'Oatmeal Natural', hex: '#d4c5b9' },
      { name: 'Eucalyptus Sage', hex: '#828e82' },
      { name: 'Deep Indigo', hex: '#1e293b' }
    ],
    accentGradient: 'from-stone-100 to-amber-50/30',
    reviews: [
      {
        id: 'r4',
        author: 'Marcus L.',
        rating: 5,
        date: 'Oct 8, 2026',
        comment: 'Drapes with a generous, weighty feel. Gets even softer after each gentle wash.',
        verified: true
      }
    ]
  },
  {
    id: 'audio-speaker-04',
    name: 'Resonanz Aluminum Audio Cylinder',
    tagline: 'Precision-machined acoustic enclosure with custom neodymium driver',
    category: 'Audio & Objects',
    price: 260,
    originalPrice: 295,
    rating: 5.0,
    reviewCount: 24,
    description:
      'Engineered with an acoustic monocoque chassis milled from a solid billet of aerospace-grade 6061 aluminum to eliminate cabinet resonance. Features custom tuned 58mm full-range driver paired with opposing passive dual radiators for surprisingly deep, non-fatiguing spatial fidelity.',
    materials: 'Bead-blasted anodized aluminum, woven acoustic Kvadrat wool, silicone dampening base',
    dimensions: '18 cm (H) × 9 cm (Diameter) · Weight: 1.1 kg',
    origin: 'Precision milled in Stuttgart, Germany',
    inStock: true,
    stockCount: 7,
    badge: 'New Release',
    visualType: 'speaker',
    colors: [
      { name: 'Graphite Anodized', hex: '#334155' },
      { name: 'Raw Silver', hex: '#cbd5e1' },
      { name: 'Forest Moss', hex: '#365314' }
    ],
    accentGradient: 'from-slate-100 to-zinc-200/50',
    reviews: [
      {
        id: 'r5',
        author: 'Henrik T.',
        rating: 5,
        date: 'Oct 5, 2026',
        comment: 'The industrial tolerances are surgical. Vocals and acoustic guitars sound right there in the room.',
        verified: true
      }
    ]
  },
  {
    id: 'ceramic-carafe-05',
    name: 'Duo Pouring Carafe & Cup Set',
    tagline: 'Minimalist ergonomic vessel with unglazed grip band and pouring lip',
    category: 'Ceramics',
    price: 92,
    rating: 4.7,
    reviewCount: 19,
    description:
      'Designed for slow morning rituals—pour-over coffee, steeped oolong tea, or chilled botanical infusions. The ergonomic indentation fits comfortably in one hand, while the raw textured exterior contrasts gracefully against the glazed silk interior that never absorbs aromas.',
    materials: 'Semi-vitreous porcelain stoneware, food-safe silk dolomite glaze',
    dimensions: 'Carafe: 650 ml · Cup: 180 ml',
    origin: 'Seto, Aichi Prefecture',
    inStock: true,
    stockCount: 18,
    visualType: 'carafe',
    colors: [
      { name: 'Chalk White', hex: '#f5f5f4' },
      { name: 'Warm Dune', hex: '#d6d3d1' },
      { name: 'Slate Clay', hex: '#57534e' }
    ],
    accentGradient: 'from-amber-50/50 to-stone-100',
    reviews: [
      {
        id: 'r6',
        author: 'Siddharth P.',
        rating: 5,
        date: 'Sep 29, 2026',
        comment: 'Pours with zero drips. The tactile contrast between unglazed outer and smooth inner is perfection.',
        verified: true
      }
    ]
  },
  {
    id: 'brass-tray-06',
    name: 'Kanso Solid Brass Valet Tray',
    tagline: 'Single-sheet cold-pressed raw brass with hand-patinated edges',
    category: 'Audio & Objects',
    price: 78,
    rating: 4.8,
    reviewCount: 31,
    description:
      'Formed from a continuous 2mm solid brass sheet with softened radii and hand-beveled edges. Left untreated without synthetic lacquers so it will develop an intimate, organic golden patina uniquely reflecting your daily touch, keys, and heirloom timepiece.',
    materials: 'Solid unlacquered cartridge brass (C26000)',
    dimensions: '24 cm (L) × 14 cm (W) × 1.8 cm (H) · Weight: 680 g',
    origin: 'Crafted in Birmingham, UK',
    inStock: true,
    stockCount: 12,
    visualType: 'tray',
    colors: [
      { name: 'Natural Brushed Brass', hex: '#ca8a04' },
      { name: 'Aged Bronze Patina', hex: '#713f12' }
    ],
    accentGradient: 'from-amber-100/40 to-yellow-50/30',
    reviews: [
      {
        id: 'r7',
        author: 'Beatrice K.',
        rating: 5,
        date: 'Sep 12, 2026',
        comment: 'It rests on my entryway table with tremendous presence. The weight keeps it completely steady.',
        verified: true
      }
    ]
  },
  {
    id: 'ceramic-mug-07',
    name: 'Hasami Ritual Coffee Tumbler (Pair)',
    tagline: 'Stackable straight-sided modular stoneware with unglazed raw foot',
    category: 'Ceramics',
    price: 64,
    rating: 4.9,
    reviewCount: 52,
    description:
      'Crafted in Hasami, Nagasaki—a historic pottery town with over 400 years of ceramic lineage. The signature mixture of crushed stone and clay yields a dense, earthy material that maintains drink temperature while remaining lightweight and comfortably textured.',
    materials: 'Natural Hasami Amakusa crushed stone and clay blend',
    dimensions: 'Set of 2 · Capacity: 320 ml each · Stackable',
    origin: 'Hasami, Nagasaki Prefecture',
    inStock: true,
    stockCount: 26,
    badge: 'Signature',
    visualType: 'mug',
    colors: [
      { name: 'Gloss Celadon', hex: '#bbf7d0' },
      { name: 'Matte Sand', hex: '#e7e5e4' },
      { name: 'Iron Black', hex: '#1c1917' }
    ],
    accentGradient: 'from-stone-50 to-emerald-50/20',
    reviews: [
      {
        id: 'r8',
        author: 'Arlo D.',
        rating: 5,
        date: 'Oct 9, 2026',
        comment: 'My morning coffee has never tasted cleaner. They stack neatly and the lip curve is pure joy.',
        verified: true
      }
    ]
  },
  {
    id: 'wax-candle-08',
    name: 'Hinoki & Smoked Vetiver Botanical Vessel',
    tagline: 'Rapeseed & soy wax candle in reusable hand-cast terracotta beaker',
    category: 'Lighting',
    price: 52,
    rating: 4.9,
    reviewCount: 41,
    description:
      'Poured by hand in small batches of 30. Notes of Japanese mountain cypress (Hinoki), crushed black pepper, cedar needles, and earthy Haitian vetiver. Housed in a hand-thrown terracotta beaker that can be washed and repurposed as an espresso cup or succulent planter after its 65-hour clean burn.',
    materials: '100% GMO-free European rapeseed & soy wax, unbleached cotton wick, hand-cast terracotta',
    dimensions: '290 g · 65 hour burn time · 9.5 cm (H) × 8 cm (W)',
    origin: 'Cast & poured in Provence, France',
    inStock: true,
    stockCount: 16,
    badge: 'Limited Run',
    visualType: 'candle',
    colors: [
      { name: 'Raw Terracotta', hex: '#c2410c' },
      { name: 'Smoked Ash', hex: '#44403c' }
    ],
    accentGradient: 'from-orange-50 to-stone-100',
    reviews: [
      {
        id: 'r9',
        author: 'Sienna R.',
        rating: 5,
        date: 'Oct 3, 2026',
        comment: 'The scent fills the living room without any synthetic headache. The terracotta vessel is a work of art on its own.',
        verified: true
      }
    ]
  }
];

export const CATEGORIES = ['All', 'Lighting', 'Ceramics', 'Textiles', 'Audio & Objects'] as const;
