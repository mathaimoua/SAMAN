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

function NewForm() {
  const [saveOpen, setSaveOpen] = useState(false);
  const paramID = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const containersList = useSelector(
    (store) => store.containers.containersList
  );
  const [newDate, setNewDate] = useState();
  const [itemInfo, setItemInfo] = useState({
    name: "",
    holder: "",
    description: "",
    container: "",
    model: "",
    serial: "",
    warranty: moment().format("YYYY-MM-DD"),
    state: "IN USE",
  });

  const handleContainerChange = (event) => {
    setItemInfo({ ...itemInfo, container: event.target.value });
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

  const handleNameChange = (event) => {
    setItemInfo({ ...itemInfo, name: event.target.value });
  };

  const handleHolderChange = (event) => {
    setItemInfo({ ...itemInfo, holder: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setItemInfo({ ...itemInfo, description: event.target.value });
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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    dispatch({ type: "FETCH_CONTAINERS", payload: paramID.locID });
  }, []);

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
          <h1 style={{ margin: "0px" }}>Add New Item</h1>
        </div>
        <FormGroup className="form-wrapper">
          <div className="inputs">
            <div className="input-component">
              <label htmlFor="name">Name</label>
              <TextField
                required
                autoFocus={true}
                defaultValue={""}
                onChange={handleNameChange}
              />
              {/* <input class="input" type="text" name="name" id="surname" /> */}
            </div>
            <div className="input-component">
              <label htmlFor="name">Current Holder</label>
              <TextField defaultValue={""} onChange={handleHolderChange} />
              {/* <input class="input" type="text" name="name" id="name" /> */}
            </div>
            <div className="input-component input__big">
              <label for="bio">Description</label>
              <textarea className="input" name="bio" id="bio" onChange={handleDescriptionChange}></textarea>
            </div>
            <div className="input-component">
              <label htmlFor="warranty">Warranty Expiration</label>
              <TextField
                readOnly
                value={moment(newDate).format("MMM Do YYYY")}
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
              <Select id="stateSelect" onChange={handleContainerChange}>
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
                defaultValue={"IN USE"}
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
              <TextField defaultValue={""} onChange={handleModelChange} />
              {/* <input class="input" type="text" name="city" id="city" /> */}
            </div>
            <div className="input-component">
              <span>
                <label>Serial Number</label>
                <button className="btn" style={{ marginLeft: "10px" }}>
                  SCAN
                </button>
              </span>
              <TextField defaultValue={""} onChange={handleSerialChange} />
              {/* <input class="input" type="" name="zip" id="zip" /> */}
            </div>
          </div>
          <div className="actions">
            <button
              className="btn"
              type="submit"
              style={{ marginTop: "30px" }}
              onClick={handleClickSave}
            >
              Submit New Item
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
            <span style={{fontWeight: 'bold'}}>Name: </span>{itemInfo.name}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Current Holder: </span>{itemInfo.holder}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Container: </span>{itemInfo.container}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Model: </span>{itemInfo.model}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Serial: </span>{itemInfo.serial}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Warranty Expiration Date: </span>{itemInfo.warranty}
            <br></br>
            <span style={{fontWeight: 'bold'}}>State: </span>{itemInfo.state}
            <br></br>
            <span style={{fontWeight: 'bold'}}>Description: </span>{itemInfo.description}
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
  );
}

export default NewForm;
