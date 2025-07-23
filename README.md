Blockbuster Movie Store
Una aplicación web moderna y responsiva para la venta de películas, construida con React, Context API, Bootstrap y Styled-Components. Simula una tienda en línea de películas al estilo de Blockbuster, con autenticación de usuarios, carrito de compras, gestión de productos, búsqueda, filtrado, paginación y optimización SEO. Se integra con MockAPI para operaciones CRUD simuladas y ofrece un diseño responsivo para diferentes dispositivos.

Características
Autenticación de Usuarios: Sistema de login simulado usando AuthContext con credenciales predefinidas (admin/admin para administradores, user/user para usuarios regulares). Los datos del usuario se almacenan en sessionStorage.
Carrito de Compras: Gestionado con CartContext, permite agregar, eliminar, actualizar cantidades y vaciar el carrito, con persistencia en localStorage.
Gestión de Productos (Admin): Los administradores pueden crear, editar y eliminar películas usando un formulario integrado con MockAPI. Incluye validaciones para título, descripción (mínimo 10 caracteres) y precio (>0).
Búsqueda y Filtros: Barra de búsqueda para filtrar películas por título o descripción, y un desplegable para filtrar por categoría (Acción, Drama, Comedia, etc.).
Paginación: Muestra películas en páginas (12 por página) con botones de navegación para una experiencia fluida.
Diseño Responsivo: Usa el sistema de grillas de Bootstrap y Styled-Components para una interfaz adaptable y atractiva.
Optimización SEO: Implementa React Helmet para títulos y metadatos dinámicos que mejoran la visibilidad en motores de búsqueda.
Accesibilidad: Incluye etiquetas ARIA en elementos interactivos para mejorar la accesibilidad.
Notificaciones: Utiliza React Toastify para mensajes de éxito y error, mejorando la retroalimentación al usuario.
Animaciones: Incorpora animaciones sutiles (fade-in, scale-in, efectos de foco) usando keyframes de Styled-Components.
Sección de Película Destacada: Resalta una película en oferta obtenida desde MockAPI, mostrada en la página principal.
Tecnologías Utilizadas
React: Librería para construir la interfaz de usuario.
React Router: Gestiona la navegación entre páginas.
Context API: Maneja el estado global para autenticación y carrito.
Bootstrap: Proporciona un sistema de grillas y componentes responsivos.
Styled-Components: Para estilos modulares y reutilizables con animaciones.
React Helmet Async: Para optimización SEO con metadatos dinámicos.
React Toastify: Para notificaciones amigables.
React Icons: Para agregar íconos en botones y elementos interactivos.
MockAPI: Simula un backend para almacenar y gestionar datos de películas.
Vite: Herramienta de compilación rápida para desarrollo y producción.
Instalación
Prerrequisitos
Node.js (versión 16 o superior)
npm o yarn
Un navegador web moderno (Chrome, Firefox, Edge, etc.)
