import React, { useEffect, useState } from "react";
import axios from "axios";

const ListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        console.log("Productos recibidos:", response.data);
        setProductos(response.data);
      } catch (err) {
        console.error("Error al obtener productos:", err);
        setError("No se pudieron cargar los productos");
      }
    };

    fetchProductos();
  }, []);

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Nuestros Hoteles
      </h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      {productos.length === 0 ? (
        <p className="text-center text-gray-500">No hay hoteles disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-2xl shadow-md p-6 transition transform hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {producto.nombre}
              </h3>
              <p className="text-gray-600 mb-4">{producto.descripcion}</p>
              {producto.imagenes?.[0] && (
                <img
                  src={producto.imagenes[0]}
                  alt={producto.nombre}
                  className="rounded-lg object-cover h-48 w-full"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaProductos;


