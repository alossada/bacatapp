import React, { useEffect, useState } from "react";
import api from '../utils/api';
import './ListaProductos.css';

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Función para seleccionar 10 productos únicos aleatorios
  const obtenerProductosAleatorios = (lista) => {
    const copia = [...lista];
    const seleccionados = new Set();
    while (seleccionados.size < 10 && copia.length > 0) {
      const index = Math.floor(Math.random() * copia.length);
      seleccionados.add(copia.splice(index, 1)[0]);
    }
    return Array.from(seleccionados);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await api.get("http://localhost:8080/productos");
        // Aseguramos que response.data sea array
        const data = Array.isArray(response.data) ? response.data : [];
        setProductos(data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="lista-container">
      <h2 className="lista-titulo">Explora nuestros hoteles</h2>

      {error && <p className="lista-error">{error}</p>}

      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            {producto.imagenes?.[0] && (
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="producto-imagen"
              />
            )}
            <div className="producto-info">
              <h3 className="producto-nombre">{producto.nombre}</h3>
              <p className="producto-descripcion">{producto.descripcion}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaProductos;



