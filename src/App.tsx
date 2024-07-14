import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NotFound from './pages/notFound';
import MainPage from './pages/main';

const links = [
  { path: '/', element: <MainPage /> },
  { path: '*', element: <NotFound /> },
];

const App = () => {
  return (
    <Routes>
      {links.map((link, index) => (
        <Route key={index} path={link.path} element={link.element} />
      ))}
    </Routes>
  );
};

export default App;
