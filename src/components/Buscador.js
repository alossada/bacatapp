import React, { useEffect, useState } from "react";
import axios from "axios";
import './Buscador.css';

const Buscador = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        console.log("Productos cargados:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="buscador-container">
      <h2 className="buscador-titulo">Buscar Productos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="buscador-input"
      />

      <div className="buscador-grid">
        {productosFiltrados.map((producto) => (
          <div key={producto.id} className="buscador-card">
            <h3 className="buscador-nombre">{producto.nombre}</h3>
            <p className="buscador-descripcion">{producto.descripcion}</p>
            {producto.imagenes?.[0] && (
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="buscador-imagen"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Buscador;



  