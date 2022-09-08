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
import { Link } from 'react-router-dom'

// Imports for TextFields
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

function NavBar() {
  
  const errors = useSelector((store) => store.errors);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const theme = useTheme();
  // console.log(theme);
  // For use with Tab and Tabs
  const PAGES = ["Dashboard", "Locations", "Add New Item", "About"];
  const pageLinks = ["/user", "/locations", "/additem", "/about"]
  const [currentTab, setCurrentTab] = useState(0);

  // Check for mobile device
  const isMatch = useMediaQuery(theme.breakpoints.down("md")); 
  // console.log(isMatch);

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
              <Link to="/home">
              <img src={navLogo} className="SAMANLogoNAV"/>
              </Link>
            </>
          ) : (
            <>
              <Link to="/home" onClick={() => setCurrentTab(0)}>
              <img src={navLogo} className="SAMANLogoNAV"/>
              </Link>

              {user.id ? (
                <></>
              ) : (
                <Tabs
                  textColor="secondary"
                  onChange={(currentTab) => setCurrentTab(currentTab)}
                  indicatorColor="primary"
                  sx={{ marginRight: "auto" }}
                >
                  <Tab 
                    component={Link}
                    to="/about" 
                    label="About" 
                    style={theme.tab}></Tab>
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
                    <Tab component={Link}
                    to={pageLinks[index]} key={index} label={page} style={theme.tab} />
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
