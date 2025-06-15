
import React from "react";

/**
 * Renders the orange bar with the info icon at the top.
 */
const TopBar = () => (
  <div className="w-full bg-[#c2491d] px-0 py-2">
    <div className="max-w-screen-2xl mx-auto flex items-center px-4">
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 20 21">
        <path
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.667"
          d="M10 13.845V10.51m0-3.333h.008m8.325 3.333a8.333 8.333 0 1 1-16.666 0 8.333 8.333 0 0 1 16.666 0Z"
        />
      </svg>
    </div>
  </div>
);

export default TopBar;
