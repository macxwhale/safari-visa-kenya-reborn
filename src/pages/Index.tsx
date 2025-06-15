
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TopBar from "@/components/TopBar";
import HeroSection from "@/components/HeroSection";
import InfoCards from "@/components/InfoCards";
import DiscoverKenyaBanner from "@/components/DiscoverKenyaBanner";
import Footer from "@/components/Footer";

// Placeholder flag images for static flag icon (use your own if uploaded)
const flags = {
  EN: "https://flagcdn.com/gb.svg", // UK flag for English
};

// DUMMY SVG logo - only used for SEO/accessibility and fallback
const Logo = () => (
  <svg width={60} height={60} viewBox="0 0 60 60" fill="none">
    <rect width="60" height="60" rx="15" fill="#1D5027" />
    <text
      x={30}
      y={38}
      textAnchor="middle"
      fontSize="36"
      fill="#fff"
      fontFamily="Lexend,sans-serif"
      fontWeight="bold"
    >
      eTA
    </text>
  </svg>
);

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-white font-sans">
      <TopBar />
      <header className="relative w-full max-w-screen-2xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <a href="/" className="shrink-0 flex items-center group">
            <span className="sr-only">Electronic Travel Authorisation</span>
            <Logo />
            <div className="hidden lg:block lg:ml-6">
              <h3 className="text-sm text-[#757575] font-medium leading-tight">
                Immigration Services
              </h3>
              <p className="text-2xl text-black font-bold font-sans leading-tight mt-1">
                Electronic Travel Authorisation (eTA)
              </p>
            </div>
          </a>
          <div className="flex items-center gap-4">
            {/* Language Dropdown - static */}
            <button
              className="flex items-center px-4 py-2 text-sm font-semibold text-[#244FBB] bg-white rounded-full border border-[#d0d7e8] shadow-sm transition-colors hover:bg-gray-50"
              style={{
                minWidth: 110,
                minHeight: 40,
              }}
              aria-haspopup="true"
            >
              <img
                src={flags.EN}
                alt="English"
                className="h-4 w-5 mr-2 object-cover"
                loading="lazy"
              />
              English
            </button>
            {/* Settings Cog */}
            <button
              className="block p-2 rounded-full bg-white border border-[#d0d7e8] text-[#006718] hover:bg-gray-50 transition-colors"
              style={{ minWidth: 40, minHeight: 40 }}
              aria-label="Settings"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 25"
              >
                <path d="M20.1 9.731c-1.81 0-2.55-1.28-1.65-2.85.52-.91.21-2.07-.7-2.59l-1.73-.99c-.79-.47-1.81-.19-2.28.6l-.11.19c-.9 1.57-2.38 1.57-3.29 0l-.11-.19a1.641 1.641 0 0 0-2.26-.6l-1.73.99c-.91.52-1.22 1.69-.7 2.6.91 1.56.17 2.84-1.64 2.84-1.04 0-1.9.85-1.9 1.9v1.76c0 1.04.85 1.9 1.9 1.9 1.81 0 2.55 1.28 1.64 2.85-.52.91-.21 2.07.7 2.59l1.73.99c.79.47 1.81.19 2.28-.6l.11-.19c.9-1.57 2.38-1.57 3.29 0l.11.19c.47.79 1.49 1.07 2.28.6l1.73-.99c.91-.52 1.22-1.69.7-2.59-.91-1.57-.17-2.85 1.64-2.85 1.04 0 1.9-.85 1.9-1.9v-1.76a1.92 1.92 0 0 0-1.91-1.9Zm-8.1 6.03c-1.79 0-3.25-1.46-3.25-3.25s1.46-3.25 3.25-3.25 3.25 1.46 3.25 3.25-1.46 3.25-3.25 3.25Z" />
              </svg>
            </button>
          </div>
        </nav>
      </header>
      <HeroSection />
      <InfoCards />
      <DiscoverKenyaBanner />
      <Footer />
    </div>
  );
}
