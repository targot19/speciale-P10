import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Task1 from "./pages/task1";
import './App.css'

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
