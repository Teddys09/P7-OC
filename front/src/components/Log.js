import React, { useState } from 'react';
import SigninFrom from './SigninFrom';
import SingupForm from './SingupForm';

const Log = (props) => {
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);
  const handleModals = (e) => {
    if (e.target.id === 'register') {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === 'login') {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };
  return (
    <div className="connexion-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? 'active-btn' : null}
          >
            S'inscire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? 'active-btn' : null}
          >
            Se connecter
          </li>
        </ul>
        {signUpModal && <SingupForm />}
        {signInModal && <SigninFrom />}
      </div>
    </div>
  );
};

export default Log;
