import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './AdminProductoForm.css'; // Comparte estilos con el de editar

const AgregarProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [imagenes, setImagenes] = useState('');
  const [caracteristicasSeleccionadas, setCaracteristicasSeleccionadas] = useState([]);

  const [categorias, setCategorias] = useState([]);
  const [caracteristicas, setCaracteristicas] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [catRes, caracRes] = await Promise.all([
          api.get('/categorias'),
          api.get('/caracteristicas')
        ]);
        setCategorias(catRes.data);
        setCaracteristicas(caracRes.data);
      } catch {
        setError('Error al cargar categorías o características');
      }
    };
    fetchDatos();
  }, []);

  const handleCheckboxChange = (id) => {
    setCaracteristicasSeleccionadas(prev =>
      prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) return setError('El nombre es obligatorio');
    if (!descripcion.trim()) return setError('La descripción es obligatoria');
    if (!categoriaId) return setError('Seleccione una categoría');
    if (imagenes.trim()) {
      const urls = imagenes.split(',').map(img => img.trim());
      for (let url of urls) {
        if (!/^https?:\/\/.+/.test(url)) {
          return setError('Las URLs de imágenes deben comenzar con http o https');
        }
      }
    }

    setError('');
    setLoading(true);

    const productoData = {
      nombre,
      descripcion,
      categoria: { id: Number(categoriaId) },
      imagenes: imagenes ? imagenes.split(',').map(i => i.trim()) : [],
      caracteristicas: caracteristicasSeleccionadas.map(id => ({ id }))
    };

    try {
      await api.post('/productos', productoData);
      navigate('/admin/productos');
    } catch (err) {
      setError(err.response?.data || 'Error al guardar el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2>Agregar Hotel</h2>

      {error && <p className="error">{error}</p>}

      <form className="admin-form" onSubmit={handleSubmit} noValidate>
        <label>
          Nombre:
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            required
          />
        </label>

        <label>
          Descripción:
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Descripción detallada"
            rows="3"
            required
          />
        </label>

        <label>
          Categoría:
          <select
            value={categoriaId}
            onChange={e => setCategoriaId(e.target.value)}
            required
          >
            <option value="">-- Seleccione una categoría --</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.titulo}
              </option>
            ))}
          </select>
        </label>

        <label>
          Características:
          <div className="caracteristicas-lista">
            {caracteristicas.map(carac => (
              <label key={carac.id} className="checkbox-inline">
                <input
                  type="checkbox"
                  checked={caracteristicasSeleccionadas.includes(carac.id)}
                  onChange={() => handleCheckboxChange(carac.id)}
                />
                {carac.nombre}
              </label>
            ))}
          </div>
        </label>

        <label>
          Imágenes (URLs separadas por coma):
          <input
            type="text"
            value={imagenes}
            onChange={e => setImagenes(e.target.value)}
            placeholder="http://ejemplo.com/img1.jpg, http://ejemplo.com/img2.jpg"
          />
        </label>

        <div className="btn-group">
          <button type="submit" disabled={loading} className="btn-save">
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate('/admin/productos')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarProducto;


