import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { obtenerCategorias } from "../services/categoriaService";
import "./Categorias.css";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await obtenerCategorias();
        console.log("Categorías cargadas:", data);
        setCategorias(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

 const handleClickCategoria = (id) => {
  navigate(`/productos/categoria/${id}`);
};


  return (
    <section className="categorias-container">
      <h2 className="categorias-titulo">Categorías</h2>
      <div className="categorias-lista">
        {categorias.map((cat) => (
          <div
            key={cat.id}
            className="categoria-item"
            onClick={() => handleClickCategoria(cat.id)}
            style={{ cursor: "pointer" }}
          >
            <img src={cat.imagenUrl} alt={cat.titulo} className="categoria-imagen" />
            <h3>{cat.titulo}</h3>
            <p>{cat.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categorias;


