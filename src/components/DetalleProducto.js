import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import CalendarioDisponibilidad from "../components/CalendarioDisponibilidad";
import "./DetalleProducto.css";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState(null);
  const [fechasOcupadas, setFechasOcupadas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);
  const [errorDisp, setErrorDisp] = useState("");

  /* Datos del producto + disponibilidad*/
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [{ data: prod }, { data: fechas }] = await Promise.all([
          api.get(`/productos/${id}`),
          api.get(`/reservas/ocupadas/${id}`),
        ]);
        setProducto(prod);
        setFechasOcupadas(fechas);      // array de ISO-dates
      } catch (err) {
        console.error(err);
        setErrorDisp("No se pudo cargar la disponibilidad.");
      }
    };
    cargarDatos();
  }, [id]);

  if (!producto) return <p className="loading-text">Cargando producto…</p>;

  return (
    <section className="detalle-seccion">
      <header className="detalle-header">
        <h1 className="detalle-titulo">{producto.nombre}</h1>
        <button onClick={() => navigate(-1)} className="volver-btn">
          ⬅ Volver
        </button>
      </header>

      <p className="detalle-descripcion">{producto.descripcion}</p>

      {/* Características */}
      <h2 className="detalle-subtitulo">Características</h2>
      {producto.caracteristicas?.length ? (
        <div className="detalle-caracteristicas">
          {producto.caracteristicas.map((c) => (
            <span key={c.id} className="caracteristica-item">
              {/^https?:\/\//.test(c.icono) && (
                <img src={c.icono} alt={c.nombre} className="caracteristica-icono" />
              )}
              {c.nombre}
            </span>
          ))}
        </div>
      ) : (
        <p className="texto-secundario">Sin características.</p>
      )}

      {/* Galería */}
      {producto.imagenes?.[0] && (
        <img src={producto.imagenes[0]} alt={producto.nombre} className="detalle-imagen" />
      )}

      {/* Calendario de disponibilidad */}
      <h2 className="detalle-subtitulo">Disponibilidad</h2>
      {errorDisp ? (
        <p className="error-texto">{errorDisp}</p>
      ) : (
        <CalendarioDisponibilidad
          fechaInicio={fechaInicio}
          setFechaInicio={setFechaInicio}
          fechaFin={fechaFin}
          setFechaFin={setFechaFin}
          fechasOcupadas={fechasOcupadas}
        />
      )}
    </section>
  );
};

export default DetalleProducto;


