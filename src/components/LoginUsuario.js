import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './LoginUsuario.css';

const LoginUsuario = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/usuarios/login', { email, password });

      // Guarda usuario con rol
      localStorage.setItem('usuario', JSON.stringify(res.data));
      if (onLogin) onLogin(res.data);

      navigate('/');
    } catch {
      setError('Email o contraseña incorrectos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar Sesión</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label>Contraseña:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

      <button type="submit">Ingresar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginUsuario;


