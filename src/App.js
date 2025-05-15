import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import AdminPanel from "./pages/AdminPanel";
import AgregarProducto from './pages/AgregarProducto';
import ListaProductos from "./components/ListaProductos";
import DetalleProducto from "./components/DetalleProducto";
import AdminListaProductos from './pages/AdminListaProductos';
import Categorias from "./components/Categorias";
import ProductosPorCategoria from "./components/ProductosPorCategoria";
import RegistroUsuario from './components/RegistroUsuario';


function HomePage() {
  return <h2>Bienvenido a BacataApp</h2>;
}

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        {/* Evita que el contenido quede detrás del header fijo */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registro" element={<RegistroUsuario />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/agregar-producto" element={<AgregarProducto />} />
          <Route path="/hoteles" element={<ListaProductos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path='/admin/lista-productos' element={<AdminListaProductos/>}/>
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


