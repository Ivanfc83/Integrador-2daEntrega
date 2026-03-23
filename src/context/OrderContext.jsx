import { createContext, useEffect, useState } from "react";
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

  // Cantidad total de productos (sumando las cantidades de cada uno)
  const [totalItems, setTotalItems] = useState(0);

  // Precio total del carrito
  const [totalPrice, setTotalPrice] = useState(0);

  // Controla si el sidebar del carrito está abierto o cerrado
  const [sidebarToggle, setSidebarToggle] = useState(false);

  // Cada vez que cambia el carrito, recalculo los totales
  useEffect(() => {
    let precioTotal = 0;
    let cantidadTotal = 0;

    for (let item of items) {
      precioTotal += item.quantity * item.price;
      cantidadTotal += item.quantity;
    }

    setTotalItems(cantidadTotal);
    setTotalPrice(precioTotal);
  }, [items]);

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
      // Agrego el producto con cantidad 1 por defecto
      setItems((prev) => [...prev, { ...product, quantity: 1 }]);
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

      //Trae todas las órdenes y las muestra por consola
      const ordenes = await api.get(`orders`);
      console.log("Órdenes creadas:", ordenes.data);

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
