import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

import {
  Box,
  Paper,
  FormControl,
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

function EditItem() {

  const [saveOpen, setSaveOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState(-1);
  const itemID = useParams();
  const currentItem = useSelector((store) => store.items.currentItem);
  const history = useHistory();
  const [date, setDate] = useState();
  const dispatch = useDispatch();
  const [itemInfo, setItemInfo] = useState({
    name: currentItem.item_name,
      holder: currentItem.current_holder,
      container: currentItem.container_name, //switch to ID
      model: currentItem.model,
      serial: currentItem.serial,
      warranty: moment(currentItem.warranty_expiration).format('YYYY-MM-DD'),
      state: currentItem.state,
  });

  useEffect(() => {
    refresh();
  }, [dispatch]);

  const refresh = () => {
    dispatch({ type: "FETCH_CURRENT_ITEM", payload: itemID.id });
    setDate(currentItem.warranty_expiration);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    // console.log('iteminfo is', itemInfo)
  };

  const handleNameChange = (event) => {
    setItemInfo({...itemInfo, name: event.target.value})
    console.log(itemInfo)
  }
  const handleHolderChange = (event) => {
    setItemInfo({...itemInfo, holder: event.target.value})
    // console.log(itemInfo)
  }
  const handleContainerChange = (event) => {
    setItemInfo({...itemInfo, container: event.target.value})
    // console.log(itemInfo)
  }
  const handleModelChange = (event) => {
    setItemInfo({...itemInfo, model: event.target.value})
    // console.log(itemInfo)
  }

  const handleSerialChange = (event) => {
    setItemInfo({...itemInfo, serial: event.target.value})
    // console.log(itemInfo)
  }

  const handleDateChange = (event) => {
    setDate(event.target.value);
    setItemInfo({...itemInfo, warranty: event.target.value})
    // console.log(moment(event.target.value).format("MMM Do YYYY"));
  };

  const handleStateChange = (event) => {
    // console.log(event.target.value);
    // setState(event.target.value);
    setItemInfo({...itemInfo, state: event.target.value})
  };

  const handleClickSave = () => {
    // console.log('deleting item', itemID)
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  const handleSave = () => {
    dispatch({type: 'EDIT_ITEM', payload: {id: currentItem.item_id, info: itemInfo} })
    setSaveOpen(false)
    history.push(`/details/${itemID.id}`)
  }

  return (
    <div className="editItemContainer" style={{ marginBottom: "50px" }}>
      <button style={{marginBottom: '20px'}} className="btn" onClick={() => history.goBack()}>
        Back
      </button>

      <Box  sx={{padding: '20px'}}className="editItemDataContainer" component={Paper}>
        <h1>Editing {currentItem.item_name}</h1>
        <FormControl component="form">
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.item_name}
            helperText="name"
            onChange={handleNameChange}
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.current_holder}
            helperText="holder"
            onChange={handleHolderChange}
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.container_name}
            helperText="container"
            onChange={handleContainerChange}
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.model}
            helperText="model"
            onChange={handleModelChange}
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.serial}
            helperText="serial"
            onChange={handleSerialChange}
          />
          <TextField
            readOnly
            style={{ float: "center", margin: "10px" }}
            value={moment(date).format("MMM Do YYYY")}
            helperText="warranty expiration"
          />
          <input
            type="date"
            defaultValue={moment(currentItem.warranty_expiration).format(
              "YYYY-MM-DD"
            )}
            className="hidden"
            onChange={handleDateChange}
          />
          <Select
            id="stateSelect"
            helperText="state"
            defaultValue={currentItem.state}
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
        </FormControl>
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
          <DialogTitle id="alert-dialog-title">
            {"Update item information with the following?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center'}}>
              {itemInfo.name}<p></p>
              {itemInfo.holder}<p></p>
              {itemInfo.container}<p></p>
              {itemInfo.model}<p></p>
              {itemInfo.serial}<p></p>
              {itemInfo.warranty}<p></p>
              {itemInfo.state}
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

export default EditItem;
