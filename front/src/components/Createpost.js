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
    // setImageUrl(e.target[1].files[0]);
    console.log(imageUrl);
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
        console.log('Réussi!!');

        //Redirige après connexion avec bon identifiant
        //  window.location = '/Accueil';
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handlePost} id="post-form">
      <label htmlFor="name">Titre</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <br />
      <label htmlFor="file">Image</label>
      <br />
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => handleChange(e)}
      />
      <img className="create-post-img" src={showImage} alt="" />
      <br />
      <label htmlFor="description">Description</label>
      <br />
      <input
        type="text"
        name="description"
        id="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <br />
      <input type="submit" className="form-error" value="Ajouter le Post" />
      <br />
      <div className="form-malfunction"></div>
      <div className="cancel-form">
        <a href="/Accueil">Retour</a>
      </div>
    </form>
  );
};

export default Createpost;
