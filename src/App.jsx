import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Contrast from './Contrast';
import Cores from './Cores';
import Header from './Header';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='contraste' element={<Contrast />} />
        <Route path='cores' element={<Cores />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
