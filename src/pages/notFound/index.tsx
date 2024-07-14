import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const NotFound = () => {
  return (
    <div className="background not-found">
      <img src="../../images/notFound.jpeg" alt="notFoundImg" />
      <Link className="button" to={'/'}>
        На главную
      </Link>
    </div>
  );
};

export default NotFound;
