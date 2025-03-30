import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchChatGPTResponse } from "./api/openai";
import Landing from "./pages/Landing";
import Music from "./pages/9Music";
import ExperimentSectionPage from "./pages/9ExperimentSectionPage";
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
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/experimentsection" element={<ExperimentSectionPage />} />
          <Route path="/Music" element={<Music />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
