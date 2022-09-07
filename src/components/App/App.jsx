import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useMediaQuery} from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useDispatch, useSelector } from "react-redux";
// Look into Multer
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import NavBar from "../NavBar/NavBar";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1FBED6",
      },
      secondary: {
        main: "#ffffff"
      },
    },
    tab: {
      // padding: '2px 34px',
      // width: '140px',
      // height: '72px',
      color: '#ffffff'
  },
  });
  // console.log(theme)
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
    // dispatch({ type: "FETCH_RECENT_ITEMS" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
    <Router>
      <div className="appDiv">
        {/* <Nav /> */}
        <NavBar />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          {/* <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute> */}

          <Route exact path="/user">
            {user.id ? <UserPage /> : <LandingPage />}
          </Route>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/user" />
            ) : (
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/user" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
    </ThemeProvider>
  );
}

export default App;
