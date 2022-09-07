import React from 'react';
import blurredRegisterBG from '../../files/SAMANStillRegistration.png'
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useMediaQuery, useTheme } from "@mui/material";




function RegisterPage() {
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const history = useHistory();

  return (
    <div className="loginRegisterPageContainer">
      <img src={blurredRegisterBG} className='blurredBG'/>
      <RegisterForm />
      {isMatch &&
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
        >
          Login
        </button>
      </center> }
    </div>
  );
}

export default RegisterPage;
