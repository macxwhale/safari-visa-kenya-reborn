
import { Link } from "react-router-dom";

// Placeholder flag
const flags = {
  EN: "https://flagcdn.com/gb.svg",
};
// Placeholder for logo SVG used in footer
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

const Footer = () => (
  <footer className="mt-12 bg-[#082A16]">
    <div className="relative w-full max-w-screen-2xl mx-auto p-6 pb-8 lg:p-8 lg:pb-12">
      <div className="flex flex-wrap items-start justify-between gap-8">
        <div className="flex-1 max-w-lg">
          <p className="text-lg font-bold text-white mb-4">
            For assistance:
          </p>
          <p className="text-base font-light text-white leading-relaxed">
            Email us at{" "}
            <a
              href="mailto:etakenya@gov.ke"
              className="font-light text-base underline hover:no-underline transition-all"
            >
              etakenya@gov.ke
            </a>
            {" "}or reach out to us on WhatsApp at{" "}
            <a
              href="tel:+254110922064"
              className="font-light text-base underline hover:no-underline transition-all"
            >
              +254 110 922 064
            </a>
          </p>
          <div className="flex gap-6 items-center text-white mt-8 sm:mt-16">
            <Link
              to="/terms-and-conditions"
              className="text-white text-sm font-normal underline hover:no-underline transition-all"
            >
              Terms and Conditions
            </Link>
            <span className="text-white/60">|</span>
            <Link
              to="/privacy-policy"
              className="text-white text-sm font-normal underline hover:no-underline transition-all"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
        {/* logos and note */}
        <div className="flex flex-col items-end">
          <div className="flex gap-8 items-center mb-6">
            <Logo />
          </div>
          <p className="text-sm tracking-normal font-light text-white max-w-xs text-right leading-relaxed mb-6">
            The Ministry of Interior and National Administration, State Department for Immigration and Citizen Services, Directorate of Immigration Services
          </p>
          {/* lang */}
          <div className="relative w-fit">
            <span className="flex items-center gap-2 text-sm text-white font-semibold">
              <img
                className="h-4 w-5"
                src={flags.EN}
                alt="English flag"
              />
              English
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
