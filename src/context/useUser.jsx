import { useContext } from "react";
import { UserContext } from "./userContext";

// Hook personalizado para acceder al contexto de usuario
// En vez de importar useContext y UserContext en cada componente,
// uso este hook y queda más limpio
function useUser() {
  const context = useContext(UserContext);

  // Si alguien intenta usarlo fuera del UserProvider, lanzo un error
  // para que sea fácil de detectar durante el desarrollo
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }

  return context;
}

export default useUser;
