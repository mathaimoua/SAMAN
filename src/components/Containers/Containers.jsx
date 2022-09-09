import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

// Table Imports
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Confirmation Dialogue Imports
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

function Containers() {

  const history = useHistory();
  const dispatch = useDispatch();
  const mainLocation = useSelector((store) => store.locations.main);
  const containers = useSelector(store => store.containers)

  useEffect(() => {
    dispatch({ type: "FETCH_CONTAINERS", payload: mainLocation.location_id });
  }, []);

  return (
    <div className="containersContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="containersDataContainer">
        <h1>Containers of {mainLocation.location_name}</h1>
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
                  Container Name
                </TableCell>
                <TableCell
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Number of Items
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {containers && containers.map((container) => (
                <TableRow
                  hover
                  key={container.container_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={"/items/"}>
                      {container.container_name}
                    </Link>
                  </TableCell>
                  <TableCell></TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="addLocationBtn">
          <button className="btn">
            Add New Container
          </button>
        </div>
      </div>
    </div>
  );
}

export default Containers;
