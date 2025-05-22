import React, { useEffect, useState } from "react";
import api from "../utils/api";
import './Buscador.css';

// Función para importar íconos locales
const importarIcono = (nombreArchivo) => {
  try {
    return require(`../assets/iconos/${nombreArchivo}`);
  } catch (e) {
    console.warn(`Icono no encontrado: ${nombreArchivo}`);
    return require(`../assets/iconos/default.png`);
  }
};

// Función para obtener hasta 10 productos aleatorios únicos
const obtenerProductosAleatorios = (lista) => {
  const copia = [...lista];
  const seleccionados = new Set();
  while (seleccionados.size < 10 && copia.length > 0) {
    const index = Math.floor(Math.random() * copia.length);
    seleccionados.add(copia.splice(index, 1)[0]);
  }
  return Array.from(seleccionados);
};

const Buscador = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProductos, resCategorias] = await Promise.all([
          api.get("/productos"),
          api.get("/categorias")
        ]);

        const dataProductos = Array.isArray(resProductos.data) ? resProductos.data : [];
        const aleatorios = obtenerProductosAleatorios(dataProductos);
        setProductos(aleatorios);
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
    <section className="recomendaciones-container">
      <h2 className="recomendaciones-titulo">Buscar Productos</h2>

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

      <div className="recomendaciones-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => {
            console.log(`Características del producto "${producto.nombre}":`, producto.caracteristicas);

            return (
              <div key={producto.id} className="recomendaciones-card">
                {producto.imagenes?.[0] && (
                  <img
                    src={producto.imagenes[0]}
                    alt={producto.nombre}
                    className="recomendaciones-imagen"
                  />
                )}
                <h3 className="recomendaciones-nombre">{producto.nombre}</h3>
                <p className="recomendaciones-descripcion">{producto.descripcion}</p>
                <p className="recomendaciones-categoria">
                  Categoría: {producto.categoria?.titulo || "Sin categoría"}
                </p>

                <div className="recomendaciones-caracteristicas">
                  {producto.caracteristicas?.map((c, index) => (
                    <div key={index} className="caracteristica-item">
                      <img
                        src={importarIcono(c.icono)}
                        alt={c.nombre}
                        className="caracteristica-icono"
                      />
                      <span>{c.nombre}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p className="recomendaciones-no-resultados">No se encontraron productos.</p>
        )}
      </div>
    </section>
  );
};

export default Buscador;

