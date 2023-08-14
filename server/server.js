const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const CreateRoom = require("./data/create_room");
const Player = require("./data/player");
require("dotenv").config();

// Create Express + mongoose server
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

//Create a Socket.io server
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);

let users = [];

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});
 
io.on("connection", (socket) => {
  console.log("User connected with id:", socket.id);

  socket.on("join_room", (data) => {
    const { roomId, storedUsername } = data;
    socket.join(roomId);

    users.push(data);
    io.to(roomId).emit('new_user_response', users);

    io.to(roomId).emit("room_joined", roomId);

    console.log(`Player with id: ${socket.id} and name: ${storedUsername} joined room ${roomId}`);
  });

  socket.on("new_user", (data) => {
    io.emit('new_user_response', users);
  });

  socket.on('disconnect', () => {
    console.log("User disconnected with id:", socket.id);
    users = users.filter((user) => user.socketID !== socket.id);

    io.emit('new_user_response', users);
    socket.disconnect();

  });
});

// End-points
app.post("/create-room", async (req, res) => {
  try {
    const room = await CreateRoom.create(req.body);
    io.emit("new_room_created", room);
    res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/create-room", async (req, res) => {
  try {
    const room = await CreateRoom.find({});
    res.status(200).json(room);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/validate-room/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const room = await CreateRoom.findById(id);

    if (room) {
      res.status(200).json({ isValid: true });
    } else {
      res.status(404).json({ isValid: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.post("/player", async (req, res) => {
  try {
    const player = await Player.create(req.body);
    broadcastData(player);
    res.status(200).json(player);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get("/player", async (req, res) => {
  try {
    const player = await Player.findOne({});
    res.status(200).json(player);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.put("/player", async (req, res) => {
  try {
    const { _id, health } = req.body;

    const updatedPlayer = await Player.findByIdAndUpdate(
      _id,
      { health },
      { new: true }
    );

    if (!updatedPlayer) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(updatedPlayer);
  } catch (error) {
    console.error("Error updating player health:", error);
    res.status(500).json({ message: "Server error" });
  }
});

connect();

server.listen(port, () => {
  console.log(`Express server listening at ${port}`);
});
