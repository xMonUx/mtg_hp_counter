import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSocket } from "../../socketConnection";
import { DataGrid } from "@mui/x-data-grid";
import JoinModal from "../modal/JoinModal";
import Button from "@mui/material/Button";

function Table() {
  const { socket } = useSocket();
  const [rows, setRows] = useState([]);
  const [isJoinModalOpen, setJoinModalOpen] = useState(false);

  const joinRoom = () => {
    setJoinModalOpen(true);
  };

  const columns = [
    { field: "id", headerName: "Room", width: 200 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "format", headerName: "Type", width: 230 },
    { field: "players", headerName: "Players", width: 230 },
    {
      field: "join",
      headerName: "Join",
      width: 230,
      renderCell: (params) => {
        return (
          <Button variant="contained" color="primary" onClick={joinRoom}>
            Join
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    fetchData();
    socket.on("new_room_created", handleNewRoom);

    return () => {
      socket.off("new_room_created", handleNewRoom);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/create-room");
      const rowsWithIds = response.data.map((row) => ({
        ...row,
        id: row._id,
      }));
      setRows(rowsWithIds);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleNewRoom = (newRoom) => {
    setRows((prevRows) => [...prevRows, { ...newRoom, id: newRoom._id }]);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        getRowId={(row) => row.id} 
      />
      {isJoinModalOpen && <JoinModal onClose={() => setJoinModalOpen(false)} />}
    </div>
  );
}

export default Table;
