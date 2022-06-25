import React from 'react';
//import ReactDOM from 'react-dom';
import App from './App.js';
import { createRoot } from 'react-dom/client';

//const root = ReactDOM.createRoot(document.getElementById('root'));
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
