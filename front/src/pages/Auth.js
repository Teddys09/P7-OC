import React from 'react';
import Log from '../components/Log';
import Navigation from '../components/Navigation';

const Auth = () => {
  return (
    <div>
      <div className="head-auth">
        <div
          className="banner-head"
          style={{ backgroundImage: 'url(/img/logohead2.png)' }}
        ></div>

        <Navigation />
      </div>
      <div className="form-connect">
        <Log signin={false} signup={true} />
      </div>
    </div>
  );
};

export default Auth;
