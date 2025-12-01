// Card.js
import React from "react";

const Card = ({ pokemonData }) => {
  if (!pokemonData) return null;

  const name =
    pokemonData.name?.charAt(0).toUpperCase() + pokemonData.name?.slice(1) ||
    "Unknown";
  const id = pokemonData.id ? String(pokemonData.id).padStart(3, "0") : "000";
  const imageUrl = pokemonData.sprites?.front_default || null;
  const baseExperience = pokemonData.base_experience ?? "N/A";
  const height = pokemonData.height ? pokemonData.height / 10 : "N/A";
  const weight = pokemonData.weight ? pokemonData.weight / 10 : "N/A";
  const primaryType = pokemonData.types?.[0]?.type?.name || "unknown";

  const getTypeColor = (type) => {
    switch (type) {
      case "grass":
        return "bg-green-500 text-white shadow-green-400/40";
      case "fire":
        return "bg-red-500 text-white shadow-red-400/40";
      case "water":
        return "bg-blue-500 text-white shadow-blue-400/40";
      case "electric":
        return "bg-yellow-400 text-gray-900 shadow-yellow-300/40";
      case "normal":
        return "bg-gray-400 text-white shadow-gray-300/40";
      case "poison":
        return "bg-purple-600 text-white shadow-purple-400/40";
      case "flying":
        return "bg-indigo-400 text-white shadow-indigo-300/40";
      case "bug":
        return "bg-lime-500 text-gray-900 shadow-lime-400/40";
      case "fairy":
        return "bg-pink-300 text-gray-900 shadow-pink-200/40";
      case "ground":
        return "bg-amber-700 text-white shadow-amber-600/40";
      case "rock":
        return "bg-stone-500 text-white shadow-stone-400/40";
      case "ghost":
        return "bg-indigo-800 text-white shadow-indigo-700/40";
      default:
        return "bg-gray-200 text-gray-800 shadow-gray-100/40";
    }
  };

  return (
    <>
      <div
        className="
          relative w-full max-w-sm
          rounded-3xl
          border border-yellow-300/40
          bg-white/8 backdrop-blur-2xl
          overflow-hidden
          transition-transform duration-400
          transform
          group
        "
        style={{
          boxShadow: "0 18px 45px -10px rgba(0,0,0,0.25)",
        }}
      >
        {/* Aura (idle subtle glow + stronger hover) */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="card-aura" />
        </div>

        {/* TOP IMAGE */}
        <div
          className="
            relative h-60
            bg-gradient-to-br from-yellow-200/70 to-yellow-300/80
            flex justify-center items-center
            rounded-t-3xl
            overflow-hidden
          "
        >
          <span
            className="
              absolute top-4 right-5 
              text-3xl font-extrabold
              text-yellow-900/30 tracking-tight
            "
          >
            #{id}
          </span>

          {imageUrl ? (
            <img
              className="
                w-44 h-44 object-contain
                drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)]
                transition-transform duration-500
                group-hover:scale-110
              "
              src={imageUrl}
              alt={name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/176x176/FFBF00/white?text=No+Sprite";
              }}
            />
          ) : (
            <div
              className="
                w-44 h-44 flex items-center justify-center
                bg-yellow-100/60 text-gray-700
                rounded-xl shadow-inner
              "
            >
              Image Not Found
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="px-8 py-8 text-center">
          <h5 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-5">
            {name}
          </h5>

          <span
            className={`
              inline-flex items-center px-5 py-1.5
              rounded-full text-sm font-bold uppercase tracking-wider
              shadow-md
              ${getTypeColor(primaryType)}
            `}
          >
            {primaryType}
          </span>

          {/* STATS */}
          <div className="mt-10 grid grid-cols-3 gap-6 border-t border-yellow-300/30 pt-6">
            <StatBox value={baseExperience} label="Base EXP" />
            <StatBox
              value={height !== "N/A" ? `${height}m` : "N/A"}
              label="Height"
            />
            <StatBox
              value={weight !== "N/A" ? `${weight}kg` : "N/A"}
              label="Weight"
            />
          </div>
        </div>
      </div>
    </>
  );
};

const StatBox = ({ value, label }) => (
  <div>
    <p className="text-3xl font-extrabold text-yellow-700">{value}</p>
    <p className="text-xs uppercase text-gray-500 font-medium tracking-wider mt-1">
      {label}
    </p>
  </div>
);

export default Card;
