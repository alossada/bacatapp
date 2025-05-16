import React, { useState } from 'react';
import './LoginUsuario.css';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginUsuario = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // ✅ Hook correcto para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/usuarios/login', { email, password });

      // ✅ Guardar en localStorage
      localStorage.setItem('usuario', JSON.stringify(res.data));

      // ✅ Callback para actualizar el estado en App si se pasa
      if (onLogin) {
        onLogin(res.data);
      }

      // ✅ Redirigir al home
      navigate('/');
    } catch (err) {
      setError('Email o contraseña incorrectos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h2>Iniciar Sesión</h2>
      <label>Email:</label>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />

      <label>Contraseña:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />

      <button type="submit">Ingresar</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default LoginUsuario;

