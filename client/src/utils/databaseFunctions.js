import axios from "axios";

export const fetchRooms = async () => {
  try {
    const response = await axios.get("http://localhost:5000/create-room");
    return response.data;
  } catch (error) {
    console.log("Error fetching data:", error);
    return [];
  }
};

export function createRoom(data) {
  return axios
    .post("http://localhost:5000/create-room", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error creating room", error);
      throw error;
    });
}


export async function joinRoomWithValidation(socket, storedUsername, roomId, navigate) {
  try {
    const response = await fetch(`http://localhost:5000/validate-room/${roomId}`);
    const data = await response.json();

    if (data.isValid) {
      socket.emit("join_room", { storedUsername, roomId });
      socket.emit("new_user", { storedUsername, SocketID: socket.id });
      navigate(`/room/${roomId}`);
    } else {
      alert("Invalid Room ID");
    }
  } catch (error) {
    console.error(error);
    alert("Error validating Room ID");
  }
}
