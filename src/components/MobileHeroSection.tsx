
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Shield, Globe } from 'lucide-react';

export const MobileHeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-brand-green via-brand-green-light to-brand-green-dark text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-white/20 rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white/20 rounded-full" />
      </div>

      <div className="relative px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Mobile-optimized heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Apply for Kenya
            <span className="block text-brand-green-lighter">Electronic Travel Authorisation</span>
          </h1>

          {/* Mobile-friendly description */}
          <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get your eTA in minutes. Fast, secure, and hassle-free online application process.
          </p>

          {/* Mobile-optimized CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              asChild
              variant="brand"
              size="xl"
              className="bg-white text-brand-green hover:bg-gray-50 shadow-lg w-full sm:w-auto"
            >
              <Link to="/apply" className="flex items-center justify-center gap-2">
                Start Application
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button
              asChild
              variant="brand-outline"
              size="xl"
              className="border-white text-white hover:bg-white hover:text-brand-green w-full sm:w-auto"
            >
              <Link to="/dashboard">
                Check Status
              </Link>
            </Button>
          </div>

          {/* Mobile-optimized feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center p-4">
              <Clock className="w-8 h-8 mb-3 text-brand-green-lighter" />
              <h3 className="text-lg font-semibold mb-2">Quick Process</h3>
              <p className="text-sm text-white/80">Complete in 10 minutes</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <Shield className="w-8 h-8 mb-3 text-brand-green-lighter" />
              <h3 className="text-lg font-semibold mb-2">Secure & Safe</h3>
              <p className="text-sm text-white/80">Bank-level security</p>
            </div>
            
            <div className="flex flex-col items-center p-4">
              <Globe className="w-8 h-8 mb-3 text-brand-green-lighter" />
              <h3 className="text-lg font-semibold mb-2">Available 24/7</h3>
              <p className="text-sm text-white/80">Apply anytime, anywhere</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
