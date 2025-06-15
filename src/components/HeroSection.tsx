
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Placeholder hero image
const heroImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1100&q=80";

const HeroSection = () => (
  <section className="z-10 mx-auto mt-6 w-full max-w-screen-2xl px-4">
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-12 shadow-md">
      <div
        className="relative col-span-1 p-4 sm:px-7 sm:py-9 lg:col-span-5 xl:px-12 overflow-hidden"
        style={{ backgroundColor: "rgba(10,64,2,1)" }}
      >
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
);

export default HeroSection;
