const mongoose = require('mongoose');

const roomSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a room name."]
        },
        format: {
            type: String, 
            required: [true, "Please enter a game format."]
        },
        players: {
            type: Number,
            required: [true, "Please, enter how many players can join."]
        },
        currentPlayers: {
            type: Number,
            default: 0,
        },
        password: {
            type: String,
            required: [true, "Please enter a password for the room."],
            validate: {
                validator: function (value) {
                },
                message: "Invalid password format. Password can only contain numbers, letters, and special symbols."
            }
        },
        host: {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    },
    {
        timestamps: true
    }
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
