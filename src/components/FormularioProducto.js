import React, { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/categoriaService";

const FormularioProducto = ({ onSubmit }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const imagenesArray = imagenes.split(",").map((url) => url.trim());
    onSubmit({ nombre, descripcion, imagenes: imagenesArray, categoriaId });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registrar producto</h2>

      <label>
        Nombre:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label>
        Descripción:
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </label>

      <label>
        Imágenes (URLs separadas por coma):
        <input
          type="text"
          value={imagenes}
          onChange={(e) => setImagenes(e.target.value)}
        />
      </label>

      <label>
        Categoría:
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.titulo}
            </option>
          ))}
        </select>
      </label>

      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioProducto;
