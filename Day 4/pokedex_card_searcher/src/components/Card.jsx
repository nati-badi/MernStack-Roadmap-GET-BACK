// Card.jsx (Improved CSS)
import React from "react";

function Card() {
  return (
    // 🚀 IMPROVED: Using standard Tailwind classes for color, borders, and shadow.
    <div className="bg-yellow-200 block max-w-sm border border-yellow-300 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-2xl">
      <a href="#">
        {/* 🚀 IMPROVED: Matching top corner radius */}
        <img
          className="rounded-t-xl"
          src="/tryout.jpg"
          alt="Pokemon Image Placeholder"
        />
      </a>
      <div className="p-6 text-center">
        {/* Type Tag: Used yellow-400/500 for a consistent yellow accent */}
        <span className="inline-flex items-center bg-yellow-400/30 border border-yellow-500 text-yellow-700 text-xs font-medium px-2 py-1 rounded-full">
          {/* SVG code is fine, but I'll simplify the classes on the SVG itself */}
          <svg
            className="w-3 h-3 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round" // React uses camelCase for attributes
              strokeLinejoin="round" // React uses camelCase for attributes
              strokeWidth="2" // React uses camelCase for attributes
              d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
            />
          </svg>
          Trending {/* This will be the Pokemon type */}
        </span>

        {/* Title/Name */}
        <a href="#">
          <h5 className="mt-3 mb-6 text-2xl font-semibold tracking-tight text-gray-800">
            Streamlining your design process today.{" "}
            {/* This will be the Pokemon Name */}
          </h5>
        </a>

        {/* Read More Button (This will be replaced with stats/info) */}
        <a
          href="#"
          // 🚀 IMPROVED: Using bg-yellow-600 to match the header color
          className="inline-flex items-center text-white bg-yellow-600 border border-transparent hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-300 shadow-md font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
        >
          Read more
          <svg
            className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 12H5m14 0-4 4m4-4-4-4"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default Card;
