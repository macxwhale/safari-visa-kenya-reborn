import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Placeholder flag images for static flag icon (use your own if uploaded)
const flags = {
  EN: "https://flagcdn.com/gb.svg", // UK flag for English
};
// Placeholder hero/bg image - replace with your assets if uploaded
const heroImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1100&q=80";
// Placeholder for "Discover Kenya" image
const discoverImg =
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=900&q=80";

// DUMMY SVG logo - replace with your own logo asset if available
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
      {/* Orange Support Bar (now icon only, text removed) */}
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
          {/* Text has been removed per user request */}
        </div>
      </div>
      {/* Header/NavBar */}
      <header className="relative w-full max-w-screen-2xl mx-auto p-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="shrink-0 flex items-center group">
            <span className="sr-only">Electronic Travel Authorisation</span>
            <Logo />
            <div className="hidden lg:block lg:mx-6">
              <h3 className="text-sm text-[#757575] font-medium">
                Directorate of Immigration Services
              </h3>
              <p className="text-2xl text-[#244FBB] font-bold font-sans">
                Electronic Travel Authorisation (eTA)
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Language Dropdown - static */}
            <button
              className="flex items-center px-4 py-2 text-sm font-semibold text-[#244FBB] bg-white rounded-full border border-[#d0d7e8] shadow-sm"
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
              className="block p-2 rounded-full bg-white border border-[#d0d7e8] text-[#006718] hover:bg-gray-50"
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

      {/* Hero Section */}
      <section className="z-10 mx-auto mt-6 w-full max-w-screen-2xl px-4">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-12 shadow-md">
          <div className="bg-[#082A16] relative col-span-1 p-4 sm:px-7 sm:py-9 lg:col-span-5 xl:px-12 overflow-hidden">
            <h2 className="text-2xl font-semibold text-pretty text-white lg:text-3xl xl:text-5xl font-sans">
              Your visit to Kenya begins here
            </h2>
            <p className="mt-5 text-lg text-white xl:mt-11 xl:text-2xl">
              Apply for your eTA online, fast and safely — anywhere and anytime.
            </p>
            <div className="mt-8 flex w-full lg:max-w-sm flex-wrap items-center gap-4 xl:mt-16 sm:flex-nowrap xl:gap-6 z-30">
              <Link
                to="/apply"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full xl:px-10 xl:py-4 font-bold text-lg rounded-full bg-[#244FBB] text-white border-none shadow-none hover:bg-[#1a3878] transition"
                >
                  Apply Now
                </Button>
              </Link>
              <Link
                to="/dashboard"
                className="w-full sm:w-auto"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full xl:px-5 xl:py-4 font-bold text-lg rounded-full text-white border-white hover:bg-white/10 bg-[#082A16] transition"
                >
                  Check status
                  <svg
                    className="ml-2 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 25 25"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.788 5.53h6m-6 3h3m4 3.5c0 5.25-4.25 9.5-9.5 9.5s-9.5-4.25-9.5-9.5 4.25-9.5 9.5-9.5m10.5 20-2-2"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
            <div className="mt-6 xl:mt-12">
              <Link
                to="/lookup/ta"
                className="self-start relative z-20 flex flex-col gap-px w-full max-w-sm rounded-lg p-2 bg-white/10"
              >
                <span className="flex items-center text-sm text-white font-semibold whitespace-nowrap">
                  Airport Staff
                  <svg
                    className="ml-2 w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m0 0-7-7m7 7-7 7"
                    />
                  </svg>
                </span>
                <p className="text-xs text-white">
                  Check the status of a traveler&apos;s submitted application here.
                </p>
              </Link>
            </div>
          </div>
          <div className="col-span-1 grid lg:col-span-7">
            <img
              alt="hero"
              className="col-start-1 row-start-1 h-full w-full object-cover"
              src={heroImg}
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Stats / Info Cards Section */}
      <section className="bg-[#F4F4F4] lg:-mt-[120px] lg:pt-[80px]">
        <div className="mx-auto w-full max-w-screen-2xl px-4 py-6 sm:py-12">
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl ring-1 ring-gray-50 lg:grid-cols-3 border">
            <div className="relative flex flex-col bg-white p-4 sm:px-7">
              <dd className="shrink-0 text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
                How to apply
              </dd>
              <dt className="mt-5 flex flex-col">
                <p className="text-base tracking-normal text-[#909090]">
                  Learn about the process and requirements for applying for Kenya&apos;s eTA
                </p>
                <div className="mt-4">
                  <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                    <circle cx="32.5" cy="32" r="32" fill="#14B04C" fillOpacity=".2"/>
                    <rect x="22.5" y="20" width="20" height="24" rx="2" fill="#244FBB" />
                  </svg>
                </div>
                <div className="mt-auto pt-5 sm:pt-10">
                  <Link
                    to="/how-to-apply"
                    className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
                  >
                    View details
                  </Link>
                </div>
              </dt>
            </div>
            <div className="relative flex flex-col bg-white p-4 sm:px-7">
              <dd className="text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
                General Information
              </dd>
              <dt className="mt-5 flex flex-1 flex-col justify-between">
                <p className="text-base tracking-normal text-[#909090]">
                  Learn more about eligibility, exemptions and application processing.
                </p>
                <div className="mt-4">
                  <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                    <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".15"/>
                    <rect x="24" y="24" width="16" height="16" rx="2" fill="#14B04C" />
                  </svg>
                </div>
                <div className="mt-auto pt-5 sm:pt-10">
                  <Link
                    to="/general-information"
                    className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
                  >
                    View details
                  </Link>
                </div>
              </dt>
            </div>
            <div className="relative flex flex-col bg-white p-4 sm:px-7">
              <dd className="text-lg font-semibold tracking-tight text-[#244FBB] lg:text-2xl">
                FAQs
              </dd>
              <dt className="mt-5 flex flex-1 flex-col">
                <p className="text-base tracking-normal text-[#909090]">
                  Some of the frequently asked questions about eTA
                </p>
                <div className="mt-4">
                  <svg className="w-10 h-10 sm:w-16 sm:h-16" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 65 64">
                    <circle cx="32.5" cy="32" r="32" fill="#244FBB" fillOpacity=".1"/>
                    <rect x="27" y="20" width="11" height="24" rx="2" fill="#244FBB" />
                  </svg>
                </div>
                <div className="mt-auto pt-5 sm:pt-10">
                  <Link
                    to="/faqs"
                    className="text-[#14B04C] border-[#14B04C] btn btn-outline rounded-full px-6 py-2 font-medium inline-flex items-center"
                  >
                    View details
                  </Link>
                </div>
              </dt>
            </div>
          </dl>
        </div>
      </section>

      {/* Discover Kenya Banner */}
      <section className="relative before:content-[''] before:absolute before:bg-[#F4F4F4] before:inset-0 before:h-1/2 before:w-full">
        <div className="mx-auto my-8 w-full max-w-screen-2xl px-4">
          <div className="relative grid grid-cols-2 gap-0 overflow-hidden rounded-xl bg-[#984701]">
            <div className="col-span-2 flex flex-col items-start justify-center px-8 py-4 lg:col-span-1 lg:px-16">
              <p className="mb-8 text-2xl !leading-tight font-medium text-white lg:text-4xl xl:text-6xl font-sans">
                Astride the equator, Kenya is home to intimate, awe-inspiring, and magical travel experiences
              </p>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <img
                alt="Discover Kenya"
                className="max-h-[180px] w-full object-cover lg:max-h-full"
                src={discoverImg}
              />
            </div>
            <img
              alt=""
              className="absolute right-0 h-full w-6 lg:w-14 object-cover"
              src={discoverImg}
              style={{ opacity: 0.12, pointerEvents: "none" }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 bg-[#082A16]">
        <div className="relative w-full max-w-screen-2xl mx-auto p-4 pb-8 lg:mt-10">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex-1 max-w-md">
              <p className="text-base font-bold text-white">
                For assistance:
              </p>
              <p className="text-base font-light text-white">
                Email us at
                <a
                  href="mailto:etakenya@gov.ke"
                  className="font-light text-base underline"
                >
                  etakenya@gov.ke
                </a>
                or reach out to us on WhatsApp at
                <a
                  href="tel:+254110922064"
                  className="font-light text-base underline"
                >
                  +254 110 922 064
                </a>
              </p>
              <div className="flex gap-4 items-center text-white sm:mt-20 mt-10">
                <Link
                  to="/terms-and-conditions"
                  className="text-white text-xs font-normal underline"
                >
                  Terms and Conditions
                </Link>
                |
                <Link
                  to="/privacy-policy"
                  className="text-white text-xs font-normal underline"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            {/* logos and note */}
            <div>
              <div className="flex gap-8 items-center">
                <Logo />
              </div>
              <p className="text-xs tracking-normal font-light text-white max-w-xs my-6">
                The Ministry of Interior and National Administration, State Department for Immigration and Citizen Services, Directorate of Immigration Services
              </p>
              {/* lang */}
              <div className="relative w-fit">
                <span className="flex items-center gap-1.5 ml-2 text-sm text-white font-semibold">
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
    </div>
  );
}
