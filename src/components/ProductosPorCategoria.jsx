import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductosPorCategoria.css"; // crea estilos si los necesitas

const ProductosPorCategoria = () => {
  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [categoriaNombre, setCategoriaNombre] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/productos/categoria/${id}`);
        setProductos(response.data);
        if (response.data.length > 0 && response.data[0].categoria) {
          setCategoriaNombre(response.data[0].categoria.titulo);
        }
      } catch (error) {
        console.error("Error al cargar productos por categoría:", error);
      }
    };

    fetchProductos();
  }, [id]);

  return (
    <div className="productos-categoria-container">
      <h2>Productos de la categoría: {categoriaNombre || `ID ${id}`}</h2>
      <div className="productos-grid">
        {productos.map((producto) => (
          <div key={producto.id} className="producto-card">
            <h3>{producto.nombre}</h3>
            <p>{producto.descripcion}</p>
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
    </div>
  );
};

export default ProductosPorCategoria;
