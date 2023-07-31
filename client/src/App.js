import React from 'react';

import Routes from "./Routeing";
import Layout from "./Layout";

import io from "socket.io-client";

import "./App.css";

const socket = io.connect("http://localhost:5000");

const App = () => {
  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
};

export default App;