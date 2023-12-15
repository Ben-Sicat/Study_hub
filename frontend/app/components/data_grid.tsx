import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import {useEffect, useState} from "react";

interface Reservation {
  id: number;
  userID: number;
  username: string;
  startTime: string;
  endTime: string;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "userID", headerName: "User ID", width: 120 },
  { field: "username", headerName: "Username", width: 150 },
  { field: "startTime", headerName: "Start Time", width: 200 },
  { field: "endTime", headerName: "End Time", width: 200 },
];


export default function DataGridDemo() {

  const [rows, setRows] = useState<Reservation[]>([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/get-reservations")
      .then((response) => response.json())
      .then((data) => {
        setRows(data.reservations);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "#FFFAF6" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
