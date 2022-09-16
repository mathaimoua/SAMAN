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
    container: "", //switch to ID
    model: "",
    serial: "",
    warranty: moment().format("YYYY-MM-DD"),
    state: "IN USE",
  });

  const handleContainerChange = (event) => {
    console.log(event.target.value);
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
    // dispatch({ type: "FETCH_CONTAINERS", payload: paramID.locID });
  }, []);

  return (
    <div id="formApp">
      {isMatch && (
        <button
          style={{ marginLeft: "20px" }}
          className="btn"
          onClick={() => history.goBack()}
        >
          Back
        </button>
      )}
      <div class="newFormContainer" style={{ margin: "auto" }}>
        <div class="title">
          <h1 style={{ margin: "0px" }}>Add New Item</h1>
        </div>
        <FormGroup class="form-wrapper">
          <div class="inputs">
            <div class="input-component">
              <label for="name">Name</label>
              <TextField
                defaultValue={""}
                onChange={handleNameChange}
              />
              {/* <input class="input" type="text" name="name" id="surname" /> */}
            </div>
            <div class="input-component">
              <label for="name">Current Holder</label>
              <TextField
                defaultValue={""}
                onChange={handleHolderChange}
              />
              {/* <input class="input" type="text" name="name" id="name" /> */}
            </div>
            <div class="input-component input__big">
              <label for="bio">Description</label>
              <textarea class="input" name="bio" id="bio"></textarea>
            </div>
            <div class="input-component">
              <label for="warranty">Warranty Expiration</label>
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
            <div class="input-component">
              <label for="phone">Container</label>
              <Select id="stateSelect" onChange={handleContainerChange}>
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
            </div>
            <div class="input-component">
            <label for="phone">State</label>
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
            <div class="input-component">
              <label for="city">Model</label>
              <TextField
                defaultValue={""}
                onChange={handleModelChange}
              />
              {/* <input class="input" type="text" name="city" id="city" /> */}
            </div>
            <div class="input-component">
              <label for="zip">Serial</label>
              <TextField
                defaultValue={""}
                onChange={handleSerialChange}
              />
              {/* <input class="input" type="" name="zip" id="zip" /> */}
            </div>
          </div>
          <div class="actions">
            <button class="btn" type="submit">
              Submit New Item
            </button>
          </div>
        </FormGroup>
      </div>
    </div>
  );
}

export default NewForm;
