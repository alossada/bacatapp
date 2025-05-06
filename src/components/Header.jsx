import React from 'react';
import './Header.css'; 
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  return (
    <header className="main-header">
      <div className="header-left" onClick={handleHome}>
        <img src={logo} alt="Logo" className="logo" />
        <span className="tagline">Tu lugar para reservar</span>
      </div>
      <div className="header-right">
        <button className="header-button">Crear cuenta</button>
        <button className="header-button">Iniciar sesión</button>
      </div>      
      <Link to="/admin" className="text-white hover:text-gray-300 mx-2">
        Admin
      </Link>
    </header>
  );
}

export default Header;
