import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Task3 from "./pages/Task3";
import Task4 from "./pages/Task4";
import './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/Task1" element={<Task1 />}/>
          <Route path="/Task2" element={<Task2 />}/>
          <Route path="/Task3" element={<Task3 />}/>
          <Route path="/Task4" element={<Task4 />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
