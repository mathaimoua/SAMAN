import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function SideDrawer() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const PAGES = ["Dashboard", "Locations", "Add New Item", "About"];
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    setOpenDrawer(!openDrawer);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <React.Fragment>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <h1>SAMAN</h1>
          {user.id ? (
            <>
              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText>Dashboard</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText>Locations</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText>Add New Item</ListItemText>
                </ListItemIcon>
              </ListItemButton>
              
              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText>About</ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <ListItemButton>
              <ListItemIcon>
                <ListItemText>About</ListItemText>
              </ListItemIcon>
            </ListItemButton>
          )}
        </List>
      </Drawer>
      <IconButton
        onClick={() => {
          setOpenDrawer(!openDrawer);
        }}
      >
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
    </React.Fragment>
  );
}

export default SideDrawer;
