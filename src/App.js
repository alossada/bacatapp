import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';

function HomePage() {
  return <h2>Bienvenido a la página principal</h2>;
}

function App() {
  return (
    <Router>
      <Header />
      <div style={{ paddingTop: '80px' }}>
        {/* Evita que el contenido quede detrás del header fijo */}
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


