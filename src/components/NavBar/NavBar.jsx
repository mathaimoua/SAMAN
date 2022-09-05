import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SideDrawer from "../SideDrawer/SideDrawer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const PAGES = ["Dashboard", "Locations", "Add New Item", "About"];
  const [currentTab, setCurrentTab] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile device
  // console.log(isMatch);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "black" }}>
        <Toolbar>
          {isMatch ? (
            <>
              <SideDrawer />
              SAMAN
            </>
          ) : (
            <>
              <h3>SAMAN</h3>
              {user.id && (
                <Tabs
                  textColor="inherit"
                  value={currentTab}
                  onChange={(e, currentTab) => setCurrentTab(currentTab)}
                  indicatorColor="primary"
                  sx={{ marginLeft: "auto" }}
                >
                  {PAGES.map((page, index) => (
                    <Tab key={index} label={page} />
                  ))}
                </Tabs>
              )}
              {user.id && (
                <Button sx={{ marginLeft: "auto", color: "white" }}>
                  <PowerSettingsNewIcon onClick={handleLogout} />
                </Button>
              )}
              {user.id ? (<></>) : (<div><input type='text' className="inputForm"></input></div>)}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
