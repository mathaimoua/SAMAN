import React, { useEffect } from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Footer/Footer";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import NavBar from "../NavBar/NavBar";
import Locations from "../Locations/Locations";
import Containers from "../Containers/Containers";
import Items from "../Items/Items";
import ItemDetails from "../ItemDetails/ItemDetails";
import EditItem from "../EditItem/EditItem";
import ViewItems from "../ViewItems/ViewItems";
import AddItem from "../AddItem/AddItem";
import Search from "../Search/Search";
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
        main: "#ffffff",
      },
    },
    tab: {
      color: "#ffffff",
    },
  });
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    dispatch({ type: "FETCH_USER" });
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="appDiv">
          <NavBar />
          <Switch>
            <Redirect exact from="/" to="/home" />

            <Route
              exact
              path="/about"
            >
              <AboutPage />
            </Route>

            <Route exact path="/user">
              {user.id ? <UserPage /> : <LandingPage />}
            </Route>

            <ProtectedRoute exact path="/locations">
              {user.id ? <Locations /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/:locID/containers/">
              {user.id ? <Containers /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute path="/:locID/:containerID/details/:id">
              {user.id ? <ItemDetails /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/:locID/:containerID/items/">
              {user.id ? <Items /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute path="/:locID/:containerID/edititem/:itemID">
              {user.id ? <EditItem /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/:locID/:containerID/additem/">
              {user.id ? <AddItem /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/viewitems/">
              {user.id ? <ViewItems /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute exact path="/search/:string">
              {user.id ? <Search /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <ProtectedRoute path="/additem/:locID">
              {user.id ? <AddItem /> : <Redirect to="/user" />}
            </ProtectedRoute>

            <Route exact path="/login">
              <LoginPage />
            </Route>

            <Route exact path="/registration">
              {user.id ? (
                <Redirect to="/user" />
              ) : (
                <RegisterPage />
              )}
            </Route>

            <Route exact path="/home">
              {user.id ? <Redirect to="/user" /> : <LandingPage />}
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
