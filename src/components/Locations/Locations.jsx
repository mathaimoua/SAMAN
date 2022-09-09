import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Table Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Confirmation Dialogue Imports
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Button } from "@mui/material";

function Locations() {
  const history = useHistory();
  const locations = useSelector((store) => store.locations.allLocations);

  const handleAddLocation = () => {
    history.push('/addlocation')
  }

  const handleDelete = (ID) => {
    // console.log(ID);

  }

  return (
    <div className="locationsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="locationsDataContainer">
        <h2>Your Locations</h2>

        <TableContainer
          sx={{
            maxWidth: "100%",
            marginTop: "0px",
            marginBottom: "5px",
            boxShadow: 2,
          }}
          component={Paper}
        >
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fa8072" }}>
                <TableCell
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Location Name
                </TableCell>
                <TableCell
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  isActive
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map((location) => (
                <TableRow
                  hover
                  key={location.location_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={'/location/'+location.location_id}>
                      {location.location_name}
                    </Link>
                  </TableCell>
                  <TableCell>{String(location.isActive)}</TableCell>
                  <TableCell
                    align="left"
                    sx={{ minWidth: 25, fontWeight: "bold", fontSize: "12pt" }}
                  >
                    <Button
                      sx={{
                        marginTop: ".5em",
                        marginLeft: "auto",
                        color: "black",
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ minWidth: 25, fontWeight: "bold", fontSize: "12pt" }}
                  >
                    <Button
                      onClick={() => handleDelete(location.location_id)}
                      sx={{
                        marginTop: ".5em",
                        marginLeft: "auto",
                        color: "red",
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="addLocationBtn">
          <button className="btn" onClick={handleAddLocation}>Add New Location</button>
        </div>
      </div>
    </div>
  );
}

export default Locations;
