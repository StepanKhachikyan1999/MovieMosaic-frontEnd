import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import AboutUs from "./AboutUs";
import NotFound from "./NotFound";

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
