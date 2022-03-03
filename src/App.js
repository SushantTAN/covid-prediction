import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import Form from "./pages/form/form";
import Home from "./pages/home/home";

export default function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/form" element= {<Form />} />

      </Routes>
    </Router>
  );
}