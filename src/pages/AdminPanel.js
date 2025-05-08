import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAgregarProducto = () => {
    navigate("/admin/agregar-producto");
  };

  return (
    <>
      <div className="admin-header-bar">
        <button
          onClick={handleAgregarProducto}
          className="admin-button agregar"
        >
          Agregar Producto
        </button>
        <button
          onClick={() => navigate("/admin/lista-productos")}
          className="admin-button lista"
        >
          Lista de Hoteles
        </button>
      </div>

      <main className="admin-container">
        <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      </main>
    </>
  );
};

export default AdminPanel;

