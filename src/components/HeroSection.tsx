
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// Placeholder hero image
const heroImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1100&q=80";

const HeroSection = () => (
  <section className="z-10 mx-auto mt-6 sm:mt-8 w-full max-w-screen-2xl px-4">
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-12 shadow-lg">
      <div
        className="relative col-span-1 p-6 sm:px-8 sm:py-12 lg:col-span-5 xl:px-12 xl:py-16 overflow-hidden bg-brand-green"
      >
        <h2 className="text-2xl font-semibold text-pretty text-white lg:text-3xl xl:text-5xl font-sans leading-tight">
          Your visit to Kenya begins here
        </h2>
        <p className="mt-6 text-lg text-white xl:mt-8 xl:text-2xl leading-relaxed opacity-95">
          Apply for your eTA online, fast and safely — anywhere and anytime.
        </p>
        <div className="mt-12 flex w-full lg:max-w-md flex-col gap-4 xl:mt-16 sm:flex-row sm:gap-3 z-30">
          <Link to="/apply" className="w-full sm:flex-1">
            <Button
              variant="brand-outline"
              size="lg"
              className="w-full bg-white text-brand-green hover:bg-gray-100 hover:text-brand-green border-white hover:border-gray-100"
            >
              Apply Now
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-white bg-transparent text-white hover:bg-white/10 transition-all duration-normal flex items-center justify-center gap-2 border-2"
            >
              Check status
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </div>
      <div className="col-span-1 grid lg:col-span-7">
        <img
          alt="Beautiful landscape of Kenya representing the travel destination"
          className="col-start-1 row-start-1 h-full w-full object-cover"
          src={heroImg}
          draggable={false}
          loading="eager"
        />
      </div>
    </div>
  </section>
);

export default HeroSection;
