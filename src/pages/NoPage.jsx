import React from 'react'
import { Link } from "react-router-dom";
import './NoPage.css'; 

export const NoPage = () => {

  return (
    <div className="center-div">
      <p>Сторінку не знайдено</p>
      <Link className="primary-button" to={`${window.location.pathname}/`}>назад</Link>
    </div>
  )
}
