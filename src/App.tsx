
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
