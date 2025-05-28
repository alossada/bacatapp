import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import api from "../utils/api";
import './Buscador.css';

// Importa íconos locales
const importarIcono = (nombreArchivo) => {
  try {
    return require(`../assets/iconos/${nombreArchivo}`);
  } catch (e) {
    return require(`../assets/iconos/default.png`);
  }
};

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
  const [sugerencias, setSugerencias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProductos, resCategorias] = await Promise.all([
          api.get("/productos"),
          api.get("/categorias")
        ]);

        const dataProductos = Array.isArray(resProductos.data) ? resProductos.data : [];
        setProductos(dataProductos);
        setCategorias(Array.isArray(resCategorias.data) ? resCategorias.data : []);
      } catch (error) {
        console.error("Error al obtener productos o categorías:", error);
      }
    };

    fetchData();
  }, []);

  const filtrarProductos = () => {
    return productos.filter((producto) => {
      const nombreMatch = producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const categoriaMatch = categoriaSeleccionada
        ? producto.categoria?.titulo === categoriaSeleccionada
        : true;

      const fechaDisponible = producto.fechaDisponible; // Asegúrate de que esto existe

      const fechaMatch =
        (!fechaInicio || new Date(fechaDisponible) >= fechaInicio) &&
        (!fechaFin || new Date(fechaDisponible) <= fechaFin);

      return nombreMatch && categoriaMatch && fechaMatch;
    });
  };

  const manejarBusqueda = () => {
    setMostrarResultados(true);
  };

  const manejarCambioBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    const sugerencias = productos
      .filter(p => p.nombre.toLowerCase().includes(valor.toLowerCase()))
      .map(p => p.nombre);
    setSugerencias(sugerencias.slice(0, 5));
  };

  const productosFiltrados = mostrarResultados ? filtrarProductos() : obtenerProductosAleatorios(productos);

  return (
    <section className="buscador-seccion">
      <h2 className="buscador-titulo">Encuentra tu producto ideal</h2>
      <p className="buscador-descripcion">
        Usa los filtros para encontrar productos disponibles según tus preferencias.
      </p>

      <div className="buscador-controles">
        <div className="campo-busqueda">
          <label>Buscar por nombre:</label>
          <input
            type="text"
            placeholder="Ej: Bicicleta eléctrica"
            value={busqueda}
            onChange={manejarCambioBusqueda}
            className="buscador-input"
            list="sugerencias"
          />
          <datalist id="sugerencias">
            {sugerencias.map((s, i) => (
              <option key={i} value={s} />
            ))}
          </datalist>
        </div>

        <div className="campo-categoria">
          <label>Categoría:</label>
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

        <div className="campo-fechas">
          <label>Desde:</label>
          <DatePicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            selectsStart
            startDate={fechaInicio}
            endDate={fechaFin}
            placeholderText="Fecha inicio"
          />
          <label>Hasta:</label>
          <DatePicker
            selected={fechaFin}
            onChange={(date) => setFechaFin(date)}
            selectsEnd
            startDate={fechaInicio}
            endDate={fechaFin}
            minDate={fechaInicio}
            placeholderText="Fecha fin"
          />
        </div>

        <button className="buscador-boton" onClick={manejarBusqueda}>
          Realizar búsqueda
        </button>
      </div>

      <div className="recomendaciones-grid">
        {productosFiltrados.length > 0 ? (
          productosFiltrados.map((producto) => (
            <div key={producto.id} className="recomendaciones-card">
              {producto.imagenes?.[0] && (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="recomendaciones-imagen"
                />
              )}
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Categoría: {producto.categoria?.titulo || "Sin categoría"}</p>
              <div className="recomendaciones-caracteristicas">
                {producto.caracteristicas?.map((c, index) => (
                  <div key={index} className="caracteristica-item">
                    <img src={importarIcono(c.icono)} alt={c.nombre} className="caracteristica-icono" />
                    <span>{c.nombre}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="recomendaciones-no-resultados">No se encontraron productos.</p>
        )}
      </div>
    </section>
  );
};

export default Buscador;


