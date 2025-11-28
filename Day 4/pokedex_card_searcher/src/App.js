import React from "react";
import Card from "./components/Card";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-between items-center bg-yellow-600 p-4 w-full shadow-lg">
        <h1 className="text-3xl font-bold ml-8 text-white">
          Pokedex Card Searcher
        </h1>
        <input
          className="outline-none rounded-md p-3 mr-8 w-[30rem] border-2 border-yellow-400 focus:border-yellow-700"
          type="text"
          placeholder="Search for a pokemon card..."
        />
      </div>

      <div className="flex mt-8 ml-10">
        <Card />
      </div>
    </div>
  );
}

export default App;
