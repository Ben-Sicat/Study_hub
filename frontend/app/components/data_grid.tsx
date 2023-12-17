import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

interface Reservation {
  ReservationID: number;
  Seat: string;
  StartTime: string;
  EndTime: string;
  Username: string;
  Price: number;
  ResDate: string;
}

const columns: GridColDef[] = [
  { field: "ReservationID", headerName: "ID", width: 120 },
  { field: "Seat", headerName: "Seat", width: 110 },
  { field: "Username", headerName: "Username", width: 150 },
  { field: "StartTime", headerName: "Start Time", width: 200 },
  { field: "EndTime", headerName: "End Time", width: 200 },
  { field: "ResDate", headerName: "Date", width: 150},
  { field: "Price", headerName: "Price", width: 150 },
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

  // Specify the getRowId function
  const getRowId = (row: Reservation) => row.ReservationID.toString();

  return (
    <Box sx={{ height: 400, width: "100%", backgroundColor: "#FFFAF6" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        pageSize={5}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
