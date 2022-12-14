import { useHistory, useParams } from "react-router-dom";
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

import { Button, useTheme, useMediaQuery } from "@mui/material";

function Locations() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const paramID = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState();
  const [IDToEdit, setIDToEdit] = useState();
  const [newLocName, setNewLocName] = useState("");
  const locations = useSelector((store) => store.locations.allLocations);
  const mainLocation = useSelector((store) => store.locations.main);
  const [addOpen, setAddOpen] = useState(false);
  const [addLocationName, setAddLocationName] = useState("");

  const changeNewLocName = (event) => {
    setNewLocName(event.target.value);
  };

  const changeAddLocationName = (event) => {
    setAddLocationName(event.target.value);
  };

  const handleClickAdd = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddLocation = () => {
    if (addLocationName === "") {
      return -1;
    } else {
      if (
        mainLocation.location_name == "" ||
        mainLocation.location_name == undefined ||
        !mainLocation ||
        !mainLocation.location_name
      ) {
        dispatch({ type: "ADD_FIRST_LOCATION", payload: addLocationName });
        history.push("/locations");
      } else {
        dispatch({ type: "ADD_LOCATION", payload: addLocationName });
        history.push("/locations");
      }
    }
  };

  const handleDelete = () => {
    // console.log("id to delete is", IDToDelete);
    dispatch({ type: "DELETE_LOC", payload: IDToDelete });
    setDeleteOpen(false);
  };

  const handleClickDelete = (locID) => {
    // console.log(id)
    setIDToDelete(locID);
    setDeleteOpen(true);
  };

  const handleClickEdit = (locID) => {
    // console.log(id)
    setIDToEdit(locID);
    setEditOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditNewName = () => {
    // console.log("id to edit is", IDToEdit);
    // console.log("new name will be", newLocName);
    dispatch({
      type: "SET_LOCATION_NAME",
      payload: { name: newLocName, id: IDToEdit },
    });
    setNewLocName("");
    setEditOpen(false);
  };

  const handleLocationClick = (locationID) => {
    dispatch({ type: "FETCH_CONTAINERS", payload: locationID });
    // dispatch({ type: 'FETCH_CURRENT_LOCATION', payload:  { id: id } })
    history.push(`/${locationID}/containers/`);
  };

  const handleSetMain = (locationID) => {
    console.log("switching to true!");
    dispatch({ type: "SET_NEW_MAIN", payload: locationID });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [dispatch]);

  return (
    <div className="locationsContainer">
      <div className="locationsDataContainer">
        {isMatch && (
          <button
            className="btn"
            onClick={() => history.goBack()}
            style={{ display: "flex", margin: "10px" }}
          >
            Back
          </button>
        )}
        <h2 style={{ margin: "0px" }}>Your Locations</h2>

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
                    <button
                      className="btn_asLinkTables"
                      onClick={() => handleLocationClick(location.location_id)}
                    >
                      <h2>{location.location_name}</h2>
                    </button>
                  </TableCell>
                  {location.isActive ? (
                    <TableCell>{String(location.isActive)}</TableCell>
                  ) : (
                    <TableCell>
                      <button
                        className="btn_asLinkTables"
                        onClick={() => handleSetMain(location.location_id)}
                      >
                        Set as main
                      </button>
                    </TableCell>
                  )}
                  <TableCell
                    align="left"
                    sx={{ minWidth: 25, fontWeight: "bold", fontSize: "12pt" }}
                  >
                    <Button
                      onClick={() => handleClickEdit(location.location_id)}
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
                      // onClick={() => handleDelete(location.location_id)}
                      onClick={() => handleClickDelete(location.location_id)}
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
          <button className="btn" onClick={handleClickAdd}>
            Add New Location
          </button>
        </div>

        {/* Delete Button Dialog */}
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "#C0BCB6",
              boxShadow: "none",
            },
          }}
          open={deleteOpen}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Permanently Delete Location?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this location? This will delete
              all containers and items in the current location!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleDeleteClose}>
              Cancel
            </Button>
            <Button
              sx={{
                border: "1px solid black",
                backgroundColor: "#555555",
                color: "salmon",
              }}
              onClick={handleDelete}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Form Dialog */}
        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "#C0BCB6",
              boxShadow: "none",
            },
          }}
          open={editOpen}
          onClose={handleEditClose}
        >
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a new name for the location.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={newLocName}
              onChange={changeNewLocName}
              label="Location Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleEditClose}>
              Cancel
            </Button>
            <Button
              sx={{
                border: "1px solid black",
                backgroundColor: "#97c30a",
                color: "black",
              }}
              onClick={handleEditNewName}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          PaperProps={{
            style: {
              backgroundColor: "#C0BCB6",
              boxShadow: "none",
            },
          }}
          open={addOpen}
          onClose={handleAddClose}
        >
          <DialogTitle>Add New Location</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a new name for the location.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={addLocationName}
              onChange={changeAddLocationName}
              label="Location Name"
              type="text"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button sx={{ color: "black" }} onClick={handleAddClose}>
              Cancel
            </Button>
            <Button
              sx={{
                border: "1px solid black",
                backgroundColor: "#97c30a",
                color: "black",
              }}
              onClick={handleAddLocation}
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Locations;
