import React, { useEffect, useState } from "react";
import axios from "axios";
import './Buscador.css';

const Buscador = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProductos, resCategorias] = await Promise.all([
          axios.get("http://localhost:8080/productos"),
          axios.get("http://localhost:8080/categorias")
        ]);
        setProductos(Array.isArray(resProductos.data) ? resProductos.data : []);
        setCategorias(Array.isArray(resCategorias.data) ? resCategorias.data : []);
      } catch (error) {
        console.error("Error al obtener productos o categorías:", error);
      }
    };

    fetchData();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCategoria = categoriaSeleccionada
      ? producto.categoria?.titulo === categoriaSeleccionada
      : true;
    return coincideNombre && coincideCategoria;
  });

  return (
    <section className="buscador-container">
      <h2 className="buscador-titulo">Buscar Productos</h2>

      <div className="buscador-controles">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="buscador-input"
        />

        <select
          value={categoriaSeleccionada}
          onChange={(e) => setCategoriaSeleccionada(e.target.value)}
          className="buscador-select"
        >
          <option value="">Todas las categorías</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.titulo}>
              {cat.titulo}
            </option>
          ))}
        </select>
      </div>

      <div className="buscador-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="buscador-card">
              <h3 className="buscador-nombre">{producto.nombre}</h3>
              <p className="buscador-categoria">
                Categoría: {producto.categoria?.titulo || "Sin categoría"}
              </p>
              <p className="buscador-descripcion">{producto.descripcion}</p>
              {producto.imagenes?.[0] && (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="buscador-imagen"
                />
              )}
            </div>
          ))
        ) : (
          <p className="buscador-no-resultados">No se encontraron productos.</p>
        )}
      </div>
    </section>
  );
};

export default Buscador;





  