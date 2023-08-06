import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://192.168.1.13:5000");

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleRoomJoined = (roomId) => {
      console.log(`Joined room ${roomId}`);
      setRoomId(roomId);
      navigate(`/room/${roomId}`);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("room_joined", handleRoomJoined);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("room_joined", handleRoomJoined);
      socket.off("disconnect", handleDisconnect);
    };
  }, [navigate]);



  return { isConnected, socket };
};

function socketConnection() {
  return null;
}

export default socketConnection;
