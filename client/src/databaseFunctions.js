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
