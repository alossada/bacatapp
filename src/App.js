import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import AdminPanel from "./pages/AdminPanel";
import AgregarProducto from './pages/AgregarProducto';
import AdminListaProductos from './pages/AdminListaProductos';
import CrearAdmin from './pages/CrearAdmin';

import ListaProductos from "./components/ListaProductos";
import DetalleProducto from "./components/DetalleProducto";
import Categorias from "./components/Categorias";
import ProductosPorCategoria from "./components/ProductosPorCategoria";
import RegistroUsuario from './components/RegistroUsuario';
import LoginUsuario from './components/LoginUsuario';


function HomePage() {
  return <h2>Bienvenido a BacataApp</h2>;
}

function App() {
  const [usuario, setUsuario] = useState(null);

  // ⬇️ Recupera usuario (y su rol) al recargar la página
  useEffect(() => {
    const guardado = localStorage.getItem('usuario');
    if (guardado) {
      setUsuario(JSON.parse(guardado));
    }
  }, []);

  // ⬇️ Helper para proteger rutas admin
  const soloAdmin = (element) =>
    usuario?.rol === 'ADMIN' ? element : <Navigate to="/" replace />;

  return (
    <Router>
      <Header usuario={usuario} setUsuario={setUsuario} />
      <div style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/login" element={<LoginUsuario onLogin={setUsuario} />} />

          {/* 🚫 Rutas protegidas para ADMIN */}
          <Route path="/admin"                    element={soloAdmin(<AdminPanel />)} />
          <Route path="/admin/agregar-producto"   element={soloAdmin(<AgregarProducto />)} />
          <Route path="/admin/lista-productos"    element={soloAdmin(<AdminListaProductos />)} />
          <Route path="/admin/crear-admin" element={<CrearAdmin />} />

          {/* Rutas públicas */}
          <Route path="/hoteles" element={<ListaProductos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />

          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:id/productos" element={<ProductosPorCategoria />} />
        </Routes>
      </div>
      <Main />
      <Footer />
    </Router>
  );
}

export default App;




