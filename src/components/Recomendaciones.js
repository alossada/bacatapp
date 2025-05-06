import React, { useEffect, useState } from "react";
import axios from "axios";

const Recomendaciones = () => {
  const [productos, setProductos] = useState([]);

  // Función para mezclar el array de productos
  const obtenerProductosAleatorios = (lista, cantidad) => {
    const copia = [...lista];
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia.slice(0, cantidad);
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:8080/productos");
        const aleatorios = obtenerProductosAleatorios(response.data, 10);
        console.log("Productos aleatorios:", aleatorios);
        setProductos(aleatorios);
      } catch (error) {
        console.error("Error al obtener productos aleatorios:", error);
      }
    };

    fetchProductos();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Recomendaciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {productos.map((producto) => (
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

export default Recomendaciones;

  