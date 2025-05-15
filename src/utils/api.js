import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Cambia este valor si usas otro puerto/backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Se Puede agregar interceptores si se desea manejar errores globales o autenticación
// api.interceptors.response.use(
//   response => response,
//   error => {
//     // Manejo global de errores
//     console.error('Error de API:', error);
//     return Promise.reject(error);
//   }
// );

export default api;
