import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ModifyPost = () => {
  const [oldValue, setHoldValue] = useState([]);
  const userId = localStorage.getItem('userId');

  let params = new URLSearchParams(document.location.search);
  let id = params.get('id');

  useEffect(() => {
    axios({
      method: 'get',
      url: `http://localhost:5000/api/post/${id}`,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      mode: 'cors',
      'Content-Type': 'multipart/form-data',
    })
      .then((res) => {
        setHoldValue(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let testName = '';
  let imageUrl = undefined;
  let description = '';

  console.log(testName);

  function handleChange(e) {
    imageUrl = e.target.files[0];
  }
  // const formData = new FormData();
  // formData.append('file', imageUrl);
  // formData.append('fileName', imageUrl.name);
  const handlePost = async (e) => {
    e.preventDefault();
    if (testName === '') {
      testName = oldValue.name;
    }
    if (imageUrl === undefined) {
      imageUrl = oldValue.file;
    }
    if (description === '') {
      description = oldValue.description;
    }

    const data = new FormData();
    data.append('userId', userId);
    data.append('name', testName);
    data.append('description', description);
    data.append('file', imageUrl);
    data.append('_id', id);
    data.append('like', 0);
    data.append('likes', 0);
    data.append('dislikes', 0);
    data.append('userLiked', []);
    data.append('usersDisliked', []);
    // setImageUrl(e.target[1].files[0]);

    axios({
      method: 'put',
      url: 'http://localhost:5000/api/modify',

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
      <div className="head-auth">
        <div
          className="banner-head"
          style={{ backgroundImage: 'url(/img/logohead2.png)' }}
        ></div>
      </div>
      <label htmlFor="name">Titre</label>
      <br />
      <input
        type="text"
        name="name"
        id="name"
        onChange={(e) => (testName = e.target.value)}
        defaultValue={oldValue.name}
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
        onChange={(e) => (description = e.target.value)}
        defaultValue={oldValue.description}
      />
      <br />
      <input type="submit" className="form-error" value="Modifier le Post" />
      <br />
      <div className="form-malfunction"></div>
      <div className="cancel-form">
        <a href="/Accueil">Retour</a>
      </div>
    </form>
  );
};

export default ModifyPost;
