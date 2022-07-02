import React, { useState } from 'react';
import axios from 'axios';

const Createpost = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState();
  const [showImage, setShowImage] = useState();
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId');

  function handleChange(e) {
    setShowImage(URL.createObjectURL(e.target.files[0]));
    setImageUrl(e.target.files[0]);
  }
  // const formData = new FormData();
  // formData.append('file', imageUrl);
  // formData.append('fileName', imageUrl.name);
  const handlePost = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('userId', userId);
    data.append('name', name);
    data.append('description', description);
    data.append('file', imageUrl);
    data.append('_id', '');
    data.append('like', 0);
    data.append('likes', 0);
    data.append('dislikes', 0);
    data.append('userLiked', []);
    data.append('usersDisliked', []);

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/create/post',

      headers: {
        Authorization: localStorage.getItem('token'),
      },
      mode: 'cors',
      'Content-Type': 'multipart/form-data',
      data,
      // formData,
    })
      .then(() => {
        window.location = '/Accueil';

        //Redirige après connexion avec bon identifiant
        //  window.location = '/Accueil';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handlePost} id="post-form">
      <div className="head-auth">
        <div
          className="banner-head"
          style={{ backgroundImage: 'url(/img/logohead2.png)' }}
        ></div>
      </div>
      <label htmlFor="name">Titre</label>

      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <label htmlFor="file">Image</label>

      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => handleChange(e)}
      />
      <img className="create-post-img" src={showImage} alt="" />

      <label htmlFor="description">Description</label>

      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <input type="submit" className="form-error" value="Ajouter le Post" />

      <div className="form-malfunction"></div>
      <div className="cancel-form">
        <a href="/Accueil">Retour</a>
      </div>
    </form>
  );
};

export default Createpost;
