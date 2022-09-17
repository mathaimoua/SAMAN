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

function EditItem() {

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
  const containersList = useSelector(store => store.containers.containersList)
  const [newContainer, setNewContainer] = useState()
  const [itemInfo, setItemInfo] = useState({
      name: String(currentItem.item_name),
      holder: currentItem.current_holder,
      container: itemID.containerID, //switch to ID
      model: currentItem.model,
      serial: currentItem.serial,
      warranty: moment(currentItem.warranty_expiration).format('YYYY-MM-DD'),
      state: currentItem.state,
      description: currentItem.description,
  });


  useEffect(() => {
    refresh();
  }, [dispatch]); // Stop when item in brackets changes

  const refresh = () => {
    dispatch({type: 'FETCH_CONTAINERS', payload: itemID.locID })
    dispatch({ type: "FETCH_CURRENT_ITEM", payload: itemID.itemID });
    setDate(currentItem.warranty_expiration);
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  };

  const handleNameChange = (event) => {
    setItemInfo({...itemInfo, name: localStorage.getItem("name")})
    console.log(itemInfo)
  }
  const handleHolderChange = (event) => {
    setItemInfo({...itemInfo, holder: event.target.value})
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
    history.push(`/${itemID.locID}/${itemID.containerID}/details/${itemID.itemID}`)
  }

  const handleDelete = () => {
    // console.log('DELETING!')
    dispatch({type: 'DELETE_ITEM', payload: {deleteID: itemID.itemID, container: itemID.containerID} })
    setDeleteOpen(false)
    history.push(`/${itemID.locID}/${itemID.containerID}/items`)
  }

  const handleClickDelete = () => {
    setDeleteOpen(true)
  }

  const handleDeleteClose = () => {
    setDeleteOpen(false)
  }

  const handleContainerChange = (event) => {
    console.log(event.target.value)
    setNewContainer(event.target.value)
    setItemInfo({...itemInfo, container: event.target.value})
  }


  return (
    <div className="editItemContainer" style={{ marginBottom: "50px" }}>
      { isMatch && <button style={{marginBottom: '20px'}} className="btn" onClick={() => history.goBack()}>
        Back
      </button> }
      <div className='editItemDataContainer' >
      <h2 style={{margin: '0px'}}>Editing {currentItem.item_name}</h2>
      <Box sx={{padding: '20px'}} className="editItemDataContainer" component={Paper}>
        <FormGroup component="form">
          <TextField
            style={{ margin: "auto", width: '40%' }}
            defaultValue={currentItem.item_name}
            helperText="name"
            onChange={handleNameChange}
          />
          <TextField
            style={{ margin: "auto", width: '40%' }}
            defaultValue={currentItem.current_holder}
            helperText="holder"
            onChange={handleHolderChange}
          />
          <Select
        id="stateSelect"
        defaultValue={itemID.containerID}
        onChange={handleContainerChange}
        style={{ margin: "auto", width: '40%' }}   
      >
        {containersList.map(container => {
          return (
            <MenuItem key={container.container_id}
              value={container.container_id}
            >
              {container.container_name}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText style={{ paddingLeft: '18px', margin: "auto", width: '40%' }}>container</FormHelperText>
          <TextField
            style={{ margin: "auto", width: '40%' }}
            defaultValue={currentItem.model}
            helperText="model"
            onChange={handleModelChange}
          />
          <TextField
            style={{ margin: "auto", width: '40%' }}
            defaultValue={currentItem.serial}
            helperText="serial"
            onChange={handleSerialChange}
          />
          <TextField
            readOnly
            style={{ margin: "auto", width: '40%' }}
            value={moment(date).format("MMM Do YYYY")}
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
            defaultValue={currentItem && currentItem.state}
            onChange={handleStateChange}
            style={{ margin: "auto", width: '40%', marginTop: '10px' }}
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
        </FormGroup>
      </Box>
      <button
        style={{ float: "left" }}
        className="btnRed"
        onClick={handleClickDelete}
      >
        Delete
      </button>
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
              {itemInfo.name}<br></br>
              {itemInfo.holder}<br></br>
              {itemInfo.container}<br></br>
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
    </div>
  );
}

export default EditItem;
