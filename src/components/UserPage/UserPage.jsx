import React from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

// MUI Table Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";

function UserPage() {
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.items);

  return (
    <div className="dashBoardContainer">
      <div>
        <h2>Welcome, {user.username}!</h2>
        <h2>Location</h2>
        <button className="button-54">View Items</button>
        <button className="button-54">Add New Item</button>
        <button className="button-54">Add New Container</button>
      </div>
      <TableContainer
        sx={{ width: "80%", marginLeft: "10%", marginTop: '25px', boxShadow: 2}}
        component={Paper}
      >
        <Toolbar sx={{justifyContent: "center", backgroundColor: '#fa8072'}}><h3>Recent Items</h3></Toolbar>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ maxWidth: 100, fontWeight: 'bold' }}>Item Name</TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold' }} align="right">
                Container
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold' }} align="right">
                Date Added
              </TableCell>
              {/* <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                hover
                key={item.serial}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.item_name}
                </TableCell>
                <TableCell align="right">{item.container_name}</TableCell>
                <TableCell align="right">
                  <Moment format="MMM Do YYYY">{item.date_added}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserPage;
