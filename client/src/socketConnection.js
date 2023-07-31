import React from 'react';
import {useEffect, useState} from 'react';
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io.connect("http://localhost:5000");

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("room_joined", (roomId) => {
            console.log(`Joined room ${roomId}`);
            navigate(`/room/${roomId}`);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });
        return () => {
            socket.disconnect();
        };
    }, [navigate]);

    return {isConnected, socket};
};



function socketConnection() {
  return (
    <div>socketConnection</div>
  )
}

export default socketConnection