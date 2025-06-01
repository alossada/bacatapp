
# 🏨 BacatApp - Aplicación de Reservas

BacatApp es una plataforma web desarrollada con React que permite a los usuarios gestionar reservas de productos como hoteles, autos u hospedajes. La aplicación está diseñada para ofrecer una experiencia de usuario intuitiva y eficiente.

## 🚀 Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router**: Manejo de rutas en la aplicación.
- **Axios**: Cliente HTTP para realizar solicitudes al backend.
- **Tailwind CSS**: Framework de CSS para estilos rápidos y responsivos.
- **Java Spring Boot**: Backend de la aplicación (ver repositorio [backend-reservas](https://github.com/alossada/backend-reservas)).

## 📁 Estructura del Proyecto

```
bacatapp/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## ⚙️ Configuración y Ejecución

### Prerrequisitos

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Pasos para ejecutar la aplicación

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/alossada/bacatapp.git
   cd bacatapp
   ```

2. **Instalar las dependencias:**

   ```bash
   npm install
   ```

3. **Ejecutar la aplicación:**

   ```bash
   npm start
   ```

   La aplicación estará disponible en: [http://localhost:3000](http://localhost:3000)

> **Nota:** Asegúrate de que el backend esté en ejecución en [http://localhost:8080](http://localhost:8080) para que la aplicación funcione correctamente.

## 📌 Funcionalidades

- Visualización de productos disponibles para reserva.
- Formulario para agregar nuevos productos (solo para administradores).
- Lista de productos con opciones para editar o eliminar (solo para administradores).
- Navegación fluida entre diferentes secciones de la aplicación.

## 🛠️ Próximas Mejoras

- Implementación de autenticación y autorización de usuarios.
- Validaciones más robustas en los formularios.
- Mejora en la gestión de errores y mensajes al usuario.
- Diseño responsivo para dispositivos móviles.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👩‍💻 Autor

- **Angélica Lossada** - [@alossada](https://github.com/alossada)
