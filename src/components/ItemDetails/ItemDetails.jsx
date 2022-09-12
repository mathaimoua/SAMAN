import { useHistory, useParams } from "react-router-dom";
import {
  Paper,
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import moment from "moment";

function ItemDetails() {
  const currentItem = useSelector((store) => store.items.currentItem);
  const dispatch = useDispatch();
  const itemID = useParams();
  const history = useHistory();
  // const [fieldLocked, setFieldLocked] = useState(true);
  // const [itemName, setItemName] = useState("");
  const handleEditItem = (idtoedit) => {
    history.push(`/edititem/${idtoedit}`);
  };

  useEffect(() => {
    refresh();
  }, [dispatch]);

  const refresh = () => {
    dispatch({ type: "FETCH_CURRENT_ITEM", payload: itemID.id });
  };

  return (
    <div className="itemDetailsContainer">
      <button className="btn" onClick={() => history.goBack()}>
        Back
      </button>
      <button className="editItembtn" onClick={() => handleEditItem(itemID.id)}>
        Edit Item
      </button>
      <div className="itemDetailsDataContainer">
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "100%",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
            boxShadow: 2,
          }}
          component={Paper}
        >
          <span style={{ display: "inline" }}>Name: </span>
          <h2 style={{ display: "inline" }}>{currentItem.item_name}</h2>
          <br></br>
          <span style={{ display: "inline" }}>Holder: </span>
          <h2 style={{ display: "inline" }}>{currentItem.current_holder}</h2>
          <br style={{ margin: "10px" }}></br>
          <span style={{ display: "inline" }}>Container: </span>
          <h2 style={{ display: "inline" }}>{currentItem.container_name}</h2>
          <br></br>
          <span style={{ display: "inline" }}>Model: </span>
          <h2 style={{ display: "inline" }}>{currentItem.model}</h2>
          <br></br>
          <span style={{ display: "inline" }}>Serial: </span>
          <h2 style={{ margin: "10px", display: "inline" }}>
            {currentItem.serial}
          </h2>
          <br></br>
          <span style={{ display: "inline" }}>Warranty Expiration: </span>
          <h2 style={{ display: "inline" }}>
            {moment(currentItem.warranty_expiration).format("MMM Do YYYY")}
          </h2>
        </Box>
      </div>
    </div>
  );
}

export default ItemDetails;
