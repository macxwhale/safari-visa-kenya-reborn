
import { Link } from "react-router-dom";

// Placeholder flag
const flags = {
  EN: "https://flagcdn.com/gb.svg",
};

const Footer = () => (
  <footer className="mt-12 bg-[#082A16]">
    <div className="relative w-full max-w-screen-2xl mx-auto p-6 pb-8 lg:p-8 lg:pb-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex gap-6 items-center">
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
  </footer>
);

export default Footer;
