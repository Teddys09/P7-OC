import React, { useState } from 'react';
import axios from 'axios';

const SingupForm = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [controlPassword, setControlPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordConfirmError = document.querySelector(
      '.password-confirm.error'
    );
    const formError = document.querySelector('.form-error');
    passwordConfirmError.innerHTML = '';
    if (password !== controlPassword) {
      passwordConfirmError.innerHTML =
        'Les mots de passes ne correspondent pas';
    } else {
      await axios({
        method: 'post',
        url: 'http://localhost:5000/api/auth/signup',
        data: {
          pseudo,
          email,
          password,
        },
      })
        .then((res) => {
          window.location = '/Auth';
        })
        .catch((err) => {
          console.log(err);

          formError.innerHTML = err.response.data.message;
        });
    }
  };
  return (
    <form action="" onSubmit={handleRegister} id="sign-up-form">
      <label htmlFor="pseudo">Pseudo</label>
      <br />
      <input
        type="pseudo"
        id="pseudo"
        onChange={(e) => setPseudo(e.target.value)}
        value={pseudo}
      />
      <br />
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <br />
      <label htmlFor="password">Mot de Passe</label>
      <br />
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      <label htmlFor="password-conf">Confirmer Mot de passe</label>
      <br />
      <input
        type="password"
        id="password-conf"
        onChange={(e) => setControlPassword(e.target.value)}
        value={controlPassword}
      />
      <div className="password-confirm error"></div>
      <br />
      <input type="submit" className="form-error" value="Valider inscription" />
    </form>
  );
};

export default SingupForm;
