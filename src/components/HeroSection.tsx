
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
              className="w-full xl:px-10 xl:py-4 font-bold text-lg rounded-full bg-white text-[rgba(10,64,2,1)] border-none shadow-none hover:bg-gray-100 transition"
            >
              Apply Now
            </Button>
          </Link>
        </div>
        {/* Removed Check Status and Airport Staff Box */}
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

