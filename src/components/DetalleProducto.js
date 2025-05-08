import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/productos/${id}`);
        console.log("Detalle del producto:", response.data);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al cargar el producto:", error);
      }
    };

    fetchProducto();
  }, [id]);

  if (!producto) {
    return <p className="text-center py-10">Cargando producto...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">{producto.nombre}</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ⬅ Volver
        </button>
      </header>

      {/* Body */}
      <main className="max-w-4xl mx-auto p-6 bg-white mt-6 rounded-lg shadow">
        <p className="text-gray-700 mb-4">{producto.descripcion}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {producto.imagenes?.map((img, index) => (
            <img
            key={index}
            src={img}
            alt={`Imagen ${index + 1}`}
            className="rounded-lg w-full h-56 object-cover hover:scale-105 transition-transform"
            />
            ))}
        </div>

      </main>
    </div>
  );
};

export default DetalleProducto;
