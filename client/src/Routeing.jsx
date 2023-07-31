import React from "react";

import Home from "./pages/Home";
import Room from "./pages/Room";

import { Routes, Route } from "react-router-dom";

function Routeing() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/room" element={<Room />} />
    </Routes>
  );
}

export default Routeing;
