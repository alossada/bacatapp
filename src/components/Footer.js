import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src="/logo192.png" alt="Logo" className="footer-logo" />
        <p>&copy; {new Date().getFullYear()} BacataApp. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
