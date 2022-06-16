import React, { useState } from 'react';
import axios from 'axios';

const Createpost = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('userId');

  console.log(imageUrl.type);
  function handleChange(e) {
    setImageUrl(e.target.files[0]);
  }
  const formData = new FormData();
  formData.append('file', imageUrl);
  formData.append('fileName', imageUrl.name);
  const handlePost = (e) => {
    e.preventDefault();

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/create/post',

      headers: {
        Authorization: localStorage.getItem('token'),
      },
      mode: 'cors',
      'Content-Type': 'multipart/form-data',
      data: {
        userId: userId,
        name: name,
        description: description,
        _id: '',
        like: 0,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
      },
      formData,
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
