import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import Form from "./pages/form/form";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";

export default function App() {
  return (
    <Router>
      <ResponsiveAppBar />
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/form" element= {<Form />} />
          <Route path="/login" element= {<Login />} />
          <Route path="/register" element= {<Register />} />

      </Routes>
    </Router>
  );
}