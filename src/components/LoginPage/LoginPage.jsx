import React, { useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import blurredBG from '../../files/SAMANStillBG.png'

function LoginPage() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
  }, []);

  return (
    <div className="loginRegisterPageContainer">
      <img src={blurredBG} className='blurredBG'/>
      <LoginForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
