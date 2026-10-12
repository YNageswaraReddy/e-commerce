import React from 'react';
import { Product } from '../types';

interface ProductVisualProps {
  product: Product;
  selectedColorHex?: string;
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedColorHex,
  className = 'w-full h-full'
}) => {
  const activeColor = selectedColorHex || product.colors[0]?.hex || '#d97706';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden select-none transition-colors duration-500 bg-stone-100/70 ${className}`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.85) 0%, rgba(240,237,232,0.9) 70%, rgba(225,220,212,0.95) 100%)'
      }}
    >
      {/* Soft Studio Floor Reflection & Drop Shadow */}
      <div
        className="absolute bottom-6 w-3/5 h-6 rounded-full blur-md opacity-35 transition-all duration-300"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30,25,20,0.6) 0%, rgba(40,30,20,0) 70%)'
        }}
      />

      {/* SVG Vector Rendering tailored per visual type */}
      {product.visualType === 'lamp' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ambient Glow */}
          <circle cx="100" cy="90" r="50" fill={activeColor} opacity="0.22" filter="blur(20px)" />

          {/* Lamp Glass Dome */}
          <path
            d="M50 115 C50 60, 150 60, 150 115 C150 120, 50 120, 50 115 Z"
            fill={activeColor}
            fillOpacity="0.82"
          />
          {/* Glass Ribbing Highlights */}
          <path d="M70 76 Q78 100 80 116" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 64 Q100 95 100 118" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" />
          <path d="M130 76 Q122 100 120 116" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />

          {/* Inner Filament Bulb */}
          <circle cx="100" cy="98" r="14" fill="#fffbeb" opacity="0.95" />
          <path d="M96 94 Q100 88 104 94" stroke="#d97706" strokeWidth="1.5" />

          {/* Lamp Stem & Brushed Base */}
          <rect x="94" y="118" width="12" height="42" fill="#78716c" rx="2" />
          <rect x="96" y="118" width="4" height="42" fill="#d6d3d1" opacity="0.6" />

          {/* Solid Heavy Base */}
          <path d="M68 160 C68 156, 132 156, 132 160 L140 188 C140 192, 60 192, 60 188 Z" fill="#44403c" />
          <path d="M72 161 L128 161" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
          {/* Dimmer Knob */}
          <circle cx="100" cy="176" r="4.5" fill="#ca8a04" stroke="#854d0e" strokeWidth="1" />
        </svg>
      )}

      {product.visualType === 'vase' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stem / Dried Branch */}
          <path d="M100 80 Q96 40 112 18" stroke="#78716c" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M106 36 Q118 32 126 38" stroke="#78716c" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="128" cy="38" r="4" fill="#ca8a04" opacity="0.9" />
          <circle cx="114" cy="18" r="3.5" fill="#ca8a04" opacity="0.8" />

          {/* Stoneware Vase Silhouette */}
          <path
            d="M86 80 C86 78, 114 78, 114 80 L112 96 C140 120, 144 170, 126 195 C118 205, 82 205, 74 195 C56 170, 60 120, 88 96 Z"
            fill={activeColor}
          />
          {/* Tactile Texture / Shadow Contour */}
          <path
            d="M86 80 C86 78, 114 78, 114 80 L112 96 C140 120, 144 170, 126 195"
            stroke="rgba(0,0,0,0.18)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Rim Opening */}
          <ellipse cx="100" cy="80" rx="14" ry="4" fill="rgba(0,0,0,0.2)" />
          {/* Subtle Vertical Ribbing Highlights */}
          <path d="M92 105 Q86 145 92 185" stroke="rgba(255,255,255,0.22)" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 102 Q100 148 100 190" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {product.visualType === 'throw' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stacked / Folded Belgian Linen */}
          {/* Base Fold */}
          <rect x="42" y="148" width="116" height="38" rx="10" fill={activeColor} opacity="0.85" />
          {/* Middle Fold */}
          <rect x="48" y="118" width="104" height="36" rx="8" fill={activeColor} />
          {/* Top Fold */}
          <rect x="54" y="90" width="92" height="34" rx="8" fill={activeColor} opacity="0.95" />

          {/* Draping Edge Accent */}
          <path d="M136 94 C152 110, 150 150, 158 178" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
          {/* Waffle Micro-texture lines */}
          <line x1="58" y1="102" x2="138" y2="102" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="58" y1="110" x2="138" y2="110" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="52" y1="130" x2="148" y2="130" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="52" y1="138" x2="148" y2="138" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="46" y1="160" x2="154" y2="160" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Fringe Tassels */}
          <path d="M46 182 L42 192 M52 182 L49 192 M58 182 L56 192 M64 182 L63 192" stroke="rgba(0,0,0,0.25)" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {product.visualType === 'speaker' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Aluminum Audio Cylinder Body */}
          <rect x="68" y="55" width="64" height="130" rx="32" fill={activeColor} />
          {/* Brushed metallic highlight */}
          <rect x="74" y="58" width="12" height="124" rx="6" fill="rgba(255,255,255,0.25)" />
          {/* Acoustic Grille Matrix */}
          <ellipse cx="100" cy="115" rx="20" ry="20" fill="rgba(0,0,0,0.25)" />
          <circle cx="100" cy="115" r="14" fill="#0f172a" />
          <circle cx="100" cy="115" r="6" fill="rgba(255,255,255,0.4)" />
          {/* Top Control Dial */}
          <ellipse cx="100" cy="55" rx="32" ry="7" fill="rgba(255,255,255,0.3)" />
          <circle cx="100" cy="54" r="3.5" fill="#f8fafc" />
          {/* Bottom Foot Rim */}
          <ellipse cx="100" cy="182" rx="28" ry="4" fill="rgba(0,0,0,0.3)" />
        </svg>
      )}

      {product.visualType === 'carafe' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Carafe Body */}
          <path
            d="M86 64 C86 62, 114 62, 114 64 L110 88 C128 106, 134 148, 122 178 C116 190, 84 190, 78 178 C66 148, 72 106, 90 88 Z"
            fill={activeColor}
          />
          {/* Pouring Spout Lip */}
          <path d="M110 63 Q118 58 122 62" stroke="rgba(0,0,0,0.3)" strokeWidth="2.5" strokeLinecap="round" />
          {/* Unglazed Tactile Grip Band */}
          <path
            d="M78 122 C84 120, 116 120, 122 122 L121 146 C115 148, 85 148, 79 146 Z"
            fill="rgba(0,0,0,0.12)"
          />
          {/* Light Reflection */}
          <path d="M92 78 Q88 124 94 170" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeLinecap="round" />

          {/* Adjacent Small Tasting Cup */}
          <rect x="132" y="152" width="28" height="34" rx="4" fill={activeColor} opacity="0.9" />
          <ellipse cx="146" cy="152" rx="14" ry="3" fill="rgba(0,0,0,0.15)" />
        </svg>
      )}

      {product.visualType === 'tray' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cold-pressed brass valet tray (Isometric perspective) */}
          <polygon
            points="38,126 120,84 168,110 86,152"
            fill={activeColor}
          />
          {/* Chamfered Inner Rim */}
          <polygon
            points="44,124 118,88 162,110 88,146"
            fill="rgba(0,0,0,0.15)"
          />
          {/* Brushed brass sheen */}
          <line x1="60" y1="126" x2="140" y2="98" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          {/* Small heirloom key inside */}
          <circle cx="106" cy="116" r="6" stroke="#fef08a" strokeWidth="2" fill="none" />
          <line x1="112" y1="116" x2="132" y2="124" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
          <line x1="128" y1="122" x2="128" y2="127" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )}

      {product.visualType === 'mug' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Stacked Hasami Tumblers */}
          {/* Bottom Tumbler */}
          <rect x="68" y="132" width="64" height="54" rx="4" fill={activeColor} />
          <rect x="68" y="178" width="64" height="8" rx="1" fill="#a8a29e" opacity="0.8" />

          {/* Top Tumbler (Interlocked) */}
          <rect x="70" y="86" width="60" height="52" rx="4" fill={activeColor} opacity="0.95" />
          <ellipse cx="100" cy="86" rx="30" ry="6" fill="rgba(0,0,0,0.18)" />
          <ellipse cx="100" cy="88" rx="27" ry="5" fill="#f5f5f4" opacity="0.85" />
          {/* Unglazed Foot Interlock */}
          <rect x="70" y="130" width="60" height="6" rx="1" fill="#a8a29e" opacity="0.75" />

          {/* Light Sheen */}
          <path d="M78 96 L78 126" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M76 142 L76 172" stroke="rgba(255,255,255,0.4)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}

      {product.visualType === 'candle' && (
        <svg
          viewBox="0 0 200 240"
          className="w-3/5 h-3/5 drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Flame Glow */}
          <circle cx="100" cy="72" r="28" fill="#f59e0b" opacity="0.2" filter="blur(12px)" />

          {/* Wick & Flame */}
          <path
            d="M100 60 C92 74, 96 82, 100 84 C104 82, 108 74, 100 60 Z"
            fill="#f59e0b"
          />
          <path
            d="M100 68 C96 76, 98 81, 100 82 C102 81, 104 76, 100 68 Z"
            fill="#fef08a"
          />
          <line x1="100" y1="84" x2="100" y2="92" stroke="#1c1917" strokeWidth="2" strokeLinecap="round" />

          {/* Terracotta Beaker Body */}
          <path
            d="M72 96 C72 94, 128 94, 128 96 L124 176 C124 180, 76 180, 76 176 Z"
            fill={activeColor}
          />
          {/* Wax Surface */}
          <ellipse cx="100" cy="96" rx="28" ry="6" fill="#fef3c7" opacity="0.9" />

          {/* Beaker Lip & Rim */}
          <ellipse cx="100" cy="96" rx="28" ry="6" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
          {/* Clay Highlights */}
          <path d="M82 110 L84 164" stroke="rgba(255,255,255,0.25)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
};
