
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, Globe, CheckCircle } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <Navbar />

      <main className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/90 z-10"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: "url('https://images.unsplash.com/photo-1574099951389-2a91932cf050?q=80&w=2072&auto=format&fit=crop')"
            }}
          ></div>
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6 animate-fade-in">
                <Globe className="w-4 h-4 mr-2" />
                Official Kenya eTA Portal
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
                Your Journey to
                <span className="block bg-gradient-to-r from-green-300 to-emerald-200 bg-clip-text text-transparent">
                  Kenya Starts Here
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-green-50 mb-10 max-w-2xl leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Apply for your Electronic Travel Authorization online. 
                <span className="block mt-2 font-medium">Fast, secure, and available 24/7.</span>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <Link to="/apply">
                  <Button size="lg" className="bg-white text-green-900 hover:bg-green-50 rounded-xl font-semibold px-8 py-4 h-auto text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                    Apply for eTA
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button 
                    size="lg"
                    variant="outline" 
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm rounded-xl font-semibold px-8 py-4 h-auto text-lg transition-all duration-300"
                  >
                    Check Application Status
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Our eTA Service?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the fastest and most secure way to obtain your Kenya travel authorization
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="group">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Processing</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get your eTA approved in as little as 24 hours. Our streamlined process ensures quick turnaround times.
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure & Safe</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your personal information is protected with bank-level encryption and secure data handling.
                  </p>
                </div>
              </div>
              
              <div className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">High Success Rate</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Over 99% approval rate with our expert review process and comprehensive application support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Information Cards Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Everything You Need to Know
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive information to make your eTA application process smooth and straightforward
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="group cursor-pointer">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">How to Apply</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Step-by-step guidance through the application process, including required documents and eligibility criteria.
                  </p>
                  <Link to="/apply" className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors">
                    Start Application
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Requirements & Info</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Complete information about eligibility requirements, exemptions, and important travel guidelines.
                  </p>
                  <Link to="/apply" className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                    View Requirements
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              <div className="group cursor-pointer">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1 h-full flex flex-col">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-lg">?</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Help & Support</h3>
                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    Frequently asked questions and comprehensive support to help you through every step of the process.
                  </p>
                  <Link to="/apply" className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                    Get Help
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
              Join thousands of travelers who have successfully obtained their Kenya eTA through our secure platform.
            </p>
            <Link to="/apply">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 rounded-xl font-semibold px-12 py-4 h-auto text-lg shadow-lg hover:shadow-xl transition-all duration-300 group">
                Begin Your Application
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
