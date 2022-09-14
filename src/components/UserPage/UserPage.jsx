import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

// MUI Table Imports
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function UserPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  const items = useSelector((store) => store.items.recentItems);
  const mainLocation = useSelector((store) => store.locations.main);
  const [addOpen, setAddOpen] = useState(false);
  const [newContainerName, setNewContainerName] = useState("");
  const [searchString, setSearchString] = useState();

  const handleLocationClick = () => {
    // dispatch({ type: "FETCH_CONTAINERS", payload: mainLocation.location_id })
    // dispatch({ type: 'FETCH_CURRENT_LOCATION', payload:  { id: mainLocation.location_id } })
    history.push(`/${mainLocation.location_id}/containers/`);
  };

  const handleItemClick = (locID, containerID, itemID) => {
    // dispatch({type: "FETCH_CURRENT_ITEM", payload: itemID })
    history.push(`/${locID}/${containerID}/details/${itemID}`);
  };

  const handleViewItems = () => {
    history.push("/viewitems/");
  };

  const handleClickAddItem = () => {
    history.push(`/additem/${mainLocation.location_id}`);
  };

  const handleAddContainer = () => {
    // console.log(id)
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const changeNewContainerName = (event) => {
    setNewContainerName(event.target.value);
  };

  const handleCreateContainer = () => {
    // console.log('creating container named', newContainerName)
    dispatch({
      type: "CREATE_CONTAINER",
      payload: { name: newContainerName, location: mainLocation.location_id },
    });
    setNewContainerName("");
    setAddOpen(false);
    history.push(`/${mainLocation.location_id}/containers`);
  };

  const handleSearch = () => {
    if (searchString === "" || searchString === "/" || (!searchString.replace(/\s/g, '').length)) {
      setSearchString('')
      return -1;
    } else {
      // console.log(`searching for ${searchString}!`)
      history.push(`/search/${searchString}`);
      setSearchString('')
    }
  };

  const handleSearchChange = (event) => {
    setSearchString(event.target.value);
  };

  useEffect(() => {
    dispatch({ type: "FETCH_MAIN_LOCATION" });
    dispatch({ type: "FETCH_RECENT_ITEMS" });
  }, [dispatch]);

  return (
    <div className="dashBoardContainer">
      <div>
        <h2>
          Welcome,{" "}
          {String(user.username).charAt(0).toUpperCase() +
            String(user.username).slice(1)}
          !
        </h2>
        <h2>
          Currently managing:{" "}
          {mainLocation ? (
            <button
              className="btn_asLinkMainLocation"
              onClick={handleLocationClick}
            >
              <h2>{mainLocation.location_name}</h2>
            </button>
          ) : (
            <p className="noLocationText">
              No location set, please create a location!
            </p>
          )}
        </h2>

        <FormControl
          component="form"
          sx={{ width: "100%", display: "inline-block", margin: "0px" }}
          onSubmit={handleSearch}
        >
          <TextField
            id="filled-search"
            label="Search for an item"
            type="search"
            variant="filled"
            onChange={handleSearchChange}
            sx={{ backgroundColor: "#FFFFFF", height: "auto", width: "50%" }}
          />
          {/* <Box sx={{textAlign: 'center'}}> */}
          <Button
            className="searchButton"
            type="submit"
            sx={{
              color: "#97c30a",
              margin: "5px",
              backgroundColor: "#555555",
              width: "10%",
              height: "auto",
              boxShadow: "5px 5px 2px 2px rgba(91, 91, 91, 0.2)",
              display: "inline-block",
            }}
          >
            Go
          </Button>
          {/* </Box> */}
        </FormControl>

        <p></p>
        <button className="btn" onClick={handleViewItems}>
          View Items
        </button>
        <button className="btn" onClick={handleClickAddItem}>
          Add New Item
        </button>
        <button className="btn" onClick={handleAddContainer}>
          Add New Container
        </button>
      </div>
      <h3 className="recentlyAddedItemsHeader">Recently Added Items</h3>
      <TableContainer
        sx={{ maxWidth: "100%", marginTop: "0px", boxShadow: 2 }}
        component={Paper}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#fa8072" }}>
              <TableCell
                onClick={() => {
                  handleSort("item_name");
                }}
                sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
              >
                Item Name
              </TableCell>
              <TableCell
                sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
              >
                Container
              </TableCell>
              <TableCell
                sx={{ minWidth: 100, fontWeight: "bold", fontSize: "12pt" }}
              >
                Date Added
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow
                hover
                key={item.item_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <button
                    className="btn_asLinkTables"
                    onClick={() =>
                      handleItemClick(
                        item.location_id,
                        item.container_id,
                        item.item_id
                      )
                    }
                  >
                    {item.item_name}
                  </button>
                </TableCell>
                <TableCell>{item.container_name}</TableCell>
                <TableCell>
                  <Moment format="MMM Do YYYY">{item.date_added}</Moment>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#C0BCB6",
            boxShadow: "none",
          },
        }}
        open={addOpen}
        onClose={handleAddClose}
      >
        <DialogTitle>Add New Container</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a name for the container.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={newContainerName}
            onChange={changeNewContainerName}
            label="Container Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "black" }} onClick={handleAddClose}>
            Cancel
          </Button>
          <Button
            sx={{
              border: "1px solid black",
              backgroundColor: "#97c30a",
              color: "black",
            }}
            onClick={handleCreateContainer}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserPage;
