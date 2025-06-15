
import { Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

// Placeholder SVGs for coat of arms and eTA emblem
const KenyaCoatOfArms = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" aria-label="Kenya Coat of Arms" className="mr-2">
    <rect width="48" height="48" rx="8" fill="#F2F2F2" />
    <text x="24" y="28" textAnchor="middle" fontSize="16" fill="#777" fontFamily="sans-serif">🇰🇪</text>
  </svg>
);
const EtaEmblem = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" aria-label="eTA Emblem" className="ml-2">
    <rect width="48" height="48" rx="8" fill="#F2F2F2" />
    <text x="24" y="28" textAnchor="middle" fontSize="16" fill="#777" fontFamily="sans-serif">🌐</text>
  </svg>
);

const Navbar = () => {
  return (
    <>
      {/* Top orange bar */}
      <div className="w-full h-2 bg-[#C2491D]"></div>
      <header className="w-full bg-white sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex items-center px-8 py-4 min-h-[88px]">
          {/* Logos (left) */}
          <div className="flex items-center min-w-[104px]">
            <KenyaCoatOfArms />
            <EtaEmblem />
          </div>
          {/* Title Section (center-left, flex-col) */}
          <div className="flex flex-col ml-6">
            <span className="text-base text-gray-500 font-medium mb-0 uppercase tracking-wide font-sans leading-tight" style={{ letterSpacing: "0.04em" }}>
              Immigration Services
            </span>
            <span className="text-2xl md:text-3xl font-extrabold text-black font-sans leading-snug mt-1" style={{ letterSpacing: "0.01em" }}>
              Electronic Travel Authorisation (eTA)
            </span>
          </div>
          <div className="flex-1" />
          {/* Language + Settings section (right) */}
          <div className="flex items-center gap-5">
            {/* Language selector with UK flag */}
            <button
              type="button"
              className="flex items-center gap-2 px-3 py-1 rounded-md focus:outline-none bg-transparent transition hover:bg-gray-100"
              style={{ minWidth: "92px" }}
            >
              {/* UK flag SVG */}
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
              <span className="text-base font-semibold font-sans text-black">English</span>
            </button>
            {/* Settings icon: green, larger, adjust spacing */}
            <button className="text-green-700 hover:text-green-800 transition p-2 rounded-full focus:outline-none" aria-label="Settings">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;

