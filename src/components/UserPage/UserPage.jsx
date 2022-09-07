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
        <button className="btn">View Items</button>
        <button className="btn">Add New Item</button>
        <button className="btn">Add New Container</button>
      </div>
      <h3 class='recentlyAddedItemsHeader'>Recently Added Items</h3>
      <TableContainer
        sx={{maxWidth: '100%', marginTop: '0px', boxShadow: 2}}
        component={Paper}
      >
        {/* <Toolbar sx={{display: 'flex', justifyContent: "center", backgroundColor: '#fa8072'}}><h3>Recent Items</h3></Toolbar> */}
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#1FBED6'}}>
              <TableCell sx={{minWidth: 100, fontWeight: 'bold', fontSize: '12pt'}}
              >Item Name
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                Container
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
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
                <TableCell>{item.container_name}</TableCell>
                <TableCell>
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
