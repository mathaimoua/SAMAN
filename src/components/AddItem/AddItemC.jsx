import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import moment from 'moment'

import {
  Box,
  Paper,
  FormControl,
  FormGroup,
  FormHelperText,
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

function AddItemC() {

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();
  const [newDate, setNewDate] = useState()
  const dispatch = useDispatch();
  const paramID = useParams();
  const [itemInfo, setItemInfo] = useState({
      name: '',
      holder: '',
      // container: '', //switch to ID
      model: '',
      serial: '',
      warranty: moment().format('YYYY-MM-DD'),
      state: 'IN USE',
  });
  const [saveOpen, setSaveOpen] = useState(false);

  const handleNameChange = (event) => {
    setItemInfo({...itemInfo, name: event.target.value})
  }

  const handleHolderChange = (event) => {
    setItemInfo({...itemInfo, holder: event.target.value})
  }

  // const handleContainerChange = (event) => {
  //   setItemInfo({...itemInfo, container: event.target.value})
  // }

  const handleModelChange = (event) => {
    setItemInfo({...itemInfo, model: event.target.value})
  }

  const handleSerialChange = (event) => {
    setItemInfo({...itemInfo, serial: event.target.value})
  }

  const handleDateChange = (event) => {
    setNewDate(event.target.value);
    setItemInfo({...itemInfo, warranty: event.target.value})
  }

  const handleStateChange = (event) => {
    setItemInfo({...itemInfo, state: event.target.value})
  }

  const handleClickSave = () => {
    // console.log('deleting item', itemID)
    setSaveOpen(true);
  };

  const handleSaveClose = () => {
    setSaveOpen(false);
  };

  const handleSave = () => {
    dispatch({type: 'ADD_NEW_ITEM_C', payload: {containerID: paramID.containerID, itemInfo: itemInfo} })
    setSaveOpen(false)
    history.push(`/${paramID.locID}/${paramID.containerID}/items`)
  }
  useEffect(() => {
    dispatch({ type: "FETCH_CURRENT_CONTAINER", payload: paramID.containerID });
    dispatch({
      type: "FETCH_CURRENT_LOCATION",
      payload: { id: paramID.containerID },
    });
  }, [dispatch]);

  return (
    <div className="addItemCContainer">
      { isMatch && <button className="btn" onClick={() => history.goBack()}>
        Back
      </button> }
      <h2 style={{textAlign: 'center', margin: '0px'}}>Add New Item</h2>
    <Box
      sx={{ padding: "20px" }}
      className="editItemDataContainer"
      component={Paper}
    >
      <FormGroup component="form">
        <TextField
          required
          style={{ margin: "auto", width: '40%' }}
          helperText="name"
          onChange={handleNameChange}
        />
        <TextField
            style={{ margin: "auto", width: '40%' }}
            helperText="holder"
            onChange={handleHolderChange}
          />

        <TextField
            style={{ margin: "auto", width: '40%' }}
            helperText="model"
            onChange={handleModelChange}
          />
        <TextField
            style={{ margin: "auto", width: '40%' }}
            helperText="serial"
            onChange={handleSerialChange}
          />
        <TextField
            readOnly
            style={{ margin: "auto", width: '40%' }}
            value={moment(newDate).format("MM Do YYYY")}
            helperText="warranty expiration"
          />
          <input
            type="date"
            className="hidden"
            onChange={handleDateChange}
            style={{ margin: "auto", width: '40%' }}
          />

        <Select
            id="stateSelect"
            defaultValue={'IN USE'}
            onChange={handleStateChange}
            style={{ margin: "auto", width: '40%', marginTop: '10px'  }}
          >
            <MenuItem value={"IN USE"}>IN USE</MenuItem>
            <MenuItem value={"IN STOCK"}>IN STOCK</MenuItem>
            <MenuItem value={"LOST"}>LOST</MenuItem>
            <MenuItem value={"NEEDS REPAIR"}>NEEDS REPAIR</MenuItem>
            <MenuItem value={"WAITING FOR DISPOSAL"}>
              WAITING FOR DISPOSAL
            </MenuItem>
          </Select>
          <FormHelperText style={{ paddingLeft: '30px', margin: "auto", width: '40%'}}>state</FormHelperText>
          <Button
              sx={{
                marginTop: '10px',
                border: "1px solid black",
                backgroundColor: "#97c30a",
                color: "black",
              }}
              onClick={handleClickSave}
              autoFocus
            >
              Save
            </Button>
      </FormGroup>

    </Box>

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
            {"Add item?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description" sx={{textAlign: 'center'}}>
              {itemInfo.name}<br></br>
              {itemInfo.holder}<br></br>
              {/* {itemInfo.container}<br></br> */}
              {itemInfo.model}<br></br>
              {itemInfo.serial}<br></br>
              {itemInfo.warranty}<br></br>
              {itemInfo.state}<br></br>
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

export default AddItemC;
