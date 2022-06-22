import React from 'react';
import Createpost from '../components/Createpost';
import Navigation from '../components/Navigation';
import Post from '../components/Post';

const Accueil = () => {
  const handleDisconnect = () => {
    localStorage.clear();
    window.location = '/Auth';
  };
  return (
    <div>
      <div className="head-auth">
        <div
          className="banner-head"
          style={{ backgroundImage: 'url(/img/logohead2.png)' }}
        ></div>
        <button onMouseUp={() => handleDisconnect()}>Déconnexion</button>

        <Navigation />
      </div>
      <a href="/Createpost"> Ajouter un Post</a>
      <div className="post-user">
        <Post />
      </div>
    </div>
  );
};

export default Accueil;
