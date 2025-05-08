import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Recomendaciones.css";

const Recomendaciones = () => {
  const [productos, setProductos] = useState([]);

  const obtenerProductosAleatorios = (lista, cantidad) => {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, cantidad);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        const aleatorios = obtenerProductosAleatorios(response.data, 10);
        console.log("Productos aleatorios:", aleatorios);
        setProductos(aleatorios);
      } catch (error) {
        console.error("Error al obtener productos aleatorios:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="recomendaciones-container">
      <h2 className="recomendaciones-titulo">Recomendaciones</h2>
      <div className="recomendaciones-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="recomendaciones-card">
            <h3 className="recomendaciones-nombre">{producto.nombre}</h3>
            <p className="recomendaciones-descripcion">{producto.descripcion}</p>
            {producto.imagenes?.[0] && (
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="recomendaciones-imagen"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recomendaciones;


  