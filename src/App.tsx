import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import OperationalUnits from "./pages/OperationalUnits";
import MissionArchive from "./pages/MissionArchive";
import Headquarters from "./pages/Headquarters";
import StrikeTeam from "./pages/StrikeTeam";
import DeployMission from "./pages/DeployMission";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="noise-overlay">
          <Navbar />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/operational-units" element={<OperationalUnits />} />
            <Route path="/mission-archive" element={<MissionArchive />} />
            <Route path="/headquarters" element={<Headquarters />} />
            <Route path="/strike-team" element={<StrikeTeam />} />
            <Route path="/deploy-mission" element={<DeployMission />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
