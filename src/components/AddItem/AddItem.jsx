import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
  useTheme,
  TextField,
  FormHelperText,
  FormGroup,
  MenuItem,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function AddItem() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const paramID = useParams();
  const dispatch = useDispatch();
  const containersList = useSelector(
    (store) => store.containers.containersList
  );
  const [newContainer, setNewContainer] = useState();
  const history = useHistory();
  const [newDate, setNewDate] = useState();
  const [itemInfo, setItemInfo] = useState({
    name: "",
    holder: "",
    container: "", //switch to ID
    model: "",
    serial: "",
    warranty: moment().format("YYYY-MM-DD"),
    state: "IN USE",
  });

  const handleContainerChange = (event) => {
    console.log(event.target.value);
    setNewContainer(event.target.value);
    setItemInfo({ ...itemInfo, container: event.target.value });
  };

  useEffect(() => {
    dispatch({ type: "FETCH_CONTAINERS", payload: paramID.locID });
  }, [dispatch]);

  const [saveOpen, setSaveOpen] = useState(false);

  const handleNameChange = (event) => {
    setItemInfo({ ...itemInfo, name: event.target.value });
  };

  const handleHolderChange = (event) => {
    setItemInfo({ ...itemInfo, holder: event.target.value });
  };

  const handleModelChange = (event) => {
    setItemInfo({ ...itemInfo, model: event.target.value });
  };

  const handleSerialChange = (event) => {
    setItemInfo({ ...itemInfo, serial: event.target.value });
  };

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
    setItemInfo({ ...itemInfo, warranty: event.target.value });
  };

  const handleStateChange = (event) => {
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
    dispatch({
      type: "ADD_NEW_ITEM",
      payload: { containerID: itemInfo.container, itemInfo: itemInfo },
    });
    setSaveOpen(false);
    dispatch({ type: "FETCH_CONTAINER_ITEMS", payload: paramID.locID });
    history.push(`/${paramID.locID}/${itemInfo.container}/items`);
  };

  return (
    <div className="addItemContainer">
      <div>
        { isMatch && <button className="btn" onClick={() => history.goBack()}>
          Back
        </button> }
        <div className="addItemDataContainer">
          <h2 style={{ margin: "0px" }}>Add New Item</h2>
          <Box
            sx={{ padding: "20px" }}
            className="editItemDataContainer"
            component={Paper}
          >
            <FormGroup component="form">
              <TextField
                style={{ margin: "auto", width: "40%" }}
                defaultValue={""}
                helperText="name"
                onChange={handleNameChange}
              />
              <TextField
                style={{ margin: "auto", width: "40%" }}
                defaultValue={""}
                helperText="holder"
                onChange={handleHolderChange}
              />
              <Select
                id="stateSelect"
                onChange={handleContainerChange}
                style={{ margin: "auto", width: "40%" }}
              >
                {containersList &&
                  containersList.map((container) => {
                    return (
                      <MenuItem
                        key={container.container_id}
                        value={itemInfo.container}
                      >
                        {container.container_name}
                      </MenuItem>
                    );
                  })}
              </Select>
              <FormHelperText
                style={{ paddingLeft: "18px", margin: "auto", width: "40%" }}
              >
                container
              </FormHelperText>
              <TextField
                style={{ margin: "auto", width: "40%" }}
                defaultValue={""}
                helperText="model"
                onChange={handleModelChange}
              />
              <TextField
                style={{ margin: "auto", width: "40%" }}
                defaultValue={""}
                helperText="serial"
                onChange={handleSerialChange}
              />
              <TextField
                readOnly
                style={{ margin: "auto", width: "40%" }}
                value={moment(newDate).format("MMM Do YYYY")}
                helperText="warranty expiration"
              />
              <input
                type="date"
                className="hidden"
                style={{ margin: "auto", width: "40%" }}
                onChange={handleDateChange}
              />
              <Select
                id="stateSelect"
                defaultValue={"IN USE"}
                onChange={handleStateChange}
                style={{ margin: "auto", width: "40%", marginTop: "10px" }}
              >
                <MenuItem value={"IN USE"}>IN USE</MenuItem>
                <MenuItem value={"IN STOCK"}>IN STOCK</MenuItem>
                <MenuItem value={"LOST"}>LOST</MenuItem>
                <MenuItem value={"NEEDS REPAIR"}>NEEDS REPAIR</MenuItem>
                <MenuItem value={"WAITING FOR DISPOSAL"}>
                  WAITING FOR DISPOSAL
                </MenuItem>
              </Select>
              <FormHelperText
                style={{ paddingLeft: "30px", margin: "auto", width: "40%" }}
              >
                state
              </FormHelperText>
            </FormGroup>
          </Box>
          <button
            style={{ float: "right" }}
            className="btn"
            onClick={handleClickSave}
          >
            Save
          </button>

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
                {itemInfo.name}
                <br></br>
                {itemInfo.holder}
                <br></br>
                {itemInfo.container}
                <br></br>
                {itemInfo.model}
                <br></br>
                {itemInfo.serial}
                <br></br>
                {itemInfo.warranty}
                <br></br>
                {itemInfo.state}
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
        </div>
      </div>
    </div>
  );
}

export default AddItem;
