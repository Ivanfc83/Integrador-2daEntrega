// Leo las variables de entorno del archivo .env
// Vite las expone con el prefijo VITE_ para que sean accesibles en el cliente
const { VITE_SERVER_URL, VITE_FILES_URL } = import.meta.env;

// URL base del servidor backend (para las peticiones a la API)
export const API_URL = VITE_SERVER_URL;

// URL base del servidor de archivos estáticos (imágenes de productos y usuarios)
export const FILES = VITE_FILES_URL;
