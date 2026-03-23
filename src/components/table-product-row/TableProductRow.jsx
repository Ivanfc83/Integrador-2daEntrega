import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";
import { NavLink } from "react-router-dom";
import { FILES } from "../../config/env.config";

// Fila de la tabla de productos en el panel de administración
// Recibe el producto y las funciones para editar y borrar
function TableProductRow({ product, deleteProduct, setEditProduct }) {

  return (
    <>
      <tr>
        {/* Imagen clickeable que lleva al detalle del producto */}
        <td className="imagen-icon">
          <NavLink to={`/product/${product._id}`} className="product-link">
            <img
              src={`${FILES}/products/${product.image}`}
              alt={product.name}
              style={{ cursor: "pointer" }}
            />
          </NavLink>
        </td>

        {/* Nombre del producto */}
        <td className="name-cell">{product.name}</td>

        {/* Descripción — en el CSS se corta con puntos suspensivos si es muy larga */}
        <td className="description-cell">
          <p className="text-clamp">{product.description}</p>
        </td>

        {/* Fecha formateada con la función de utils */}
        <td className="date-cell">
          {FormartISODateToLocal(product.createdAt)}
        </td>

        {/* Precio del producto */}
        <td className="price-cell">{product.price}</td>

        {/* Botones de acciones: editar y eliminar */}
        <td className="buttons-cell">
          <div className="action-button">

            {/* Al clickear editar, cargo este producto en el formulario */}
            <button
              className="btn btn-one"
              onClick={() => setEditProduct(product)}
              title="Editar"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            {/* Al clickear borrar, llamo a la función que confirma antes de eliminar */}
            <button
              className="btn btn-two"
              onClick={() => deleteProduct(product._id, product.name)}
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
