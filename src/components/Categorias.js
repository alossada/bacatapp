import React from "react";
import "./Categorias.css";

const Categorias = () => {
  const categoriasEjemplo = [
    "Playa",
    "Montaña",
    "Ciudad",
    "Campo",
    "Aventura",
    "Lujo",
  ];

  return (
    <section className="categorias-container">
      <h2 className="categorias-titulo">Categorías</h2>
      <div className="categorias-lista">
        {categoriasEjemplo.map((cat, index) => (
          <div key={index} className="categoria-item">
            {cat}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categorias;
