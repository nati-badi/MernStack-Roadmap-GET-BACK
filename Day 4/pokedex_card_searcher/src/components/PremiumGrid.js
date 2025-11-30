// PremiumGrid.js
import React from "react";

/**
 * PremiumGrid wraps cards into a responsive auto-fit layout.
 * Usage:
 * <PremiumGrid>
 *   <Card pokemonData={...} />
 *   <Card pokemonData={...} />
 * </PremiumGrid>
 */

const PremiumGrid = ({ children, gap = "1.5rem", min = 240 }) => {
  // min is min column width in px; default 240
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
    gap,
    alignItems: "start",
  };

  return (
    <>
      <div style={gridStyle} className="premium-grid">
        {children}
      </div>

      <style>{`
        /* fine-tune spacing for very small screens */
        .premium-grid {
          padding: 1rem;
        }
        @media (min-width: 768px) {
          .premium-grid { padding: 1.25rem; }
        }
        @media (min-width: 1280px) {
          .premium-grid { padding: 1.5rem; }
        }
      `}</style>
    </>
  );
};

export default PremiumGrid;
