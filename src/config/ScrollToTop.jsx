import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Cada vez que el usuario navega a una página nueva,
// este componente vuelve el scroll al principio automáticamente
// Lo puse en App.jsx para que funcione en toda la app
function ScrollToTop() {

  // pathname cambia cada vez que se navega a otra ruta
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // Solo se ejecuta cuando cambia la ruta

  // No renderiza nada visible, solo tiene el efecto de scroll
  return null;
}

export default ScrollToTop;
