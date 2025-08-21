
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import Index from "./pages/Index";
import MobileIndex from "./pages/MobileIndex";
import NotFound from "./pages/NotFound";
import ApplicationWizard from "./pages/ApplicationWizard";
import MyApplications from "./pages/MyApplications";
import PaymentSuccess from "./pages/PaymentSuccess";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileApplicationProvider } from "@/contexts/MobileApplicationContext";
import MobilePassportPage from "./pages/mobile/MobilePassportPage";
import MobileSelfiePage from "./pages/mobile/MobileSelfiePage";
import MobileContactPage from "./pages/mobile/MobileContactPage";
import MobileTripPage from "./pages/mobile/MobileTripPage";
import MobileTravelerPage from "./pages/mobile/MobileTravelerPage";
import MobileCustomsPage from "./pages/mobile/MobileCustomsPage";
import MobileDocumentsPage from "./pages/mobile/MobileDocumentsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

const AppContent = () => {
  const isMobile = useIsMobile();

  return (
    <Routes>
      <Route path="/" element={isMobile ? <MobileIndex /> : <Index />} />
      <Route path="/apply" element={<ApplicationWizard />} />
      <Route path="/dashboard" element={<MyApplications />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
      
      {/* Mobile Application Routes */}
      <Route path="/application/passport" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobilePassportPage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/selfie" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileSelfiePage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/contact" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileContactPage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/trip" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileTripPage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/traveler" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileTravelerPage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/customs" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileCustomsPage />
        </MobileApplicationProvider>
      } />
      <Route path="/application/documents" element={
        <MobileApplicationProvider travelerType="" applicationType="" country="">
          <MobileDocumentsPage />
        </MobileApplicationProvider>
      } />
      
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
