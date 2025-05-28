import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './AdminListaProductos.css'; 

const AdminListaProductos = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await api.get('/productos');
        setProductos(response.data || []);
      } catch (err) {
        setError('Error al cargar productos');
      }
    };
    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return;
    try {
      await api.delete(`/productos/${id}`);
      setProductos(productos.filter(p => p.id !== id));
    } catch {
      alert('Error al eliminar producto.');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Administrar Hoteles</h2>
        <button className="btn-add" onClick={() => navigate('/admin/agregar-producto')}>
          + Agregar Producto
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Características</th> 
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length ? (
              productos.map(p => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>
                  <td>{p.descripcion}</td>
                  <td>{p.categoria?.titulo || '—'}</td>
                  <td>
                    {p.caracteristicas?.length ? (
                      p.caracteristicas.map(c => (
                        <span key={c.id} className="chip">
                          {c.nombre}
                        </span>
                      ))
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    {p.imagenes?.length ? (
                      <img
                        src={p.imagenes[0]}
                        alt={p.nombre}
                        className="product-image"
                      />
                    ) : (
                      '—'
                    )}
                  </td>
                  <td>
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/admin/editar-producto/${p.id}`)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleEliminar(p.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No hay productos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminListaProductos;
