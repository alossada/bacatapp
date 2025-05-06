import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import AdminPanel from "./pages/AdminPanel";
import AgregarProducto from './pages/AgregarProducto';
import ListaProductos from "./components/ListaProductos";
import DetalleProducto from "./components/DetalleProducto";

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
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/agregar-producto" element={<AgregarProducto />} />
          <Route path="/hoteles" element={<ListaProductos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
        </Routes>
      </div>
      <Main />
      <Footer />
    </Router>
  );
}

export default App;


