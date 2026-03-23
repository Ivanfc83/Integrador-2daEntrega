import axios from "axios";
import { API_URL } from "./env.config";

// Creo una instancia de axios con la URL base del backend
// Así en el resto de los archivos solo escribo "/products" o "/users"
// en vez de poner la URL completa cada vez
const api = axios.create({
  baseURL: API_URL,
});

export default api;
