import React from "react";
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
import Conditions from "./pages/0Conditions";
import ExperimentController from "./pages/ExperimentController";

function App() {
  return (
    <RecordingProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/" element={<Landing />} />
          <Route path="/demographics" element={<DemographicQuestionnaire />} />
          <Route path="/gaais" element={<GAAISQuestionnaire />} />
          <Route path="/briefing1" element={<Briefing1 />} />
          <Route path="/briefing2" element={<Briefing2 />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/experimentsection" element={<ExperimentSectionPage category="Geography" questionNumber="4" question="What is the capital of Australia?" promptInstruction="Answer with enthusiasm"  />} />
          <Route path="/perceivedtrust" element={<PerceivedTrust />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/experiment/:step" element={<ExperimentController />} />
        </Routes>
      </Router>
    </RecordingProvider>
  );
}

export default App;

