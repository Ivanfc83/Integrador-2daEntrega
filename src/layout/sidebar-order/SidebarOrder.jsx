import userOrder from "../../context/userOrder";
import OrderItem from "../../components/order-item/OrderItem";
import "./SiderbarOrder.css";

// Sidebar del carrito de compras que se desliza desde la derecha
// Se abre y cierra con el icono de la bolsa en el header
function SidebarOrder() {

  const {
    sidebarToggle,
    toggleSidebar,
    items,
    totalPrice,
    createOrder,
    user,
  } = userOrder();

  // Cuando sidebarToggle es true, agrego la clase "active"
  // que en el CSS hace el deslizamiento hacia adentro
  const sidebarClass = sidebarToggle ? "active" : "";

  return (
    // Click en el fondo oscuro cierra el sidebar
    <div
      className={`sidebar-order-container ${sidebarClass}`}
      onClick={toggleSidebar}
    >
      {/* Detengo la propagación del click para que los
          clicks dentro del sidebar no lo cierren */}
      <div
        className="siderbar-order-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Carrito de Compras</h2>

        {/* Lista de productos agregados al carrito */}
        <div className="order-container">
          {items.length === 0 && (
            <p>No hay elementos en el carrito</p>
          )}

          {items.length > 0 &&
            items.map((item) => (
              <OrderItem key={item._id} item={item} />
            ))}
        </div>

        {/* Total y botón para finalizar — el botón se desactiva
            si no hay items o si el usuario no está logueado */}
        <div className="order__total">
          <button
            className="btn btn-primary"
            onClick={createOrder}
            disabled={!user || items.length === 0}
          >
            Finalizar compra
          </button>
          <h3>Total: ${totalPrice}</h3>
        </div>
      </div>
    </div>
  );
}

export default SidebarOrder;
