import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchChatGPTResponse } from "./api/openai";
import Landing from "./pages/1Landing";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Task3 from "./pages/Task3";
import Task4 from "./pages/Task4";
import Briefing from "./pages/4Briefing";
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
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/Task1" element={<Task1 />}/>
          <Route path="/Task2" element={<Task2 />}/>
          <Route path="/Task3" element={<Task3 />}/>
          <Route path="/Task4" element={<Task4 />}/>
          <Route path="/4Briefing" element={<Briefing />} />
          <Route path="/15ThankYou" element={<ThankYou />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
