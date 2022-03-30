import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResponsiveAppBar from "./components/navbar";
import Form from "./pages/form/form";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Profile from "./pages/profile/profile";
import Register from "./pages/register/register";

export default function App() {
  const [refreshInt, setRefreshInt] = useState(1);

  const handleRefresh = () => {
    setRefreshInt(refreshInt +1);
  }
  return (
    <Router>
      <ResponsiveAppBar refreshInt={refreshInt}/>
      <Routes>

          <Route path="/" element={<Home/>} />
          <Route path="/form" element= {<Form />} />
          <Route path="/login" element= {<Login handleRefresh={handleRefresh}/>} />
          <Route path="/register" element= {<Register />} />
          <Route path="/profile" element= {<Profile />} />

      </Routes>
    </Router>
  );
}