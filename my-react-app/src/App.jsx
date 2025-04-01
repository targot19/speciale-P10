import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect, useState } from "react";
import { fetchChatGPTResponse } from "./api/openai";
import Landing from "./pages/1Landing";
import ExperimentSectionPage from "./pages/7ExperimentSectionPage";
import DemographicQuestionnaire from "./pages/2DemographicQuestionnaire";
import GAAISQuestionnaire from "./pages/3GAAISQuestionnaire";
import Briefing from "./pages/4Briefing";
import PerceivedTrust from "./pages/8PerceivedTrust";
import ThankYou from "./pages/9ThankYou";
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
          <Route path="/demographics" element={<DemographicQuestionnaire />}/>
          <Route path="/gaais" element={<GAAISQuestionnaire />}/>
          <Route path="/briefing" element={<Briefing />} />
          <Route path="/experimentsection" element={<ExperimentSectionPage />} />
          <Route path="/perceivedtrust" element={<PerceivedTrust />} />
          <Route path="/thankyou" element={<ThankYou />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
