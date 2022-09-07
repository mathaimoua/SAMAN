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
import SideDrawer from "../SideDrawer/SideDrawer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import navLogo from '../../files/SAMANLogo.png'

// Imports for TextFields
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function NavBar() {

  const handlePasswordChange = (event) => {
    setValues({ ...values, password: event.target.value });
  };
  const handleUsernameChange = (event) => {
    setValues({ ...values, username: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [values, setValues] = useState({
    username: "",
    password: "",
    showPassword: false,
  });

  const handleLogin = (event) => {
    event.preventDefault();
    if (values.username && values.password) {
      dispatch({
        type: "LOGIN",
        payload: {
          username: values.username,
          password: values.password,
        },
      });
      setValues({ ...values, username: '', password: ''})
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  };

  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  const PAGES = ["Dashboard", "Locations", "Add New Item", "About"];
  const [currentTab, setCurrentTab] = useState(0);

  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md")); // Check for mobile device
  // console.log(isMatch);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <React.Fragment>
      <AppBar
        sx={{ background: "#555555", paddingTop: "5px", paddingBottom: "5px"}}
        className="appBar"
      >
        <Toolbar>
          {isMatch ? (
            <>
              <SideDrawer />
              <img src={navLogo} className="SAMANLogoNAV"/>
            </>
          ) : (
            <>
              {/* <h3>SAMAN</h3> */}
              <img src={navLogo} className="SAMANLogoNAV"/>

              {user.id ? (
                <></>
              ) : (
                <Tabs
                  textColor="secondary"
                  onChange={(currentTab) => setCurrentTab(currentTab)}
                  indicatorColor="primary"
                  sx={{ marginRight: "auto" }}
                >
                  <Tab label="About" style={theme.tab}></Tab>
                </Tabs>
              )}
              {user.id && (
                <Tabs
                  textColor="secondary"
                  value={currentTab}
                  onChange={(e, currentTab) => setCurrentTab(currentTab)}
                  indicatorColor="primary"
                  sx={{ marginLeft: "auto" }}
                >
                  {PAGES.map((page, index) => (
                    <Tab key={index} label={page} style={theme.tab} />
                  ))}
                </Tabs>
              )}
              {user.id && (
                <Button sx={{ marginLeft: "auto", color: "white" }} onClick={handleLogout} >
                  Logout
                </Button>
              )}
              {user.id ? (
                <></>
              ) : (
                <form onSubmit={handleLogin}>
                <Box
                  className="inputsBox"
                  sx={{ marginLeft: "auto", display: "flex" }}
                >
                  <div>
                    {errors.loginMessage && (
                      <h3 className="alert" role="alert">
                        {errors.loginMessage}
                      </h3>
                    )}
                  </div>
                  <TextField
                    sx={{
                      m: "auto",
                      marginLeft: "10px",
                      marginRight: "5px",
                      width: "25ch",
                    }}
                    label="username"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    className="usernameTextField"
                    value={values.username}
                    onChange={handleUsernameChange}
                  />
                  <TextField
                    sx={{
                      m: "auto",
                      marginLeft: "5px",
                      marginRight: "5px",
                      width: "25ch",
                    }}
                    label="password"
                    id="filled-size-small"
                    variant="filled"
                    size="small"
                    className="usernameTextField"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handlePasswordChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Button
                    sx={{
                      marginTop: ".5em",
                      marginLeft: "auto",
                      color: "white",
                    }}
                    onClick={handleLogin}
                    type='submit'
                  >
                    Login
                  </Button>
                </Box>
                </form>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default NavBar;
