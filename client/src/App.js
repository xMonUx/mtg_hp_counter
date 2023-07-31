import React, { useEffect, useState } from 'react';

import Routes from "./Routeing";
import Layout from "./Layout";

import "./App.css";

const App = () => {

  const [socket, setSocket] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket('ws://localhost:8080');
    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    // Listen for messages from the server
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'session_id') {
        // Store the session ID on the client-side (e.g., in state or local storage)
        setSessionId(data.sessionId);
        console.log(`Received session ID from the server: ${data.sessionId}`);
      }
    };

    // Clean up the WebSocket connection when component unmounts
    return () => {
      ws.close();
      console.log('WebSocket connection closed');
    };
  }, []);

  // Handle sending messages from the client to the server if needed
  const sendMessage = (message) => {
    if (socket) {
      socket.send(message);
    }
  };

  return (
    <div className="App">
      <Layout>
        <Routes />
      </Layout>
    </div>
  );
};

export default App;