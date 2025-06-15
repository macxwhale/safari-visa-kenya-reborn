
import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <header className="w-full border-b bg-white/95 backdrop-blur sticky top-0 z-30 shadow-sm">
      <div className="max-w-[1440px] mx-auto flex items-center px-8 py-3 h-20">
        {/* Left Title Section */}
        <div>
          {/* "Immigration Services" in lighter font */}
          <p className="text-xs text-gray-400 font-medium mb-0 pl-0 leading-none">
            Immigration Services
          </p>
          {/* "Electronic Travel Authorisation (eTA)" in bold black (Montserrat-like font if available) */}
          <h1 className="text-2xl md:text-[1.65rem] font-extrabold text-black leading-none mt-0 tracking-wide font-sans">
            Electronic Travel Authorisation (eTA)
          </h1>
        </div>
        <div className="flex-1" />
        {/* Language + Settings section */}
        <div className="flex items-center gap-7">
          {/* Language selector */}
          <button
            type="button"
            className="flex items-center gap-2 group transition hover:text-green-700 focus:outline-none"
          >
            {/* Inline SVG of UK flag (small, to match reference) */}
            <span title="UK Flag" className="inline-block">
              <svg width="26" height="16" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <rect width="38" height="24" rx="2" fill="#012169"/>
                <path d="M0 0L38 24M38 0L0 24" stroke="white" strokeWidth="4"/>
                <path d="M0 0L38 24M38 0L0 24" stroke="#C8102E" strokeWidth="2"/>
                <rect x="15" width="8" height="24" fill="white"/>
                <rect y="8" width="38" height="8" fill="white"/>
                <rect x="16" width="6" height="24" fill="#C8102E"/>
                <rect y="9" width="38" height="6" fill="#C8102E"/>
              </svg>
            </span>
            <span className="text-sm font-semibold">English</span>
          </button>
          {/* Settings icon */}
          <button className="text-green-800 hover:text-green-900 transition" aria-label="Settings">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
