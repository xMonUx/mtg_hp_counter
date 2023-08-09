import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";


const socket = io.connect("http://localhost:5000");

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  //jak dokladnie dziala
  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleRoomJoined = (roomId) => {
      console.log(`Joined room ${roomId}`);
      setRoomId(roomId);
      navigate(`/room/${roomId}`); //handleroomjoined + navigate 
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", handleConnect);
    socket.on("room_joined", handleRoomJoined); //handleroomjoined + navigate 
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("room_joined", handleRoomJoined);
      socket.off("disconnect", handleDisconnect);
    };
  });



  return { isConnected, socket };
};


