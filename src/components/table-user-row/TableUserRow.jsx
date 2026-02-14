import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";

function TableUserRow({ user, deleteUser }) {

  return (
    <>
      <tr key={user.id}>
        {/* Imagen */}
        <td className="imagen-user-cell">
          <img
          src={user.image || `https://www.google.com/search?q=https://api.dicebear.com/7.x/avataaars/svg%3Fseed%3D${user.name}`}
          alt={user.name} />
        </td>

        {/* Nombre */}
        <td className="name-user-cell">{user.name}</td>

        {/* Email */}
        <td className="email-user-cell">{user.email}</td>

        {/* Fecha de Nacimiento */}
        <td className="bornDate-user-cell">{user.bornDate}</td>

        {/* País */}
        <td className="country-user-cell"> {user.country} </td>

        {/* Fecha de Registro */}
        <td className="date-user-cell">{ FormartISODateToLocal(user.createdAt) }</td>

        {/* Botones */}
        <td className="buttons-user-cell">
          <div className="action-user-cell" title="Eliminar">
            {/* Botón Eliminar */}
            <button className="btn btn-two"
            onClick={() => deleteUser(user.id, user.name)}
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

export default TableUserRow;
