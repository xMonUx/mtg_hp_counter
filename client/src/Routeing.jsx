import React from "react";

import Home from "./pages/Home/Home";
import Room from "./pages/Room/Room";
import Welcome from "./pages/Welcome/Welcome";

import { Routes, Route } from "react-router-dom";

function Routeing() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/room/:roomId" element={<Room />} />
    </Routes>
  );
}

export default Routeing;
