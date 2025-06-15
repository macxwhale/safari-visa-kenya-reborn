
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

// Placeholder hero image
const heroImg =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1100&q=80";

const HeroSection = () => (
  <section className="z-10 mx-auto mt-8 w-full max-w-screen-2xl px-4">
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-12 shadow-lg">
      <div
        className="relative col-span-1 p-6 sm:px-8 sm:py-12 lg:col-span-5 xl:px-12 xl:py-12 overflow-hidden"
        style={{ backgroundColor: "rgba(10,64,2,1)" }}
      >
        <h2 className="text-2xl font-semibold text-pretty text-white lg:text-3xl xl:text-5xl font-sans leading-tight">
          Your visit to Kenya begins here
        </h2>
        <p className="mt-6 text-lg text-white xl:mt-8 xl:text-2xl leading-relaxed">
          Apply for your eTA online, fast and safely — anywhere and anytime.
        </p>
        <div className="mt-12 flex w-full lg:max-w-md flex-col gap-4 xl:mt-16 sm:flex-row sm:gap-3 z-30">
          <Link to="/apply" className="w-full sm:flex-1">
            <Button
              size="lg"
              className="w-full px-6 py-3 font-medium text-base rounded-full bg-white transition-colors duration-200 hover:bg-gray-100"
              style={{ color: "rgba(10,64,2,1)", border: 'none', boxShadow: 'none' }}
            >
              Apply Now
            </Button>
          </Link>
          <Link to="/dashboard" className="w-full sm:flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full px-6 py-3 font-medium text-base rounded-full border-white bg-transparent text-white shadow-none hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
              style={{ borderWidth: 2 }}
            >
              Check status
              <Search className="w-4 h-4 text-white" strokeWidth={2.5} />
            </Button>
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
