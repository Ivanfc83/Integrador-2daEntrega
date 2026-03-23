import ShowSwalToast from "../config/Swal.fire";
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2"; // Lo uso para el diálogo de sesión expirada
import { useNavigate } from "react-router-dom";
import api from "../config/api.config";

// Creo el contexto que van a compartir todos los componentes
// que necesiten saber si hay un usuario logueado o no
const UserContext = createContext();

// Este componente envuelve toda la app para que cualquier hijo
// pueda acceder al estado del usuario desde cualquier parte
function UserProvider({ children }) {
  const navigate = useNavigate();

  // Intento recuperar el usuario y token del localStorage
  // para que al recargar la página no se pierda la sesión
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAdmin, setIsAdmin] = useState(
    JSON.parse(localStorage.getItem("user"))?.role === "admin" || false,
  );

  // Cada vez que cambia el usuario o el token,
  // los guardo en localStorage para persistir la sesión
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Si no hay usuario (por ejemplo, hizo logout), limpio todo
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isAdmin");
    }
  }, [user, token, isAdmin]);

  // Función de login: manda email y password a la API
  // y si está bien guarda los datos del usuario en el estado
  async function login(userData) {
    try {
      const response = await api.post(`/login`, userData);

      const { user, token } = response.data;

      setUser(user);
      setToken(token);
      setIsAdmin(user.role === "admin");

      ShowSwalToast("Bienvenido", "Has iniciado sesión correctamente");

      // Redirijo al home después del login exitoso
      navigate("/");
    } catch (error) {
      // Si el login falla (contraseña incorrecta, usuario no existe, etc.)
      const mensaje =
        error?.response?.data?.message || "Credenciales incorrectas";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Función de logout: limpia todos los estados del usuario
  function logout() {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  }

  // Este efecto configura los interceptores de axios
  // Los interceptores son como "middlewares" que se ejecutan
  // antes de cada request y después de cada response
  useEffect(() => {

    // Interceptor de REQUEST: agrega el token en el header de cada petición
    // para que el backend sepa que el usuario está autenticado
    const interceptorRequest = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = token;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    // Interceptor de RESPONSE: maneja errores globales
    // El caso más común es el 401 que significa sesión expirada
    const interceptorResponse = api.interceptors.response.use(
      (response) => response, // Si todo va bien, dejo pasar la respuesta
      (error) => {
        if (error?.response?.status === 401) {
          // El token expiró o es inválido, aviso al usuario y lo mando al login
          Swal.fire({
            icon: "error",
            title: "Sesión expirada",
            text: "Tu sesión ha expirado. Por favor, iniciá sesión nuevamente.",
            showConfirmButton: true,
            confirmButtonText: "Iniciar sesión",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login");
            }
            logout();
          });

          // Devuelvo una promesa que nunca se resuelve para cortar la cadena de errores
          return new Promise(() => {});
        } else {
          // Para cualquier otro error lo dejo pasar normalmente
          return Promise.reject(error);
        }
      },
    );

    // Cuando el componente se desmonta o cambia el token,
    // elimino los interceptores para no duplicarlos
    return () => {
      api.interceptors.request.eject(interceptorRequest);
      api.interceptors.response.eject(interceptorResponse);
    };
  }, [token]);

  // Expongo lo que van a necesitar los demás componentes
  return (
    <UserContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
