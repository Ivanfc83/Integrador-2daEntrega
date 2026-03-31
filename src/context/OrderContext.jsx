import { createContext, useState } from "react";
import ShowSwalToast from "../config/Swal.fire";
import useUser from "./useUser";
import api from "../config/api.config";

// Creo el contexto del carrito de compras
// Desde acá voy a manejar todo lo que tiene que ver con los pedidos
const OrderContext = createContext();

function OrderProvider({ children }) {

  // Traigo el usuario del contexto de autenticación
  // lo necesito para saber si puede hacer un pedido
  const { user } = useUser();

  // Lista de productos que hay en el carrito
  const [items, setItems] = useState([]);

  // Controla si el sidebar del carrito está abierto o cerrado
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // Calculo los totales directo del array — sin useEffect para evitar
  // problemas de timing donde el estado se lee antes de actualizarse
  let totalItems = 0;
  let totalPrice = 0;
  for (const item of items) {
    const price = parseFloat(item.price) || 0;
    const qty = parseInt(item.quantity) || 0;
    totalPrice += price * qty;
    totalItems += qty;
  }

  // Agrega un producto al carrito
  // Si ya estaba, le suma 1 a la cantidad en vez de duplicarlo
  function addItem(product) {
    const yaEstaEnCarrito = items.some((item) => item._id === product._id);

    if (yaEstaEnCarrito) {
      setItems((prev) =>
        prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // Me aseguro de que el precio sea número y no string
      // Si llega como string "25000", Number() lo convierte a 25000
      // para que la suma sea matemática y no concatenación de texto
      setItems((prev) => [...prev, { ...product, price: parseFloat(product.price) || 0, quantity: 1 }]);
    }
  }

  // Cambia la cantidad de un producto ya en el carrito
  // "add" suma 1, "subtract" resta 1 (mínimo 1)
  function changeQuantity(productId, operation) {
    setItems((prev) =>
      prev.map((item) => {
        if (item._id !== productId) return item;
        if (operation === "add") return { ...item, quantity: item.quantity + 1 };
        if (operation === "subtract" && item.quantity > 1)
          return { ...item, quantity: item.quantity - 1 };
        return item;
      })
    );
  }

  // Elimina un producto del carrito por su ID
  function removeItem(productId) {
    setItems((prev) => prev.filter((item) => item._id !== productId));
  }

  // Envía el pedido al backend con todos los productos del carrito
  async function createOrder() {
    try {
      // Por las dudas, verifico que haya usuario antes de intentar crear la orden
      if (!user) return;

      // Armo el array de productos con solo los campos que necesita el backend
      const products = items.map((item) => ({
        price: item.price,
        quantity: item.quantity,
        product: item._id,
      }));

      const order = {
        products,
        user: user._id,
        totalPrice,
      };

      // Mando la orden al servidor, se crea
      await api.post(`/orders`, order);

      // Solo el admin puede traer todas las órdenes — el cliente no tiene permiso
      // por eso lo pongo aparte con su propio try/catch para que no rompa el flujo
      if (user.role === "admin") {
        try {
          const ordenes = await api.get(`/orders`);
          console.log("Órdenes creadas:", ordenes.data);
        } catch {
          // Si falla el GET de órdenes, no interrumpo la compra
        }
      }

      ShowSwalToast("Tu orden ha sido creada exitosamente", "Orden creada");

      // Limpio el carrito después de la compra
      setItems([]);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "Por favor, intentá nuevamente";
      ShowSwalToast(
        "Hubo un error al crear la orden",
        mensaje,
        "error"
      );
    }
  }

  // Vacía el carrito por completo — el profe lo pidió como clearCart/emptyCart
  function clearCart() {
    setItems([]);
  }

  // Abre o cierra el sidebar del carrito
  function toggleSidebar() {
    setSidebarToggle((prev) => !prev);
  }

  // Comparto todo lo que necesitan los componentes hijos
  return (
    <OrderContext.Provider
      value={{
        sidebarToggle,
        toggleSidebar,
        items,
        addItem,
        changeQuantity,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
        createOrder,
        user,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export { OrderContext, OrderProvider };
