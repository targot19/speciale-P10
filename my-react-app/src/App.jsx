import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/1Landing";
import ExperimentSectionPage from "./pages/7ExperimentSectionPage";
import DemographicQuestionnaire from "./pages/2DemographicQuestionnaire";
import GAAISQuestionnaire from "./pages/3GAAISQuestionnaire";
import Briefing1 from "./pages/4Briefing";
import PerceivedTrust from "./pages/8PerceivedTrust";
import ThankYou from "./pages/9ThankYou";
import ScreenRecording from "./ScreenRecording";
import "bootstrap/dist/css/bootstrap.css";
import { RecordingProvider } from "./RecordingContext";
import Briefing2 from "./pages/5Briefing";

function App() {
  return (
    <RecordingProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/demographics" element={<DemographicQuestionnaire />} />
          <Route path="/gaais" element={<GAAISQuestionnaire />} />
          <Route path="/briefing1" element={<Briefing1 />} />
          <Route path="/briefing2" element={<Briefing2 />} />
          <Route path="/experimentsection" element={<ExperimentSectionPage />} />
          <Route path="/perceivedtrust" element={<PerceivedTrust />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/screenrecording" element={<ScreenRecording />} />
        </Routes>
      </Router>
    </RecordingProvider>
  );
}

export default App;
