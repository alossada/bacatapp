import React from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleAgregarProducto = () => {
    navigate("/admin/agregar-producto");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <button
        onClick={handleAgregarProducto}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Agregar Producto
      </button>
      {/* Aquí irán otras funciones administrativas */}
    </main>
  );
};

export default AdminPanel;
