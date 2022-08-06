import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home';
import { NoPage } from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from './pages/Products';

const path = window.location.pathname;

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={`${path}`} element={<Home />} />
          <Route path={`${path}/products`} element={<Products />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


