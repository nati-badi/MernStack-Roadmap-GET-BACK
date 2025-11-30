import { useState } from "react";
import Card from "./components/Card";
import SkeletonCard from "./components/SkeletonCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => setSearchTerm(e.target.value);

  const fetchPokemon = async (e) => {
    if (e) e.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();
    if (!trimmedSearchTerm) {
      setError("Search term cannot be empty");
      return;
    }

    setIsLoading(true);
    setError(null);
    setPokemonData(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${trimmedSearchTerm.toLowerCase()}`
      );

      if (!response.ok)
        throw new Error(`Pokémon "${trimmedSearchTerm}" not found.`);

      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setSearchTerm("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchPokemon(e);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-gray-100 to-yellow-100 relative">
      {/* PREMIUM HEADER */}
      <div
        className="
        w-full py-5 px-8 shadow-xl border-b border-yellow-300/30
        bg-white/30 backdrop-blur-xl
        flex justify-between items-center
        sticky top-0 z-50
      "
      >
        <h1
          className="
            text-3xl font-extrabold tracking-tight
            bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700
            bg-clip-text text-transparent
            drop-shadow-md
          "
        >
          Pokedex Card Searcher
        </h1>

        <input
          type="text"
          placeholder="Search by Pokémon name or ID..."
          className="
            bg-white/50 border border-yellow-400/60
            rounded-xl px-5 py-3
            w-[28rem]
            shadow-inner
            focus:ring-4 focus:ring-yellow-300/50 focus:border-yellow-600
            transition-all duration-300
            text-gray-900 placeholder-gray-500
            outline-none
          "
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex justify-center mt-16 px-4 pb-24">
        {/* LOADING */}
        {isLoading && (
          <div className="animate-fadeIn">
            <SkeletonCard />
          </div>
        )}

        {/* ERROR */}
        {error && !isLoading && (
          <div
            className="
              bg-red-100/80 border border-red-400/70 text-red-800
              px-6 py-4 rounded-2xl shadow-xl backdrop-blur-xl
              max-w-md text-center animate-fadeIn
            "
          >
            <p className="font-extrabold text-lg mb-1">Search Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* CARD RESULT */}
        {pokemonData && !isLoading && (
          <div className="animate-fadeIn">
            <Card pokemonData={pokemonData} />
          </div>
        )}

        {/* EMPTY STATE */}
        {!pokemonData && !isLoading && !error && (
          <p className="text-gray-600 mt-8 text-lg italic animate-fadeIn">
            Search for any Pokémon to view its premium card.
          </p>
        )}
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.45s ease-out; }
      `}</style>
    </div>
  );
}

export default App;
