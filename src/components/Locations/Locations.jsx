import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

// Table Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Locations() {
  const history = useHistory();
  const locations = useSelector((store) => store.locations.allLocations);


  return (
    <div className="locationsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="locationsDataContainer">
        <h2>Your Locations</h2>

        <TableContainer
          sx={{ maxWidth: "100%", marginTop: "0px", boxShadow: 2 }}
          component={Paper}
        >
          {/* <Toolbar sx={{display: 'flex', justifyContent: "center", backgroundColor: '#fa8072'}}><h3>Recent Items</h3></Toolbar> */}
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#fa8072" }}>
                <TableCell
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Location Name
                </TableCell>
                <TableCell
                  sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
                >
                  isActive
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {locations.map(location => (
                <TableRow
                  hover
                  key={location.location_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {location.location_name}
                  </TableCell>
                  <TableCell>{String(location.isActive)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default Locations;
