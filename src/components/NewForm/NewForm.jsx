import { useEffect } from 'react'
import { useParams, useHistory  } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'

import {
  Box,
  Paper,
  FormControl,
  InputLabel,
  OutlinedInput,
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

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="newFormContainer">
      <h2>Add New Item</h2>
    </div>
  );
}

export default NewForm;
