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

  // Cada vez que cambia el usuario o el token los guardo en localStorage
  // así cuando recargo la página no pierdo la sesión
  useEffect(() => {
    if (user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      // Si no hay usuario (por ejemplo hizo logout) limpio todo
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

      // Mando al home después de entrar
      navigate("/");
    } catch (error) {
      // Si el login falla muestro el mensaje de error que manda el backend
      const mensaje =
        error?.response?.data?.message || "Credenciales incorrectas";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Limpia todos los datos del usuario cuando hace logout
  function logout() {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
  }

  // Acá configuro los interceptores de axios
  // Son funciones que se ejecutan antes y después de cada llamada a la API
  // así no tengo que repetir el token en cada petición ni manejar el 401 en cada catch
  useEffect(() => {

    // Cada vez que se hace una petición le agrego el token en el header
    // Si no lo pongo el backend no sabe quién soy y me rechaza
    const interceptorRequest = api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = token;
      } else {
        delete config.headers.Authorization;
      }
      return config;
    });

    // Acá manejo los errores que vienen del servidor
    // Si llega un 401 significa que la sesión venció o el token no sirve más
    const interceptorResponse = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          // Aviso al usuario que su sesión se terminó y lo mando al login
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

          // Devuelvo una promesa vacía para que no siga tirando errores en los otros catch
          return new Promise(() => {});
        } else {
          return Promise.reject(error);
        }
      },
    );

    // Cuando cambia el token limpio los interceptores viejos
    // para no terminar con varios registrados al mismo tiempo
    return () => {
      api.interceptors.request.eject(interceptorRequest);
      api.interceptors.response.eject(interceptorResponse);
    };
  }, [token]);

  // Comparto con el resto de la app lo que necesitan
  return (
    <UserContext.Provider value={{ user, token, login, logout, isAdmin }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
