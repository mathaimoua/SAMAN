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
import TextField from "@mui/material/TextField";

import { Button } from "@mui/material";

function Items(){

  const dispatch = useDispatch();
  const containerID = useParams();
  const items = useSelector(store => store.items.containerItems)

  useEffect(() => {
    refresh(containerID.id)
  }, [dispatch]);

  const refresh = (refreshID) => {
    dispatch({type: 'FETCH_ITEMS', payload: refreshID})
  }

  return(
    <div>
    <h1>ITEMS</h1>
    {items && items.map(item => {
      return (
        <h1 key={item.item_id + item.item_name}>test</h1>
      )
    })}
    </div>
  )
}

export default Items;