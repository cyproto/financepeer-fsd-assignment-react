import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./dataTable.css";
import { TextField } from "@mui/material";
import { useState } from "react";

export default function DataTable({ data, handleOnBackClick }) {
  const [filteredData, setFilteredData] = useState(data);

  const onSearch = (e) => {
    const searchTerm = e.target.value;
    const response = data.filter(
      (row) =>
        row.data_user_id.toString().toLowerCase().includes(searchTerm) ||
        row.data_id.toString().toLowerCase().includes(searchTerm) ||
        row.data_title.toString().toLowerCase().includes(searchTerm) ||
        row.data_body.toString().toLowerCase().includes(searchTerm)
    );
    setFilteredData(response);
  };
  return (
    <div>
      <div className="search-container">
        <div
          onClick={handleOnBackClick}
          style={{
            marginTop: "10px",
            left: "170px",
            top: "50px",
            position: "fixed",
            fontSize: "20px",
            fontWeight: "bolder",
            display: "flex",
            justifyContent: "center",
            placeItems: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-backspace"
            viewBox="0 0 16 16"
            style={{ marginRight: "5px" }}
          >
            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
          </svg>
          Back
        </div>
        <TextField
          onChange={onSearch}
          label="Search"
          className="search-bar"
        ></TextField>
      </div>
      <TableContainer
        component={Paper}
        style={{ marginTop: "70px", top: "60px" }}
      >
        <Table
          sx={{ minWidth: 1200, maxWidth: 1200 }}
          aria-label="simple table"
        >
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow
                key={row.data_user_id.toString() + index.toString()}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.data_user_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.data_id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.data_title}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.data_body}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {!filteredData.length && (
          <h3
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            No data found
          </h3>
        )}
      </TableContainer>
    </div>
  );
}
