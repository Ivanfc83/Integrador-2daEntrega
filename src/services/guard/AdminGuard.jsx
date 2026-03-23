import { Navigate, Outlet } from "react-router-dom";
import useUser from "../../context/useUser";

// Este componente protege las rutas que son solo para administradores
// Si no hay usuario logueado, manda al login
// Si hay usuario pero no es admin, manda al home
function AdminGuard() {

  const { isAdmin, user } = useUser();

  // Si no está logueado, no puede entrar — lo mando al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si está logueado pero no es admin, lo mando al home
  // Outlet renderiza las rutas hijas si pasa el chequeo
  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminGuard;
