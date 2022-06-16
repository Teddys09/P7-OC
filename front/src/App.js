// Utiliser raccourci rsc
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// Import pour le routeur
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UidContext } from './components/AppContext';
import Createpost from './components/Createpost';
import Accueil from './pages/Accueil';

import Auth from './pages/Auth';
import './Style/Style.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/Accueil" element={<Accueil />} />
        <Route path="/CreatePost" element={<Createpost />} />
        <Route path="*" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
