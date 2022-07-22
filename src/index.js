import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import { NoPage } from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/Products';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


