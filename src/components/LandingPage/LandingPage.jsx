import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";
import SAMANLogo from "../../files/SAMANLogo.png";
import videoBG from "../../files/SAMANBG.MP4";
import { useMediaQuery, useTheme } from "@mui/material";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

function LandingPage() {

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  // const [heading, setHeading] = useState("Welcome");
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="landingPageContainer">
      <video autoPlay loop muted id="videoBG">
        <source src={videoBG} type="video/mp4" />
      </video>
      {/* <h2>{heading}</h2> */}
      <div className="grid">
        <div className="grid-col grid-col_8">
          <img src={SAMANLogo} id="fullLogo" />
          <p id="landingPageText">
            Simple Asset Management (SAMAN) is exactly what the name suggests,
            easy organizing of your belongings. SAMAN makes it easy for any
            organization or individual to get organized and help reduce
            unnecessary losses. Unlike other asset management software, SAMAN
            does NOT cost an arm and a leg, in fact,{" "}
            <span id="itsfree">it's free!</span>
          </p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          {isMatch ? (
            <center className="alreadyMember">
              <h4>Already a Member?</h4>
              <button className="btn btn_sizeSm" onClick={onLogin}>
                Login
              </button>
            </center>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
