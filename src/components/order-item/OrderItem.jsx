import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./OrderItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userOrder from "../../context/userOrder";
import { FILES } from "../../config/env.config";

// Muestra un producto individual dentro del carrito lateral
// Recibe el item (producto + cantidad) como prop
function OrderItem({ item }) {

  // Necesito changeQuantity para los botones + y -
  // y removeItem para el botón de eliminar
  const { changeQuantity, removeItem } = userOrder();

  return (
    <div className="order__item">

      {/* Imagen del producto — usa image1 que es como lo guarda el backend */}
      <div className="order__img">
        <img src={`${FILES}/products/${item.image1}`} alt={item.name} />
      </div>

      {/* Nombre, precio y controles de cantidad */}
      <div className="order__info">
        <h3 className="order__name">{item.name}</h3>

        {/* Solo muestro el subtotal: precio unitario × cantidad */}
        {/* Uso Number() para asegurarme que la multiplicación sea matemática */}
        <p className="order__price">
          ${(parseFloat(item.price) || 0).toLocaleString("es-AR")} × {item.quantity} = <strong>${((parseFloat(item.price) || 0) * item.quantity).toLocaleString("es-AR")}</strong>
        </p>

        {/* Botones para aumentar o disminuir la cantidad */}
        <div className="order__qty">
          <button
            className="order__qty-btn"
            onClick={() => changeQuantity(item._id, "subtract")}
          >
            -
          </button>
          <span className="order__qty-number">{item.quantity}</span>
          <button
            className="order__qty-btn"
            onClick={() => changeQuantity(item._id, "add")}
          >
            +
          </button>
        </div>
      </div>

      {/* Botón para eliminar el producto del carrito */}
      <div className="order__action">
        <button
          className="order__action-btn"
          onClick={() => removeItem(item._id)}
          title="Eliminar del carrito"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default OrderItem;
