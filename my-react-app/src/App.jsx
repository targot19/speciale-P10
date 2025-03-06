import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Task1 from "./pages/Task1";
//mport './App.css'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/task1" element={<Task1 />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
