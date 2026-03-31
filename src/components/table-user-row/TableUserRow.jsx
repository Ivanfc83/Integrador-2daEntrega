import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormartISODateToLocal } from "../../utils/FormatDate";

// Fila de la tabla de usuarios en el panel de administración
// Recibe el usuario, la función para eliminarlo y la función para editarlo
function TableUserRow({ user, deleteUser, setEditUser }) {

  // Si el usuario no tiene foto de perfil, uso el servicio dicebear
  // para generar un avatar automático a partir de su nombre
  const avatarUrl =
    user.image ||
    `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`;

  return (
    <>
      <tr>
        {/* Foto de perfil o avatar generado automáticamente */}
        <td className="imagen-user-cell">
          <img src={avatarUrl} alt={user.name} />
        </td>

        {/* Nombre completo */}
        <td className="name-user-cell">{user.name}</td>

        {/* Email */}
        <td className="email-user-cell">{user.email}</td>

        {/* Fecha de nacimiento — la devuelve el backend directamente */}
        <td className="bornDate-user-cell">{user.bornDate}</td>

        {/* País */}
        <td className="country-user-cell">{user.country}</td>

        {/* Fecha en que se registró — la formateo con la función de utils */}
        <td className="date-user-cell">
          {FormartISODateToLocal(user.createdAt)}
        </td>

        {/* Botones de acción: editar y eliminar */}
        <td className="buttons-user-cell">
          <div className="action-user-cell">
            {/* Al hacer clic mando el usuario completo para que el form lo cargue */}
            <button
              className="btn btn-one"
              onClick={() => setEditUser(user)}
              title="Editar"
            >
              <FontAwesomeIcon icon={faPen} />
            </button>

            <button
              className="btn btn-two"
              onClick={() => deleteUser(user._id, user.name)}
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
