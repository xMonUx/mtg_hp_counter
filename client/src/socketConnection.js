import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://172.30.97.131:5000", {'force new connection': true });

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomJoined, setRoomJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleRoomJoined = (roomId) => {
      console.log(`Joined room ${roomId}`);
      setRoomJoined(true);
      setRoomId(roomId);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.once("connect", handleConnect);
    socket.once("room_joined", handleRoomJoined);
    socket.once("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("room_joined", handleRoomJoined);
      socket.off("disconnect", handleDisconnect);
    };
  }, []);

  useEffect(() => {
    if (roomJoined && !hasNavigated) {
      navigate(`/room/${roomId}`);
      setHasNavigated(true);
    }
  }, [roomJoined, navigate, roomId, hasNavigated]);

  return { isConnected, socket };
};

function socketConnection() {
  return null;
}

export default socketConnection;
