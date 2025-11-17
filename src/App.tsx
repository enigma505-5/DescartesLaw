import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import About from "./pages/About";
import Simulator from "./pages/Simulator";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Layout from "./components/layout";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/simulator" element={<Simulator />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}