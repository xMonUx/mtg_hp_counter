const mongoose = require("mongoose");

const playerSchema = mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CreateRoom",
    },
    name: {
      type: String,
      required: [true, "Please enter your name."],
    },
    health: {
      type: Number,
      default: 0,
    },
    poison: {
      type: Number,
      default: 0,
    },
    experience: {
      type: Number,
      default: 0,
    },
    energy: {
      type: Number,
      default: 0,
    },
    tickets: {
      type: Number,
      default: 0,
    },
    sessionId: {
      type: String,
      required: true,
      unique: true, // only one player per session
    },
  },
  {
    timestamps: true,
  }
);

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
