import React from "react";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/1Landing";
import DemographicQuestionnaire from "./pages/2DemographicQuestionnaire";
import GAAISQuestionnaire from "./pages/3GAAISQuestionnaire";
import Briefing1 from "./pages/4Briefing";
import Briefing2 from "./pages/5Briefing";
import CategoryPage from "./pages/6CategoryPage";
import ExperimentSectionPage from "./pages/7ExperimentSectionPage";
import PerceivedTrust from "./pages/8PerceivedTrust";
import ThankYou from "./pages/9ThankYou";
import "bootstrap/dist/css/bootstrap.css";
import { RecordingProvider } from "./components/screenrecorder/RecordingContext";
import { SessionProvider } from "./context/SessionContext";
import Conditions from "./pages/0Conditions";
import ExperimentController from "./pages/ExperimentController";
import { initAnonymousAuth } from "./firebase/anonAuth";


function App() {

  // Anon. auth when the app mounts
  useEffect(() => {
    initAnonymousAuth();
  }, []);

  return (
    <RecordingProvider>
        <Router>
          <SessionProvider>
            <ScrollToTop />
              <Routes>
                <Route path="/" element={<Conditions />} />
                <Route path="/start" element={<Landing />} />
                <Route path="/demographics" element={<DemographicQuestionnaire />} />
                <Route path="/gaais" element={<GAAISQuestionnaire />} />
                <Route path="/briefing1" element={<Briefing1 />} />
                <Route path="/briefing2" element={<Briefing2 />} />
                <Route path="/experiment/:step" element={<ExperimentController />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/categoryPreview" element={<CategoryPage />} />
                <Route path="/experimentPreview" element={<ExperimentSectionPage category="Geography" questionNumber="4" question="What is the capital of Australia?" promptInstruction="Answer with enthusiasm"  />} />
                <Route path="/perceivedtrustPreview" element={<PerceivedTrust />} />
              </Routes>
            </SessionProvider>
        </Router>
    </RecordingProvider>
  );
}

export default App;

