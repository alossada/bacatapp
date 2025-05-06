import React, { useState } from 'react';
import './AgregarProducto.css';
import axios from "axios";

const AgregarProducto = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([""]);
  const [mensaje, setMensaje] = useState("");

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
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Agregar Producto</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
        <div>
          {imagenes.map((imagen, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Imagen ${index + 1} (URL)`}
              value={imagen}
              onChange={(e) => handleChangeImagen(index, e.target.value)}
              className="w-full border rounded p-2 my-2"
              required
            />
          ))}
          <button
            type="button"
            onClick={agregarCampoImagen}
            className="text-blue-600 underline text-sm"
          >
            + Agregar otra imagen
          </button>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Guardar
        </button>
        {mensaje && <p className="mt-4 text-sm text-red-600">{mensaje}</p>}
      </form>
    </div>
  );
};

export default AgregarProducto;
