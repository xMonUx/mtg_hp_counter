import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

import Button from "@mui/material/Button";


function Table() {
  const [rows, setRows] = useState([]);

  const columns = [
    { field: "id", headerName: "Room", width: 200 },
    { field: "name", headerName: "Name", width: 230 },
    { field: "type", headerName: "Type", width: 230 },
    { field: "players", headerName: "Players", width: 230 },
    {
      field: "join",
      headerName: "Join",
      width: 230,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            color="primary"
          >
            Join
          </Button>
        );
      },
    },
  ];

  // Fetch data from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/create-room")
      .then((response) => {
        const dataFromDB = response.data;
        const formattedData = dataFromDB.map((room) => ({
          id: room._id, 
          name: room.name,
          type: room.format,
        }));
        setRows(formattedData);
      })
      .catch((error) => {
        console.log(error.message);
      });

  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        getRowId={(row) => row.id} // Specify the getRowId prop with the custom ID
      />
    </div>
  );
}

export default Table;
