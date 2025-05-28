import React, { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import "./AgregarCategoria.css";

const AgregarCategoria = () => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const nuevaCategoria = {
        titulo,
        descripcion,
        urlImagen: imagen,
      };

      await api.post("/categorias", nuevaCategoria);
      alert("Categoría creada con éxito");
      navigate("/admin"); // o a /admin/lista-categorias si existe
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Hubo un error al crear la categoría");
    }
  };

  return (
    <div className="contenido-box">
      <h2>Agregar nueva categoría</h2>
      <form onSubmit={handleSubmit} className="form-categoria">
        <label>
          Título:
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </label>

        <label>
          URL de la Imagen:
          <input
            type="text"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            required
          />
        </label>

        <button type="submit">Crear Categoría</button>
      </form>
    </div>
  );
};

export default AgregarCategoria;
