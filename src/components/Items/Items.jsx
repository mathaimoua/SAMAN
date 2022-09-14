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

import { Button } from "@mui/material";

// Path is "/:locID/:containerID/additem/"

function Items(){

  const history = useHistory();
  const dispatch = useDispatch();
  const paramID = useParams();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState(-1);
  const items = useSelector(store => store.items.containerItems)
  const currentContainer = useSelector(store => store.containers.currentContainer)

  useEffect(() => {
    refresh(paramID.containerID)
  }, [dispatch]);

  const handleDelete = () => {
    dispatch({ 
      type: 'DELETE_ITEM', 
      payload: {deleteID: IDToDelete, container: paramID.containerID} });
    setIDToDelete(-1);
    setDeleteOpen(false);
  };

  const handleItemClick = (itemID) => {
    // dispatch({type: 'FETCH_CURRENT_ITEM', payload: itemID})
    history.push(`/${paramID.locID}/${paramID.containerID}/details/${itemID}`)
  }

  const handleClickDelete = (itemID) => {
    // console.log('deleting item', itemID)
    setIDToDelete(itemID);
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const clickAddItem = () => {
    history.push(`/${paramID.locID}/${paramID.containerID}/additem/`)
  }

  const refresh = (refreshID) => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    dispatch({ type: 'FETCH_CONTAINER_ITEMS', payload: refreshID })
    dispatch({ type: 'FETCH_CURRENT_CONTAINER', payload: paramID.containerID })
  }

  return(
    <div className="itemsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <div className="containersDataContainer">
        <h2 style={{margin: '0px'}}>Items of {currentContainer.container_name}</h2>
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
                  Item Name
                </TableCell>
                <TableCell 
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Current Holder
                </TableCell>
                <TableCell
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Serial
                </TableCell>
                <TableCell
                  sx={{ minWidth: 50, fontWeight: "bold", fontSize: "12pt" }}
                >
                  Model
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {items.map((item) => (
                <TableRow
                  hover
                  key={item.item_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                  <button className="btn_asLinkTables"  onClick={() => handleItemClick(item.item_id)}><h2>{item.item_name}</h2></button>
                  </TableCell>
                  <TableCell
                  align="left"
                  sx={{ minWidth: 25, fontSize: "12pt" }}
                  >
                    {item.current_holder}
                  </TableCell>
                  <TableCell
                  align="left"
                  sx={{ minWidth: 25, fontSize: "12pt" }}
                  >
                    {item.serial}
                  </TableCell>
                  <TableCell
                  align="left"
                  sx={{ minWidth: 25, fontSize: "12pt" }}
                  >
                    {item.model}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ minWidth: 25, fontWeight: "bold", fontSize: "12pt" }}
                  >
                    <Button
                      onClick={() => handleClickDelete(item.item_id)}
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
          <button className="btn" onClick={clickAddItem}>
            Add New Item
          </button>
        </div>

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
              Are you sure you want to delete this item? This cannot be undone!
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

      </div>
    </div>
  )
}

export default Items;