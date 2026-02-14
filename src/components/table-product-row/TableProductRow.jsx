import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";
import { Link, NavLink } from "react-router-dom";

function TableProductRow({ product, deleteProduct, setEditProduct }) {



  return (
    <>
      <tr key={product.id}>
        {/* Imagen */}
        <td className="imagen-icon">

          <NavLink to={`/product/${product.id}`} className='product-link'>
          <img src={product.image} alt={product.name} style={{ cursor: 'pointer' }}/>
          </NavLink>

        </td>

        {/* Nombre */}
        <td className="name-cell">{product.name}</td>

        {/* Descripción */}
        <td className="description-cell">
          <p className="text-clamp">{product.description}</p>
        </td>

        {/* Fecha */}
        <td className="date-cell">
          { FormartISODateToLocal(product.createdAt) }
        </td>

        {/* Precio */}
        <td className="price-cell"> {product.price} </td>

        {/* Botones */}
        <td className="buttons-cell">
          <div className="action-button" title="Editar">
            {/* Botón Editar */}
            <button
            className="btn btn-one"
            onClick={() => setEditProduct(product)}
            title="Editar"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            {/* Botón Eliminar */}
            <button
              className="btn btn-two"
              onClick={() => deleteProduct(product.id, product.name)}
              title="Eliminar"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default TableProductRow;
