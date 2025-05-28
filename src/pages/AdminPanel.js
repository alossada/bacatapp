import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAgregarProducto = () => {
    navigate("/admin/agregar-producto");
  };

  const handleCrearAdmin = () => {
    navigate("/admin/crear-admin");
  };

  return (
    <>
      <div className="admin-header-bar">
        <button
          onClick={() => navigate("/admin/agregar-categoria")}
          className="admin-button agregar"
        >
         Agregar Categoría
        </button>
        
        <button
          onClick={handleAgregarProducto}
          className="admin-button agregar"
        >
          Agregar Hotel
        </button>

        <button
          onClick={() => navigate("/admin/lista-productos")}
          className="admin-button lista"
        >
          Lista de Hoteles
        </button>

        <button
          onClick={handleCrearAdmin}
          className="admin-button crear-admin"
        >
          Crear Admin
        </button>
      </div>

      <main className="admin-container">
        <h1 className="admin-container h1">Panel de Administración</h1>
      </main>
    </>
  );
};

export default AdminPanel;


