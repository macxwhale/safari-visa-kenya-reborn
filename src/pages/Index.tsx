
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16 md:space-y-24">
        {/* Main hero section */}
        <section>
          <div className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden">
            <div className="w-full md:w-1/2 bg-green-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-center order-2 md:order-1">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in">
                Your Visit to Kenya Begins Here
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Apply for your Electronic Travel Authorisation (eTA) online. Fast, safe, and convenient—anywhere, anytime.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/apply">
                  <Button size="lg" className="bg-white text-green-950 hover:bg-gray-200 rounded-full font-semibold transition-colors duration-300 w-full sm:w-48 justify-center">
                    Apply Now
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-green-950 rounded-full font-semibold transition-colors duration-300 bg-transparent w-full sm:w-48 justify-center"
                  >
                    Check Status
                  </Button>
                </Link>
              </div>
            </div>
            <div 
              className="w-full md:w-1/2 bg-cover bg-center min-h-[300px] md:min-h-0 order-1 md:order-2"
              style={{ 
                backgroundImage: "url('https://images.unsplash.com/photo-1574099951389-2a91932cf050?q=80&w=2072&auto=format&fit=crop')"
              }}
            >
            </div>
          </div>
        </section>

        {/* Bottom sections */}
        <section>
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
        </section>
      </main>
    </div>
  );
}
