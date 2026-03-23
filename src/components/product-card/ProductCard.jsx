import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";
import userOrder from "../../context/userOrder";
import { FILES } from "../../config/env.config";

// Tarjeta de producto — se usa tanto en el home como en la página de productos
// Recibe un producto como prop y muestra su info resumida
function ProductCard({ product }) {

  // Necesito addItem para agregar al carrito
  // y toggleSidebar para abrir el sidebar automáticamente al agregar
  const { addItem, toggleSidebar } = userOrder();

  return (
    <div className="product-card">

      {/* Imagen con link al detalle del producto */}
      <div className="product-image">
        <img
          src={`${FILES}/products/${product?.image}`}
          alt={product?.name}
        />
        {/* Icono de ojo que aparece al pasar el mouse — va al detalle */}
        <NavLink to={`/product/${product?._id}`} className="view-detail">
          <FontAwesomeIcon icon={faEye} />
        </NavLink>
      </div>

      {/* Info del producto: nombre, descripción, categoría, fecha y precio */}
      <div className="product-info">
        <h4 className="product-name">{product?.name}</h4>
        <p className="product-description">{product?.description}</p>

        {/* La categoría puede venir como objeto o como string */}
        {product?.category && (
          <h4 className="card-category">
            {product?.category.name || "Sin Categoría"}
          </h4>
        )}

        {/* Fecha de carga del producto — la formateo con la función de utils */}
        {product?.createdAt && (
          <span className="card-date">
            {FormartISODateToLocal(product?.createdAt)}
          </span>
        )}

        {/* Precio — si tiene precio anterior lo muestro tachado arriba */}
        <div className="product-price">
          {Number(product?.oldPrice) > Number(product?.price) ? (
            <span className="old-price">${product?.oldPrice}</span>
          ) : null}
          <span className="current-price">${product?.price}</span>
        </div>

        {/* Al agregar al carrito abro el sidebar para que el usuario lo vea */}
        <button
          className="btn-add"
          onClick={() => {
            addItem(product);
            toggleSidebar();
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
