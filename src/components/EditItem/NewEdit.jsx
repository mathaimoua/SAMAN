import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import {
  Box,
  Paper,
  FormControl,
  FormHelperText,
  FormGroup,
  useMediaQuery,
  useTheme,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function NewEdit() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const [saveOpen, setSaveOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState(-1);
  const itemID = useParams();
  const currentItem = useSelector((store) => store.items.currentItem);
  const history = useHistory();
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const containersList = useSelector(
    (store) => store.containers.containersList
  );
  const [newContainer, setNewContainer] = useState();
  const [itemInfo, setItemInfo] = useState({
    name: String(currentItem.item_name),
    holder: currentItem.current_holder,
    container: itemID.containerID, //switch to ID
    model: currentItem.model,
    serial: currentItem.serial,
    warranty: moment(currentItem.warranty_expiration).format("YYYY-MM-DD"),
    state: currentItem.state,
    description: currentItem.description,
  });

  useEffect(() => {
    refresh();
  }, [dispatch]); // Stop when item in brackets changes

  const refresh = () => {
    dispatch({ type: "FETCH_CONTAINERS", payload: itemID.locID });
    dispatch({ type: "FETCH_CURRENT_ITEM", payload: itemID.itemID });
    setDate(currentItem.warranty_expiration);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleNameChange = (event) => {
    setItemInfo({ ...itemInfo, name: event.target.value });
    console.log(itemInfo);
  };
  const handleHolderChange = (event) => {
    setItemInfo({ ...itemInfo, holder: event.target.value });
    // console.log(itemInfo)
  };

  const handleModelChange = (event) => {
    setItemInfo({ ...itemInfo, model: event.target.value });
    // console.log(itemInfo)
  };

  const handleSerialChange = (event) => {
    setItemInfo({ ...itemInfo, serial: event.target.value });
    // console.log(itemInfo)
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setItemInfo({ ...itemInfo, warranty: event.target.value });
    // console.log(moment(event.target.value).format("MMM Do YYYY"));
  };

  const handleStateChange = (event) => {
    // console.log(event.target.value);
    // setState(event.target.value);
    setItemInfo({ ...itemInfo, state: event.target.value });
  };

  const handleClickSave = () => {
    // console.log('deleting item', itemID)
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  const handleSave = () => {
    console.log(itemInfo)
    dispatch({
      type: "EDIT_ITEM",
      payload: { id: currentItem.item_id, info: itemInfo },
    });
    setSaveOpen(false);
    history.push(
      `/${itemID.locID}/${itemInfo.container}/details/${itemID.itemID}`
    );
  };

  const handleDelete = () => {
    // console.log('DELETING!')
    dispatch({
      type: "DELETE_ITEM",
      payload: { deleteID: itemID.itemID, container: itemID.containerID },
    });
    setDeleteOpen(false);
    history.push(`/${itemID.locID}/${itemID.containerID}/items`);
  };

  const handleClickDelete = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleDescriptionChange = (event) => {
    setItemInfo({ ...itemInfo, description: event.target.value });
  }

  const handleContainerChange = (event) => {
    console.log(event.target.value);
    setNewContainer(event.target.value);
    setItemInfo({ ...itemInfo, container: event.target.value });
  };

  return (
    <div id="formApp">
      {isMatch && (
        <button
          style={{ marginLeft: "10px" }}
          className="btn"
          onClick={() => history.goBack()}
        >
          Back
        </button>
      )}
      <div className="newFormContainer" style={{ margin: "auto" }}>
        <div className="title">
          <h1 style={{ margin: "0px" }}>Edit Item</h1>
        </div>
        <FormGroup className="form-wrapper">
          <div className="inputs">
            <div className="input-component">
              <label htmlFor="name">Name</label>
              <TextField
                required
                autoFocus={true}
                defaultValue={itemInfo.name}
                onChange={handleNameChange}
              />
              {/* <input class="input" type="text" name="name" id="surname" /> */}
            </div>
            <div className="input-component">
              <label htmlFor="name">Current Holder</label>
              <TextField defaultValue={itemInfo.holder} onChange={handleHolderChange} />
              {/* <input class="input" type="text" name="name" id="name" /> */}
            </div>
            <div className="input-component input__big">
              <label htmlFor="bio">Description</label>
              <textarea
                className="input"
                name="bio"
                id="bio"
                defaultValue={itemInfo && itemInfo.description}
                onChange={handleDescriptionChange}
              ></textarea>
            </div>
            <div className="input-component">
              <label htmlFor="warranty">Warranty Expiration</label>
              <TextField
                readOnly
                value={moment(date).format("MMM Do YYYY")}
              />
              <input
                style={{ height: "40px", width: "auto" }}
                type="date"
                className="hidden"
                onChange={handleDateChange}
              />
            </div>
            <div className="input-component">
              <label htmlFor="phone">Container</label>
              <Select id="stateSelect" onChange={handleContainerChange} value={itemInfo.container}>
                {containersList &&
                  containersList.map((container) => {
                    return (
                      <MenuItem
                        key={container.container_id}
                        value={container.container_id}
                      >
                        {container.container_name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </div>
            <div className="input-component">
              <label htmlFor="phone">State</label>
              <Select
                id="stateSelect"
                defaultValue={itemInfo.state}
                onChange={handleStateChange}
              >
                <MenuItem value={"IN USE"}>IN USE</MenuItem>
                <MenuItem value={"IN STOCK"}>IN STOCK</MenuItem>
                <MenuItem value={"LOST"}>LOST</MenuItem>
                <MenuItem value={"NEEDS REPAIR"}>NEEDS REPAIR</MenuItem>
                <MenuItem value={"WAITING FOR DISPOSAL"}>
                  WAITING FOR DISPOSAL
                </MenuItem>
              </Select>
            </div>
            <div className="input-component">
              <span>
                <label>Model</label>
                <button className="btn" style={{ marginLeft: "10px" }}>
                  SCAN
                </button>
              </span>
              <TextField defaultValue={itemInfo.model} onChange={handleModelChange} />
              {/* <input class="input" type="text" name="city" id="city" /> */}
            </div>
            <div className="input-component">
              <span>
                <label>Serial Number</label>
                <button className="btn" style={{ marginLeft: "10px" }}>
                  SCAN
                </button>
              </span>
              <TextField defaultValue={itemInfo.serial} onChange={handleSerialChange} />
              {/* <input class="input" type="" name="zip" id="zip" /> */}
            </div>
          </div>
          <div className="actions">
          <button
              className="btnRed"
              style={{ marginTop: "30px", marginRight: '10%'}}
              onClick={handleClickDelete}
            >
              Delete Item
            </button>
            <button
              className="btn"
              type="submit"
              style={{ marginTop: "30px", marginLeft: '10%'}}
              onClick={handleClickSave}
            >
              Submit
            </button>
          </div>
        </FormGroup>
      </div>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#C0BCB6",
            boxShadow: "none",
          },
        }}
        open={saveOpen}
        onClose={handleSaveClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add item?"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ textAlign: "center" }}
          >
            <span style={{ fontWeight: "bold" }}>Name: </span>
            {itemInfo.name}
            <br></br>
            <span style={{ fontWeight: "bold" }}>Current Holder: </span>
            {itemInfo.holder}
            <br></br>
            <span style={{ fontWeight: "bold" }}>Container: </span>
            {itemInfo.container}
            <br></br>
            <span style={{ fontWeight: "bold" }}>Model: </span>
            {itemInfo.model}
            <br></br>
            <span style={{ fontWeight: "bold" }}>Serial: </span>
            {itemInfo.serial}
            <br></br>
            <span style={{ fontWeight: "bold" }}>
              Warranty Expiration Date:{" "}
            </span>
            {itemInfo.warranty}
            <br></br>
            <span style={{ fontWeight: "bold" }}>State: </span>
            {itemInfo.state}
            <br></br>
            <span style={{ fontWeight: "bold" }}>Description: </span>
            {itemInfo.description}
            <br></br>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={handleSaveClose}>
            Cancel
          </Button>
          <Button
            sx={{
              border: "1px solid black",
              backgroundColor: "#97c30a",
              color: "black",
            }}
            onClick={handleSave}
            autoFocus
          >
            Save
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
            {"Permanently Delete Item?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this item? There is no undo!
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
  );
}

export default NewEdit;
