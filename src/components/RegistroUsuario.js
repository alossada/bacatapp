import React, { useState } from 'react';

import './RegistroUsuario.css'; 
import api from '../utils/api';

const RegistroUsuario = () => {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validar = () => {
    const errores = {};
    if (!form.nombre.trim()) errores.nombre = 'El nombre es obligatorio.';
    if (!form.apellido.trim()) errores.apellido = 'El apellido es obligatorio.';
    if (!form.email.trim()) {
      errores.email = 'El correo es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errores.email = 'El correo no es válido.';
    }
    if (!form.password.trim()) {
      errores.password = 'La contraseña es obligatoria.';
    } else if (form.password.length < 6) {
      errores.password = 'La contraseña debe tener al menos 6 caracteres.';
    }
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const erroresValidacion = validar();
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }
    setErrores({});
    try {
      const response = await api.post('/usuarios/registro', form);
      console.log(response.data);
      setMensaje('Usuario registrado correctamente.');
      setForm({ nombre: '', apellido: '', email: '', password: '' });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      setMensaje('Error al registrar el usuario.');
    }
  };

  return (
    <div className="registro-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="registro-form">

        <label>Nombre:</label>
        <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <label>Apellido:</label>
        <input type="text" name="apellido" value={form.apellido} onChange={handleChange} />
        {errores.apellido && <p className="error">{errores.apellido}</p>}

        <label>Email:</label>
        <input type="email" name="email" value={form.email} onChange={handleChange} />
        {errores.email && <p className="error">{errores.email}</p>}

        <label>Contraseña:</label>
        <input type="password" name="password" value={form.password} onChange={handleChange} />
        {errores.password && <p className="error">{errores.password}</p>}

        <button type="submit">Registrarse</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default RegistroUsuario;
