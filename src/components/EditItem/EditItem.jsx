import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";
import DatePicker from "../DatePicker/DatePicker";

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
  TextField,
  MenuItem,
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';

function EditItem() {
  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const itemID = useParams();
  const currentItem = useSelector((store) => store.items.currentItem);
  const history = useHistory();
  const dispatch = useDispatch();
  const [itemInfo, setItemInfo] = useState({name: '', holder: '', container: '', model: '', serial: '', warranty: '', state: ''})

  useEffect(() => {
    refresh();
  }, [dispatch]);

  const refresh = () => {
    dispatch({ type: "FETCH_CURRENT_ITEM", payload: itemID.id });
    setItemInfo({name: '', holder: '', container: '', model: '', serial: '', warranty: '', state: ''})
  };

  return (
    <div className="editItemContainer" style={{marginBottom: '50px'}}>
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>

      <Box className="editItemDataContainer" component={Paper}>
        <h1>Editing {currentItem.item_name}</h1>
        <FormControl component="form">
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.item_name}
            helperText="name"
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.current_holder}
            helperText="holder"
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.container_name}
            helperText="container"
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.model}
            helperText="model"
          />
          <TextField
            style={{ float: "center", margin: "5px" }}
            defaultValue={currentItem.serial}
            helperText="serial"
          />
          <DatePicker />
          {/* <TextField
            style={{ float: "center", margin: "10px" }}
            value={moment(currentItem.warranty_expiration).format(
              "MMM Do YYYY"
            )}
            helperText="warranty expiration"
          /> */}
          {/* <Select
          id="stateSelect"
          helperText="state"
          onChange={handleStateChange}
        >
          <MenuItem value={'IN USE'}>IN USE</MenuItem>
          <MenuItem value={'IN STOCK'}>IN STOCK</MenuItem>
          <MenuItem value={'LOST'}>LOST</MenuItem>
          <MenuItem value={'NEEDS REPAIR'}>NEEDS REPAIR</MenuItem>
          <MenuItem value={'WAITING FOR DISPOSAL'}>WAITING FOR DISPOSAL</MenuItem>
        </Select> */}
        </FormControl>
        
      </Box>
      <button style={{float: 'right'}} className="btn" onClick={() => history.goBack()}>
        Save
      </button>
    </div>
  );
}

export default EditItem;
