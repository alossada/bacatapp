import React, { useState } from "react";
import axios from "axios";
import FiltroCategorias from "./FiltroCategorias";

const VistaProductosFiltrables = () => {
  const [productos, setProductos] = useState([]);

  const filtrarProductos = async (categoriaIds) => {
    try {
      if (categoriaIds.length === 0) {
        setProductos([]); // podrías cargar todos los productos si quieres
        return;
      }

      const res = await axios.get(
        `http://localhost:8080/productos/filtrar?categorias=${categoriaIds.join(",")}`
      );
      setProductos(res.data);
    } catch (error) {
      console.error("Error al filtrar productos", error);
    }
  };

  return (
    <div className="vista-productos">
      <FiltroCategorias onFiltrar={filtrarProductos} />
      <div className="productos-grid">
        {productos.map((prod) => (
          <div key={prod.id} className="producto-card">
            <h3>{prod.nombre}</h3>
            <p>{prod.descripcion}</p>
            {prod.imagenes?.[0] && (
              <img src={prod.imagenes[0]} alt={prod.nombre} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaProductosFiltrables;
