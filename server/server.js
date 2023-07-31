const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const WebSocket = require("ws");
const uuid = require("uuid");

const CreateRoom = require("./data/create_room");
const Player = require("./data/player");

const app = express();
const port = 5000;
const wss = new WebSocket.Server({ port: 8080 });
const clients = [];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const uri =
  "mongodb+srv://streaminteractions:testowanie@cluster0.bgnshvu.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// Websocket connection
wss.on("connection", (ws) => {
  const sessionId = uuid.v4();
  console.log(`New client connected with session ID: ${sessionId}`);

  clients.push({ ws, sessionId });

  // Send the session ID back to the client
  ws.send(JSON.stringify({ type: "session_id", sessionId }));

  ws.on("message", (message) => {
    console.log("New client connected %s", message); // log new client
  });

  ws.on("close", () => {
    const index = clients.findIndex((client) => client.ws === ws);
    if (index > -1) {
      clients.splice(index, 1);
      console.log("Client disconnected"); // log client disconnect
    }
  });
});

// Broadcast data to all clients
function broadcastData(event, data) {
  const json = JSON.stringify({ event, data });
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(json);
    }
  });
}

app.post("/create-room", async (req, res) => {
  try {
    const room = await CreateRoom.create(req.body);
    broadcastData("new-room", room); // Broadcast new room data with the "new-room" event
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

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie ${port}`);
});
