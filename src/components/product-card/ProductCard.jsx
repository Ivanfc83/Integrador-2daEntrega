import "./ProductCard.css";
import { NavLink } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";



function ProductCard({ product }) {



  return (
    <div className="product-card">
      <div className="product-image">
        <img src={ product?.image } alt={product?.name} />
        <NavLink to={ `/product/${ product?.id }` } className="view-detail" >
          <FontAwesomeIcon icon={ faEye } />
        </NavLink>
      </div>

      <div className="product-info">
        <h4 className="product-name">{ product?.name }</h4>
        <p className="product-description">{ product?.description }</p>

        {product?.category && (
          <h4 className="card-category">{ product?.category }</h4>
        )}

        {product?.createdAt &&
        ( <span className="card-date">
          { FormartISODateToLocal(product.createdAt) }
          </span>
        )}

        <div className="product-price">
          {/* Mostrar precio anterior si existe y es mayor */}

          { Number(product?.oldPrice) > Number(product?.price) ? (
            <span className="old-price"> ${ product?.oldPrice } </span>
          ) : null }

          <span className="current-price"> $ { product?.price } </span>
        </div>

        <button className="btn-add">Añadir al carrito</button>

      </div>

    </div>
  )
}

export default ProductCard;
