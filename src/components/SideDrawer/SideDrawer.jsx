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
  const mainLocation = useSelector((store) => store.locations.main);

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
        <img src={SAMANLogo} className="SAMANLogoSide" width="80%"/>
        <List>
          {user.id ? (
            <>
              <ListItemButton component={Link} to="/user" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Dashboard</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton component={Link} to="/locations" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Locations</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton component={Link} to={`/additem/${mainLocation.location_id}`} onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>Add New Item</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton component={Link} to="/about" onClick={() => setOpenDrawer(!openDrawer)}>
                <ListItemIcon>
                  <ListItemText><h3>About</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>

              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <ListItemText sx={{ color: 'red' }}><h3>Logout</h3></ListItemText>
                </ListItemIcon>
              </ListItemButton>
            </>
          ) : (
            <>
            <ListItemButton component={Link} to="/home" onClick={handleLogout}>
              <ListItemIcon>
                <ListItemText><h3>Home</h3></ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton component={Link} to="/login" onClick={handleLogout}>
              <ListItemIcon>
                <ListItemText><h3>Login</h3></ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton component={Link} to="/registration" onClick={handleLogout}>
              <ListItemIcon>
                <ListItemText><h3>Register</h3></ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <ListItemButton component={Link} to="/about" onClick={handleLogout}>
              <ListItemIcon>
                <ListItemText><h3>About</h3></ListItemText>
              </ListItemIcon>
            </ListItemButton>
            </>
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
