# Ecommerce - Proyecto React

Este es mi proyecto de ecommerce para el curso. Simula una tienda de zapatillas, indumentaria y otros productos donde los usuarios pueden ver productos, agregarlos al carrito y hacer pedidos. Los administradores pueden gestionar los productos, categorías y usuarios desde un panel especial.

---

## Que hace la aplicación

- Muestra un catálogo de zapatillas con imagen, nombre, descripción y precio
- Cada producto tiene su página de detalle con todas las fotos y la opción de agregarlo al carrito
- El carrito aparece como un sidebar lateral y muestra todos los productos seleccionados con sus cantidades y el total
- Desde el sidebar se puede ir a una página de checkout que muestra un resumen antes de confirmar la compra
- Los usuarios se pueden registrar e iniciar sesión. Si cierran el navegador y vuelven, la sesión se mantiene
- Si el token vence el sistema avisa y redirige al login automáticamente
- Los administradores tienen acceso a un panel donde pueden crear, editar y eliminar productos, crear categorías y administrar usuarios

---

## Tecnologías que use

| Tecnología | Para qué la use |
|---|---|
| React 19 | Para armar toda la interfaz con componentes |
| Vite | Para levantar el proyecto y hacer el build |
| React Router v7 | Para navegar entre páginas sin recargar |
| Axios | Para hacer las llamadas a la API del backend |
| Bootstrap 5 | Para los estilos base y algunos componentes |
| React Hook Form | Para manejar los formularios con validación |
| SweetAlert2 | Para los mensajes y confirmaciones |
| Font Awesome | Para los iconos |
| Context API | Para compartir el estado del usuario y el carrito entre componentes |

El backend corre por separado con Node.js, Express y MongoDB.

---

## Estructura del proyecto

```
src/
├── assets/          # Imágenes
├── components/      # Componentes reutilizables
│   ├── banner/
│   ├── order-item/  # Item del carrito
│   ├── pagination/
│   ├── product-card/
│   ├── product-form/
│   └── table-product-row/
├── config/          # Configuración de axios, sweetalert, variables de entorno
├── context/         # OrderContext y UserContext (el estado global)
├── layout/          # Header, Footer, Sidebar del carrito
├── pages/
│   ├── admin/       # Panel admin (productos y usuarios)
│   ├── checkout/    # Página de confirmación de compra
│   ├── home/
│   ├── login/
│   ├── product-detail/
│   ├── products/
│   └── register/
└── App.jsx          # Rutas de la aplicación
```

---

## Como levantar el proyecto

Primero tenés que tener corriendo el backend. Después:

```bash
# Instalar dependencias
npm install

# Levantar en modo desarrollo
npm run dev
```

El proyecto queda corriendo en `http://localhost:5173`

Si querés cambiar la URL del backend, editá el archivo `src/config/env.config.js`.

---

## Funcionalidades principales

### Carrito de compras
El carrito vive en el `OrderContext`. Desde ahí se maneja todo: agregar productos, cambiar cantidades, eliminar items y calcular el total. Cuando se confirma una orden se manda al backend y el carrito se vacía solo.

### Login y sesión
Cuando el usuario se loguea, los datos se guardan en el `localStorage` para que no se pierdan al recargar. También tengo interceptores en axios que le agregan el token a todas las peticiones automáticamente y si el servidor devuelve un error 401 (sesión vencida), avisa al usuario y lo manda al login.

### Búsqueda de productos
Desde el header hay un ícono de lupa que despliega una barra de búsqueda. Al escribir un término y confirmar, la app navega a `/products?q=término` y filtra los productos por nombre, descripción o categoría. Se muestra la cantidad de resultados encontrados y un mensaje si no hay coincidencias.

### Panel de administración
Solo los usuarios con rol `admin` pueden ver los links del panel. Las rutas del admin están protegidas con un componente `AdminGuard` que redirige si el usuario no es admin. Desde el panel se pueden crear productos con hasta 4 fotos, crear categorías y cambiar el rol de los usuarios.

---

## Cosas que aprendí haciendo este proyecto

- Como usar el Context API para no tener que pasar props por todos lados
- Como manejar autenticación con tokens JWT desde el frontend
- Como subir archivos con Multer y mostrar imágenes desde el backend
- Como proteger rutas según el rol del usuario
- Como paginar resultados de una API

---

## Aclaración

Las imágenes utilizadas son solo con fines educativos.
No representan una tienda real.

## Autor

Ivan - Curso Frontend
