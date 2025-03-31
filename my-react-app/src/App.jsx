import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import { fetchChatGPTResponse } from "./api/openai";
import Landing from "./pages/1Landing";
import Music from "./pages/9Music";
import ExperimentSectionPage from "./pages/9ExperimentSectionPage";
import DemographicQuestionnaire from "./pages/2DemographicQuestionnaire";
import GAAISQuestionnaire from "./pages/3GAAISQuestionnaire";
import Briefing from "./pages/4Briefing";
import PerceivedTrust from "./pages/13PerceivedTrust";
import ThankYou from "./pages/15ThankYou";
//import './App.css'

function App() {

  /*const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchChatGPTResponse("Hello, how are you?")
        .then(response => console.log("ChatGPT says:", response))
        .catch(error => console.error("API Error:", error));
      setHasFetched(true);
    }
  }, [hasFetched]);*/

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/experimentsection" element={<ExperimentSectionPage />} />
          <Route path="/Music" element={<Music />}/>
          <Route path="/Demographics" element={<DemographicQuestionnaire />}/>
          <Route path="/GAAIS" element={<GAAISQuestionnaire />}/>
          <Route path="/4Briefing" element={<Briefing />} />
          <Route path="/13PerceivedTrust" element={<PerceivedTrust />} />
          <Route path="/15ThankYou" element={<ThankYou />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
