import React from "react";
import Routes from "./Routeing";
import "./App.css";

import { useSocket } from "./socketConnection";

const App = () => {
  useSocket();

  return (
    <div className="App">
        <Routes />
    </div>
  );
};

export default App;
