import React from 'react';
import './Main.css';
import Buscador from './Buscador';
import Categorias from './Categorias';
import Recomendaciones from './Recomendaciones';

const Main = () => {
  return (
    <main className="main-container">
      <Buscador />
      <Categorias />            
      <Recomendaciones />      
    </main>
  );
};

export default Main;
