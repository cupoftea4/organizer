import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import Home from './pages/Home';
import { NoPage } from './pages/NoPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter basename={process.env.REACT_APP_PATH_PREFIX}>
        <Routes>
          <Route path={`/`} element={<Home/>}/> 
          <Route path={`*`} element={<NoPage/>} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  document.getElementById('root')
);


