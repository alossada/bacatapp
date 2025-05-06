import React, { useEffect, useState } from "react";
import axios from "axios";

const Buscador = () => {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        console.log("Productos cargados:", response.data);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Buscar Productos</h2>
      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full mb-6 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productosFiltrados.map((producto) => (
          <div
            key={producto.id}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-900">{producto.nombre}</h3>
            <p className="text-gray-600 mb-3">{producto.descripcion}</p>
            {producto.imagenes?.[0] && (
              <img
                src={producto.imagenes[0]}
                alt={producto.nombre}
                className="rounded-md w-full h-40 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Buscador;


  