import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import "./DetalleProducto.css"; 

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await api.get(`/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) {
    return <p className="loading-text">Cargando producto...</p>;
  }

  return (
    <div className="detalle-container">
      {/* Header */}
      <header className="detalle-header">
        <h1>{producto.nombre}</h1>
        <button onClick={() => navigate(-1)}>⬅ Volver</button>
      </header>

      {/* Cuerpo */}
      <main className="detalle-main">
        <p className="producto-descripcion">{producto.descripcion}</p>

        {/* Características */}
        <section className="caracteristicas-bloque">
          <h2>Características</h2>
          {producto.caracteristicas?.length ? (
            <div className="caracteristicas-grid">
              {producto.caracteristicas.map((car) => {
                const esURL = /^https?:\/\//.test(car.icono || "");
                return (
                  <div key={car.id} className="caracteristica-card">
                    {esURL ? (
                      <img src={car.icono} alt={car.nombre} className="caracteristica-icono" />
                    ) : (
                      <div className={`caracteristica-icono fallback-icon`}></div>
                    )}
                    <span>{car.nombre}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="texto-secundario">Sin características.</p>
          )}
        </section>

        {/* Galería de imágenes */}
        <div className="galeria-imagenes">
          {producto.imagenes?.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Imagen ${i + 1}`}
              className="imagen-producto"
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default DetalleProducto;

