import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [emittedUsername, setEmittedUsername] = useState("");

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
      localStorage.removeItem('username');
    };

    const handleNewUser = (username) => {
      setEmittedUsername(username);
    };

    socket.on("connect", handleConnect);
    socket.on("new_user", handleNewUser);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("new_user", handleNewUser);
      socket.off("disconnect", handleDisconnect);
    };
  });

  return { isConnected, socket, emittedUsername };
};
