import React from 'react';
import './Header.css'; 
import logo from '../assets/logo.png'; 
import { useNavigate, Link } from 'react-router-dom';

function Header({ usuario, setUsuario }) {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token si lo estás usando
    setUsuario(null);                 // Limpia el estado de usuario
    navigate('/');                   // Redirige al home
  };

  const obtenerIniciales = (nombreCompleto) => {
    const partes = nombreCompleto.trim().split(' ');
    const iniciales = partes.slice(0, 2).map(p => p.charAt(0).toUpperCase());
    return iniciales.join('');
  };

  return (
    <header className="main-header">
      <div className="header-left" onClick={handleHome}>
        <img src={logo} alt="Logo" className="logo" />
        <span className="tagline">Tu lugar para reservar</span>
      </div>

      <div className="header-right">
        {!usuario ? (
          <>
            <button className="header-button" onClick={() => navigate('/registro')}>Crear cuenta</button>
            <button className="header-button" onClick={() => navigate('/login')}>Iniciar sesión</button>
          </>
        ) : (
          <div className="usuario-info">
            <div className="avatar">{obtenerIniciales(`${usuario.nombre} ${usuario.apellido}`)}</div>
            <span className="usuario-nombre">{usuario.nombre}</span>
            <button className="header-button cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}
      </div>

      <Link to="/admin" className="admin-link">
        Admin
      </Link>
    </header>
  );
}

export default Header;




