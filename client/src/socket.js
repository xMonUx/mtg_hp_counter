import io from "socket.io-client";

const socket = io.connect("http://172.30.97.131:5000");

export default socket;
