import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

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

function Locations() {
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
  }

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
      if (mainLocation.name === {} || mainLocation.name === "" || mainLocation.name === undefined ) {
        dispatch({ type: "ADD_FIRST_LOCATION", payload: addLocationName });
        history.push('/locations')
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

  const handleClickDelete = (id) => {
    // console.log(id)
    setIDToDelete(id);
    setDeleteOpen(true);
  };

  const handleClickEdit = (id) => {
    // console.log(id)
    setIDToEdit(id);
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
      payload: { name: newLocName, id: IDToEdit},
    });
    setNewLocName("");
    setEditOpen(false);
  };

  const handleLocationClick = (id) => {
    dispatch({ type: "FETCH_CONTAINERS", payload: id })
    // dispatch({ type: 'FETCH_CURRENT_LOCATION', payload:  { id: id } })
    history.push(`/containers/${id}`)
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
                  <button className="btn_asLinkTables"  onClick={() => handleLocationClick(location.location_id)}><h2>{location.location_name}</h2></button>
                  </TableCell>
                  <TableCell>{String(location.isActive)}</TableCell>
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
