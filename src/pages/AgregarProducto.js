import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import axios from "axios";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([""]);
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChangeImagen = (index, value) => {
    const nuevasImagenes = [...imagenes];
    nuevasImagenes[index] = value;
    setImagenes(nuevasImagenes);
  };

  const agregarCampoImagen = () => {
    setImagenes([...imagenes, ""]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/productos", {
        nombre,
        descripcion,
        imagenes,
      });
      setMensaje("Producto agregado exitosamente.");
      setNombre("");
      setDescripcion("");
      setImagenes([""]);
    } catch (error) {
      if (error.response && error.response.data) {
        setMensaje(error.response.data);
      } else {
        setMensaje("Error al agregar producto.");
      }
    }
  };

  return (
    <>
      <div className="admin-header-bar">
        <button onClick={() => navigate("/admin")} className="admin-button lista">
          Volver al Panel
        </button>
        <button onClick={() => navigate("/admin/lista-productos")} className="admin-button agregar">
          Ver Lista
        </button>
      </div>

      <main className="admin-container">
        <div className="contenido-box">
          <h2 className="titulo">Agregar Producto</h2>
          <form onSubmit={handleSubmit} className="formulario">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <textarea
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            {imagenes.map((imagen, index) => (
              <input
                key={index}
                type="text"
                placeholder={`Imagen ${index + 1} (URL)`}
                value={imagen}
                onChange={(e) => handleChangeImagen(index, e.target.value)}
                required
              />
            ))}
            <button type="button" onClick={agregarCampoImagen} className="btn-link">
              + Agregar otra imagen
            </button>
            <button type="submit" className="btn-guardar">Guardar</button>
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </main>
    </>
  );
};

export default AgregarProducto;

