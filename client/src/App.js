import React from "react";
import Routes from "./Routeing";
import Layout from "./Layout";
import "./App.css";

import { useSocket } from "./socketConnection";

const App = () => {
  const { isConnected } = useSocket();

  return (
    <div className="App">
      <Layout>
        {isConnected ? <Routes /> : <div>Connecting...</div> }
      </Layout>
    </div>
  );
};

export default App;
