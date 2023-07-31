import React from 'react';
import {useEffect, useState} from 'react';
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

export const useSocket = () => {
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });
        return () => {
            socket.disconnect();
        };
    }, []);

    return {isConnected, socket};
};



function socketConnection() {
  return (
    <div>socketConnection</div>
  )
}

export default socketConnection