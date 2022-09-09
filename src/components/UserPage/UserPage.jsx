import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

// MUI Table Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function UserPage() {

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.items);
  const mainLocation = useSelector((store) => store.locations.main);

  const handleLocationClick = () => {
    dispatch({type: "FETCH_CONTAINERS", payload: mainLocation.location_id })
    history.push('/containers')
  }

  return (
    <div className="dashBoardContainer">
      <div>
        <h2>Welcome, {user.username}!</h2>
        <h2>Currently managing: { mainLocation ? <button className="btn_asLink2"  onClick={handleLocationClick}><h2>{mainLocation.location_name}</h2></button> : <p className="noLocationText">No location set, please create a location!</p> }</h2>
        <p></p>
        <button className="btn">View Items</button>
        <button className="btn">Add New Item</button>
        <button className="btn">Add New Container</button>
      </div>
      <h3 className='recentlyAddedItemsHeader'>Recently Added Items</h3>
      <TableContainer
        sx={{maxWidth: '100%', marginTop: '0px', boxShadow: 2}}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{backgroundColor: '#fa8072'}}>
              <TableCell onClick={() => {handleSort('item_name')}} sx={{minWidth: 100, fontWeight: 'bold', fontSize: '12pt'}}
              >Item Name
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                Container
              </TableCell>
              <TableCell sx={{ minWidth: 100, fontWeight: 'bold', fontSize: '12pt' }}>
                Date Added
              </TableCell>
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
