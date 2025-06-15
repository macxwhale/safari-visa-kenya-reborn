
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Settings } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with coat of arms */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Coat_of_arms_of_Kenya.svg/120px-Coat_of_arms_of_Kenya.svg.png" 
                alt="Kenya Coat of Arms" 
                className="h-12 w-12"
              />
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Flag_of_Kenya.svg/80px-Flag_of_Kenya.svg.png" 
                alt="Kenya Flag" 
                className="h-8 w-12 rounded-sm"
              />
            </div>
            <div>
              <div className="text-sm text-gray-600">Directorate of Immigration Services</div>
              <div className="text-xl font-bold text-gray-800">Electronic Travel Authorisation (eTA)</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_United_Kingdom.svg/40px-Flag_of_the_United_Kingdom.svg.png" 
              alt="UK Flag" 
              className="h-6 w-8"
            />
            <span className="text-sm font-medium">English</span>
            <Settings className="h-4 w-4 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main hero section */}
      <div className="relative">
        <div className="flex min-h-[600px]">
          {/* Left side - Green section */}
          <div className="flex-1 bg-green-800 text-white p-12 flex flex-col justify-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-900 to-transparent"></div>
              <svg className="absolute bottom-0 right-0 w-64 h-64" viewBox="0 0 100 100" fill="none">
                <path d="M20 80 Q50 60 80 80 L80 100 L20 100 Z" fill="currentColor" opacity="0.1"/>
              </svg>
            </div>
            
            <div className="relative z-10 max-w-lg">
              <h1 className="text-4xl font-bold mb-6 leading-tight">
                Your visit to Kenya begins here
              </h1>
              <p className="text-lg mb-8 text-green-100">
                Apply for your eTA online, fast and safely- anywhere and anytime.
              </p>
              
              <div className="flex gap-4 mb-12">
                <Link to="/apply">
                  <Button className="bg-white text-green-800 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold">
                    Apply Now
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    variant="outline" 
                    className="border-2 border-green-400 text-white hover:bg-green-700 px-8 py-3 rounded-full font-semibold bg-transparent"
                  >
                    Check status ↻
                  </Button>
                </Link>
              </div>

              {/* Airport Staff section */}
              <div className="bg-green-900/30 rounded-lg p-4 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">Airport Staff</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
                <p className="text-sm text-green-100">
                  Check the status of a traveler's submitted application here.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Elephant silhouette */}
          <div className="flex-1 bg-gradient-to-br from-yellow-400 via-orange-400 to-orange-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-orange-600/20 to-transparent"></div>
            <div className="absolute bottom-0 right-1/3 transform translate-x-1/2">
              <svg width="300" height="400" viewBox="0 0 300 400" className="fill-black/60">
                <path d="M150 350 Q120 340 100 320 Q80 300 70 280 Q60 250 65 220 Q70 200 80 180 Q90 160 110 150 Q130 140 150 145 Q160 147 170 150 Q180 153 185 160 Q190 170 195 180 Q200 190 205 200 Q210 210 215 220 Q220 230 218 240 Q216 250 220 260 Q225 270 230 280 Q235 290 240 300 Q245 310 250 320 Q255 330 250 340 Q245 350 235 355 Q225 360 215 358 Q205 356 195 354 Q185 352 175 351 Q165 350 155 350 Q152 350 150 350 Z" />
                <path d="M140 180 Q130 170 125 160 Q120 150 122 140 Q124 130 130 125 Q136 120 145 122 Q154 124 160 130 Q166 136 168 145 Q170 154 168 163 Q166 172 160 178 Q154 184 147 186 Q140 188 133 186 Q130 184 130 180 Q132 178 136 178 Q140 178 140 180 Z" />
                <ellipse cx="180" cy="370" rx="15" ry="8" className="fill-black/40" />
                <ellipse cx="220" cy="375" rx="12" ry="6" className="fill-black/40" />
              </svg>
            </div>
            {/* Birds */}
            <div className="absolute top-20 right-20">
              <svg width="40" height="20" viewBox="0 0 40 20" className="fill-black/40">
                <path d="M10 10 Q15 5 20 10 Q25 5 30 10" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="absolute top-32 right-32">
              <svg width="30" height="15" viewBox="0 0 30 15" className="fill-black/40">
                <path d="M5 8 Q10 3 15 8 Q20 3 25 8" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">How to apply</h3>
            <p className="text-gray-600 mb-4">
              Learn about the process and requirements for applying
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">General Information</h3>
            <p className="text-gray-600 mb-4">
              Learn more about eligibility, exemptions and application
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800">
              Learn more →
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4 text-gray-800">FAQs</h3>
            <p className="text-gray-600 mb-4">
              Some of the frequently asked questions about eTA
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800">
              Learn more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
