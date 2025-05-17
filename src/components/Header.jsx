import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

function Header({ usuario, setUsuario }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('usuario');  // elimina usuario guardado
    setUsuario(null);                    // limpia estado global
    navigate('/');
  };

  const iniciales = usuario
    ? `${usuario.nombre} ${usuario.apellido}`
        .trim()
        .split(' ')
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join('')
    : '';

  return (
    <header className="main-header">
      <div className="header-left" onClick={() => navigate('/')}>
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
            <div className="avatar">{iniciales}</div>
            <span className="usuario-nombre">{usuario.nombre}</span>
            <button className="header-button cerrar-sesion" onClick={handleLogout}>Cerrar sesión</button>
          </div>
        )}

        {/* Enlace Admin solo si el rol es ADMIN */}
        {usuario?.rol === 'ADMIN' && (
          <Link to="/admin" className="admin-link">Admin</Link>
        )}
      </div>
    </header>
  );
}

export default Header;





