
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
        <div className="max-w-[1440px] mx-auto flex items-center px-8 py-3 h-20">
          {/* Left Logo/Emblems */}
          <div className="min-w-[104px] flex items-center gap-2">
            <KenyaCoatOfArms />
            <EtaEmblem />
          </div>
          {/* Left Title Section */}
          <div className="ml-5">
            {/* "Immigration Services" in lighter font, uppercase, Lexend */}
            <p className="text-xs md:text-sm text-gray-400 font-medium mb-0 leading-tight font-sans tracking-[0.06em] uppercase">
              Immigration Services
            </p>
            {/* "Electronic Travel Authorisation (eTA)" bold, Lexend */}
            <h1 className="text-2xl md:text-[1.65rem] font-extrabold text-black leading-none mt-1 font-sans tracking-tight">
              Electronic Travel Authorisation (eTA)
            </h1>
          </div>
          <div className="flex-1" />
          {/* Language + Settings section (right) */}
          <div className="flex items-center gap-3">
            {/* Language selector */}
            <button
              type="button"
              className="flex items-center gap-2 px-4 py-1.5 rounded-full transition focus:outline-none hover:bg-gray-100 bg-white border border-gray-200 shadow-sm"
              style={{ minWidth: 110, minHeight: 40 }}
            >
              <span title="UK Flag" className="inline-block">
                <svg width="22" height="15" viewBox="0 0 38 24" fill="none" aria-hidden>
                  <rect width="38" height="24" rx="2" fill="#012169"/>
                  <path d="M0 0L38 24M38 0L0 24" stroke="white" strokeWidth="4"/>
                  <path d="M0 0L38 24M38 0L0 24" stroke="#C8102E" strokeWidth="2"/>
                  <rect x="15" width="8" height="24" fill="white"/>
                  <rect y="8" width="38" height="8" fill="white"/>
                  <rect x="16" width="6" height="24" fill="#C8102E"/>
                  <rect y="9" width="38" height="6" fill="#C8102E"/>
                </svg>
              </span>
              <span className="text-base font-semibold text-black font-sans">English</span>
            </button>
            {/* Settings (gear) icon */}
            <button className="ml-1 p-2 rounded-full text-green-700 hover:text-green-800 transition focus:outline-none" style={{ minWidth: 40, minHeight: 40 }} aria-label="Settings">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
