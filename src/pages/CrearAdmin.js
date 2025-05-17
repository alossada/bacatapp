import React, { useState } from 'react';
import api from '../utils/api';
import './CrearAdmin.css';

const CrearAdmin = () => {
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
      setMensaje('');
      return;
    }
    setErrores({});
    try {
      const response = await api.post('/usuarios/admin/crear', form);
      setMensaje('Administrador creado correctamente.');
      setForm({ nombre: '', apellido: '', email: '', password: '' });
    } catch (error) {
      setMensaje('Error al crear el administrador.');
    }
  };

  return (
    <div className="crear-admin-container">
      <h2>Crear Usuario Administrador</h2>
      <form onSubmit={handleSubmit} className="crear-admin-form">
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

        <button type="submit">Crear Admin</button>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </form>
    </div>
  );
};

export default CrearAdmin;

