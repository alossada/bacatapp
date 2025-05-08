import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPanel.css";

const AdminListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        console.log("Productos obtenidos:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <>
      <div className="admin-header-bar">
        <button onClick={() => navigate("/admin")} className="admin-button lista">
          Volver al Panel
        </button>
        <button onClick={() => navigate("/admin/agregar-producto")} className="admin-button agregar">
          Agregar Producto
        </button>
      </div>

      <main className="admin-container">
        <div className="contenido-box">
          <h2 className="titulo">Lista de Productos</h2>
          <table className="tabla">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>
                    <button className="btn-accion editar">Editar</button>
                    <button className="btn-accion eliminar">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};

export default AdminListaProductos;
