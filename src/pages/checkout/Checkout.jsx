import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import userOrder from "../../context/userOrder";
import useUser from "../../context/useUser";
import { FILES } from "../../config/env.config";

// Página de checkout — muestra el resumen de la compra antes de confirmar
// Es como el carrito expandido con todos los detalles visibles
function Checkout() {

  const { items, totalItems, totalPrice, changeQuantity, removeItem, createOrder, clearCart } = userOrder();
  const { user } = useUser();
  const navigate = useNavigate();

  // Cuando confirma la compra, creo la orden y lo mando al home
  async function handleConfirm() {
    await createOrder();
    navigate("/");
  }

  // Si el carrito está vacío, muestro un mensaje con botón para ir a productos
  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Tu carrito está vacío</h2>
        <p>Todavía no agregaste ningún producto al carrito.</p>
        <button className="btn-checkout-primary" onClick={() => navigate("/products")}>
          Ver productos
        </button>
      </div>
    );
  }

  return (
    <main className="checkout-page">

      {/* Título de la página */}
      <div className="checkout-header">
        <h1>Resumen de tu compra</h1>
        <p>{totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito</p>
      </div>

      <div className="checkout-layout">

        {/* Columna izquierda — lista de productos */}
        <div className="checkout-items">

          {/* Encabezado de la tabla — solo en desktop */}
          <div className="checkout-table-head">
            <span>Producto</span>
            <span>Precio unitario</span>
            <span>Cantidad</span>
            <span>Subtotal</span>
            <span></span>
          </div>

          {/* Un item por cada producto en el carrito */}
          {items.map((item) => (
            <div key={item._id} className="checkout-item">

              {/* Imagen y nombre del producto */}
              <div className="checkout-item-product">
                <img
                  src={`${FILES}/products/${item.image1}`}
                  alt={item.name}
                  className="checkout-item-img"
                  onError={(e) => { e.target.src = "https://placehold.co/80x80?text=Sin+Imagen"; }}
                />
                <div className="checkout-item-info">
                  <p className="checkout-item-name">{item.name}</p>
                  {item.category?.name && (
                    <span className="checkout-item-category">{item.category.name}</span>
                  )}
                </div>
              </div>

              {/* Precio unitario */}
              <div className="checkout-item-price">
                <span className="checkout-label">Precio:</span>
                ${Number(item.price).toLocaleString("es-AR")}
              </div>

              {/* Controles de cantidad */}
              <div className="checkout-item-qty">
                <span className="checkout-label">Cantidad:</span>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => changeQuantity(item._id, "subtract")}
                  >
                    −
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => changeQuantity(item._id, "add")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Subtotal de ese producto */}
              <div className="checkout-item-subtotal">
                <span className="checkout-label">Subtotal:</span>
                <strong>${(Number(item.price) * item.quantity).toLocaleString("es-AR")}</strong>
              </div>

              {/* Botón para eliminar ese producto del carrito */}
              <button
                className="checkout-item-remove"
                onClick={() => removeItem(item._id)}
                title="Eliminar del carrito"
              >
                ✕
              </button>

            </div>
          ))}

          {/* Botón para vaciar todo el carrito */}
          <div className="checkout-clear">
            <button className="btn-clear-cart" onClick={clearCart}>
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Columna derecha — resumen del pedido */}
        <div className="checkout-summary">
          <h2>Resumen del pedido</h2>

          {/* Detalle de cada producto en el resumen */}
          <div className="summary-items">
            {items.map((item) => (
              <div key={item._id} className="summary-line">
                <span>{item.name} × {item.quantity}</span>
                <span>${(Number(item.price) * item.quantity).toLocaleString("es-AR")}</span>
              </div>
            ))}
          </div>

          <div className="summary-divider" />

          {/* Total final */}
          <div className="summary-total">
            <span>Total</span>
            <strong>${Number(totalPrice).toLocaleString("es-AR")}</strong>
          </div>

          {/* Datos del comprador si está logueado */}
          {user && (
            <div className="summary-user">
              <p><strong>Comprador:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          )}

          {/* Botones de acción */}
          <div className="summary-actions">
            <button
              className="btn-checkout-primary"
              onClick={handleConfirm}
              disabled={!user || items.length === 0}
            >
              Confirmar compra
            </button>

            {!user && (
              <p className="checkout-login-hint">
                Necesitás <button className="btn-link" onClick={() => navigate("/login")}>iniciar sesión</button> para confirmar la compra
              </p>
            )}

            <button className="btn-checkout-secondary" onClick={() => navigate("/products")}>
              Seguir comprando
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}

export default Checkout;
