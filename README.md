# 🎬 Blockbuster App - Tienda de Películas

¡Bienvenido a **Blockbuster App**!  
Una aplicación web creada con **React + Vite** que simula una tienda de alquiler y compra de películas con funcionalidades de carrito, panel de administración, autenticación y diseño responsive.

---

Características

Carrito de Compras: Gestionado con CartContext, permite agregar, eliminar, actualizar cantidades y vaciar el carrito, con persistencia en localStorage.
Gestión de Productos (Admin): Los administradores pueden crear, editar y eliminar películas usando un formulario integrado con MockAPI. Incluye validaciones para título, descripción (mínimo 10 caracteres) y precio (>0).


Notificaciones: Utiliza React Toastify para mensajes de éxito y error, mejorando la retroalimentación al usuario.
Animaciones: Incorpora animaciones sutiles (fade-in, scale-in, efectos de foco) usando keyframes de Styled-Components.



## 🚀 Características

- 🛍️ **Compra de Películas:** agrega al carrito y finaliza la compra ficticia.
- 🔐 **Autenticación simple:** Sistema de login simulado usando AuthContext con credenciales predefinidas. Los datos del usuario se almacenan en sessionStorage.Login para usuarios comunes (`user/user`) y administradores (`admin/admin`).
- 🛠️ **Panel de Admin:** agregar, editar y eliminar películas desde el frontend. Ademas utiliza React Toastify para mensajes de éxito y error, mejorando la retroalimentación al usuario.
- 🔍 **Buscador y filtros por categoría:** Barra de búsqueda para filtrar películas por título o descripción, y un desplegable para filtrar por categoría (Acción, Drama, Comedia, etc.).
- 🧑 **Listado de actores, descripción y detalles.**
- 📱 **Diseño Responsive:** Usa el sistema de grillas de Bootstrap y Styled-Components para una interfaz adaptable y atractiva. Optimizado para móviles y pantallas grandes. Incorpora animaciones sutiles (fade-in, scale-in, efectos de foco) usando keyframes de Styled-Components.
- 🍿 **Película destacada:** se muestra automáticamente al cargar la página.
- 🧠 **SEO dinámico:** usando `react-helmet-async`para títulos y metadatos dinámicos que mejoran la visibilidad en motores de búsqueda. Ademas incluye etiquetas ARIA en elementos interactivos para mejorar la accesibilidad
- 📦 **MockAPI como backend simulado.**
- **Sección de Película Destacada:** Resalta una película en oferta obtenida desde MockAPI, mostrada en la página principal. 

---

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/adamcastro13/blockbuster-movie-store
cd blockbuster-app
```
## Instalar dependencias

```bash
npm install
```
Si da conflicto con versiones o permisos:

```bash
npm install --force
```
Scrips disponibles
| Comando           | Acción                                    |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Inicia la app en modo desarrollo          |
| `npm run build`   | Compila la app para producción            |
| `npm run preview` | Previsualiza la versión compilada         |
| `npm run lint`    | Corre ESLint en todos los archivos JS/JSX |

Tecnologías utilizadas
## React 19 + Vite
## React Router v7
## React Toastify
## Styled Components
## Bootstrap 5.3
## MockAPI como backend simulado
## React Helmet Async para SEO

🔐 Credenciales de acceso
Admin:
Usuario: admin
Contraseña: admin

Usuario común:
Usuario: user
Contraseña: user

🧠Autor:
Desarrollado por Adam Castro

📄 Licencia
Este proyecto es solo para fines educativos. No comercial.
