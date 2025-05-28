import React, { useEffect, useState } from "react";
import axios from "axios";

const FiltroCategorias = ({ onFiltrar }) => {
  const [categorias, setCategorias] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const res = await axios.get("http://localhost:8080/categorias");
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleCheckboxChange = (id) => {
    const nuevas = seleccionadas.includes(id)
      ? seleccionadas.filter((cid) => cid !== id)
      : [...seleccionadas, id];
    setSeleccionadas(nuevas);
  };

  const aplicarFiltro = () => {
    onFiltrar(seleccionadas);
  };

  const limpiarFiltros = () => {
    setSeleccionadas([]);
    onFiltrar([]);
  };

  return (
    <div className="filtro-categorias">
      <h3>Filtrar por Categoría</h3>
      {categorias.map((cat) => (
        <div key={cat.id}>
          <label>
            <input
              type="checkbox"
              checked={seleccionadas.includes(cat.id)}
              onChange={() => handleCheckboxChange(cat.id)}
            />
            {cat.titulo}
          </label>
        </div>
      ))}
      <button onClick={aplicarFiltro}>Aplicar Filtros</button>
      <button onClick={limpiarFiltros}>Limpiar</button>
    </div>
  );
};

export default FiltroCategorias;

