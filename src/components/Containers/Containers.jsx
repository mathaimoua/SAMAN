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

import { Button } from "@mui/material";

function Containers() {

  const paramID = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useSelector((store) => store.locations);
  const containers = useSelector(store => store.containers)
  const [addOpen, setAddOpen] = useState(false);
  const [newContainerName, setNewContainerName] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState(-1);
  const [editOpen, setEditOpen] = useState(false);
  const [IDToEdit, setIDToEdit] = useState();

  useEffect(() => {
    refresh()
  }, [dispatch]);

  const refresh = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    dispatch({ type: 'FETCH_CONTAINERS', payload: paramID.locID})
    dispatch({ type: 'FETCH_CURRENT_LOCATION', payload:  { id: paramID.locID } })
  }

  const handleAddContainer = () => {
    // console.log(id)
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const changeNewContainerName = (event) => {
    setNewContainerName(event.target.value)
  }

  const handleCreateContainer = () => {
    // console.log('creating container named', newContainerName)
    dispatch({
      type: 'CREATE_CONTAINER', 
      payload: {name: newContainerName, location: paramID.locID} });
    setNewContainerName('');
    setAddOpen(false);
  }

  const handleDelete = () => {
    dispatch({ 
      type: 'DELETE_CONTAINER', 
      payload: {container: IDToDelete, location: paramID.locID} });
    setIDToDelete(-1);
    setDeleteOpen(false);
  };

  const handleClickDelete = (containerID) => {
    // console.log('deleting container', containerID)
    setIDToDelete(containerID);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleClickEdit = (newID) => {
    // console.log(id)
    setIDToEdit(newID);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditNewName = () => {
    console.log("id to edit is", IDToEdit);
    console.log("new name will be", newContainerName);
    dispatch({
      type: "SET_CONTAINER_NAME",
      payload: { name: newContainerName, id: IDToEdit,  location: Number(paramID.locID)}
    });
    setNewContainerName("");
    setEditOpen(false);
  };

  const handleContainerClick = (id) => {
    // dispatch({type: "FETCH_CONTAINER_ITEMS", payload: id })
    history.push(`/${paramID.locID}/${id}/items`)
  }

  return (
    <div className="containersContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="containersDataContainer">
        {location.currentLocation && <h2 style={{margin: '0px'}}>Containers of {location.currentLocation.location_name}</h2>}
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
            {containers.containersList.map((container) => (
                <TableRow
                  hover
                  key={container.container_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <button className="btn_asLinkTables" onClick={() => handleContainerClick(container.container_id)}>
                      <h2>{container.container_name}</h2>
                    </button>
                  </TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell
                    align="left"
                    sx={{ minWidth: 25, fontWeight: "bold", fontSize: "12pt" }}
                  >
                    <Button
                      onClick={() => handleClickEdit(container.container_id)}
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
                      onClick={() => handleClickDelete(container.container_id)}
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
          <button className="btn" onClick={handleAddContainer}>
            Add New Container
          </button>
        </div>

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
          <DialogTitle>Add New Container</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter a name for the container.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={newContainerName}
              onChange={changeNewContainerName}
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
              onClick={handleCreateContainer}
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
              Are you sure you want to delete this container? This will delete
              all items in the current container!
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
              Please enter a new name for the container.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={newContainerName}
              onChange={changeNewContainerName}
              label="Container Name"
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
      </div>
    </div>
  );
}

export default Containers;
