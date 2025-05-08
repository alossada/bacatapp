import React, { useEffect, useState } from "react";
import axios from "axios";
import './ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        console.log("Productos recibidos:", response.data);
        setProductos(response.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="lista-container">
      <h2 className="lista-titulo">Nuestros Hoteles</h2>

      {error && <p className="lista-error">{error}</p>}

      {productos.length === 0 ? (
        <p className="lista-vacio">No hay hoteles disponibles.</p>
      ) : (
        <div className="productos-grid">
          {productos.map((producto) => (
            <div key={producto.id} className="producto-card">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
              {producto.imagenes?.[0] && (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="producto-imagen"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaProductos;



