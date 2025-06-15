
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main hero section */}
      <div 
        className="relative bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=2070&auto=format&fit=crop')",
          height: 'calc(100vh - 4rem)',
          maxHeight: '700px'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fade-in">
            Your Visit to Kenya Begins Here
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Apply for your Electronic Travel Authorisation (eTA) online. Fast, safe, and convenient—anywhere, anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Link to="/apply">
              <Button size="lg" className="bg-white text-green-800 hover:bg-gray-200 rounded-full font-semibold transition-colors duration-300 w-48 justify-center">
                Apply Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                size="lg"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-green-800 rounded-full font-semibold transition-colors duration-300 bg-transparent w-48 justify-center"
              >
                Check Status
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom sections */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Plan Your Application</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-800">How to Apply</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Learn about the step-by-step process and required documents for your eTA application.
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 mt-auto">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-800">General Information</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Find out about eligibility, exemptions, and important details regarding the eTA.
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 mt-auto">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <h3 className="text-xl font-bold mb-4 text-gray-800">FAQs</h3>
            <p className="text-gray-600 mb-6 flex-grow">
              Get answers to the most frequently asked questions about the Kenyan eTA.
            </p>
            <Link to="/apply" className="text-green-700 font-semibold hover:text-green-800 flex items-center gap-2 mt-auto">
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
