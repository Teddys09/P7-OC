import React, { useState } from 'react';
import axios from 'axios';

const SigninFrom = () => {
  let { token, userId } = [];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();

    const passwordError = document.querySelector('.password.error');

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/auth/login',
      withCredentials: false,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        token = res.data.token;
        userId = res.data.userId;
        localStorage.setItem('token', 'Bearer ' + token);
        localStorage.setItem('userId', userId);

        //Redirige après connexion avec bon identifiant
        window.location = '/Accueil';
      })

      .catch((err) => {
        console.log(err);

        passwordError.innerHTML = err.response.data.message;
      });
  };
  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        // Récupère la valeur de l'input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" className="form-error" value="Se connecter" />
    </form>
  );
};

export default SigninFrom;
