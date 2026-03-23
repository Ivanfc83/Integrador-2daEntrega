import { useContext } from "react";
import { OrderContext } from "./OrderContext";

// Hook para acceder al contexto del carrito de compras
// Lo uso en cualquier componente que necesite agregar productos,
// ver el total, o controlar el sidebar del carrito
function userOrder() {
  const context = useContext(OrderContext);

  // Si se usa fuera del OrderProvider, lo aviso con un error claro
  if (!context) {
    throw new Error("userOrder debe utilizarse dentro de un OrderProvider");
  }

  return context;
}

export default userOrder;
