import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from 'react-router-dom'
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SAMANLogo from "../../files/SAMANLogo.png";

function SideDrawer(){

  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((store) => store.user);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    setOpenDrawer(!openDrawer);
    dispatch({ type: "LOGOUT" });
  };

  return (
    <React.Fragment>
      <Drawer
        PaperProps={{
          sx: { width: "45%", textAlign: "center", alignItems: "center" },
        }}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <img src={SAMANLogo} className="SAMANLogoNav" width="70%" />
        <List>
          {user.id ? (
            <>
              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Dashboard</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton component={Link} to="/locations" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Locations</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Add New Item</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>About</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ListItemText><h3>Logout</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <ListItemButton>
              <ListItemIcon>
                <ListItemText><h3>About</h3></ListItemText>
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
