
import { MobileHeader } from "@/components/MobileHeader";
import { MobileHeroSection } from "@/components/MobileHeroSection";
import { MobileInfoCards } from "@/components/MobileInfoCards";
import DiscoverKenyaBanner from "@/components/DiscoverKenyaBanner";
import Footer from "@/components/Footer";

export default function MobileIndex() {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <MobileHeader />
      <main className="flex-1">
        <MobileHeroSection />
        <MobileInfoCards />
        <DiscoverKenyaBanner />
      </main>
      <Footer />
    </div>
  );
}
