import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";

// Punto de entrada de la app — acá es donde React arranca
// Busca el div con id="root" en el index.html y monta la app adentro
createRoot(document.getElementById("root")).render(
  // BrowserRouter habilita el sistema de rutas con React Router
  <BrowserRouter>

    {/* UserProvider da acceso al estado del usuario en toda la app */}
    <UserProvider>

      {/* OrderProvider da acceso al carrito en toda la app */}
      <OrderProvider>
        <App />
      </OrderProvider>

    </UserProvider>

  </BrowserRouter>
);
