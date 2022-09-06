import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import SAMANLogo from "../../files/SAMANLogo.png";
import videoBG from '../../files/SAMANBG.MP4'
import { useMediaQuery, useTheme } from '@mui/material'

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md")); 
  console.log(isMatch)
  // const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <div className="landingPageContainer">
      <video autoPlay loop muted id="videoBG">
        <source src={videoBG} type="video/mp4" />
      </video>
      {/* <h2>{heading}</h2> */}
      <div className="grid">
        <div className="grid-col grid-col_8">
          <img src={SAMANLogo} id="fullLogo" />
          <p>
            Simple Asset Management is exactly what it sounds like, managing
            your physical assets in a simple and easy way!
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

      {isMatch ? <center className="alreadyMember">
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center> : <></>}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
