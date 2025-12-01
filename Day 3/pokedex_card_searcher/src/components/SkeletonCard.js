// SkeletonCard.js
import React from "react";

/**
 * Premium skeleton with Pokémon-style glowing yellow shimmer.
 * Use this while loading a single Card.
 */

const SkeletonCard = () => {
  return (
    <>
      <div
        className="
          relative w-full max-w-sm
          rounded-3xl
          border border-yellow-300/20
          bg-white/6
          overflow-hidden
          animate-skeleton-pulse
        "
        style={{ minHeight: 360 }}
      >
        <div className="absolute inset-0 -z-10">
          <div className="skeleton-aura" />
        </div>

        {/* image placeholder */}
        <div className="h-60 bg-gradient-to-br from-yellow-200/40 to-yellow-300/30 flex items-center justify-center rounded-t-3xl">
          <div className="w-44 h-44 rounded-xl bg-yellow-100/60 skeleton-block" />
        </div>

        {/* body placeholder */}
        <div className="px-8 py-8">
          <div className="h-9 w-3/4 mx-auto rounded-full bg-yellow-100/50 skeleton-block mb-4" />
          <div className="h-6 w-1/3 mx-auto rounded-full bg-yellow-100/40 skeleton-block mb-6" />

          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="h-12 rounded-lg bg-yellow-100/40 skeleton-block" />
            <div className="h-12 rounded-lg bg-yellow-100/40 skeleton-block" />
            <div className="h-12 rounded-lg bg-yellow-100/40 skeleton-block" />
          </div>
        </div>
      </div>

      <style>{`
        /* shimmer animation for pokemon-style yellow shimmer */
        @keyframes pokemon-shimmer {
          0% { background-position: -260px 0; }
          100% { background-position: 260px 0; }
        }

        .skeleton-block {
          background: linear-gradient(90deg,
            rgba(255, 235, 140, 0.28) 0%,
            rgba(255, 245, 200, 0.55) 40%,
            rgba(255, 235, 140, 0.28) 100%);
          background-size: 520px 100%;
          animation: pokemon-shimmer 1.6s linear infinite;
        }

        .skeleton-aura {
          width: 120%;
          height: 120%;
          margin: -10% 0 0 -10%;
          filter: blur(22px) saturate(1.1);
          background: radial-gradient(40% 40% at 50% 30%, rgba(255,245,200,0.22), rgba(255,200,60,0.08) 25%, transparent 40%);
        }

        /* optional gentle pulse for the whole skeleton card */
        @keyframes skeleton-pulse {
          0% { opacity: 0.95; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-1px); }
          100% { opacity: 0.95; transform: translateY(0); }
        }
        .animate-skeleton-pulse {
          animation: skeleton-pulse 2.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default SkeletonCard;
