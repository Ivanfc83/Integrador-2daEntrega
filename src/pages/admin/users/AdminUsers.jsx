import { useEffect, useState } from "react";
import ShowSwalToast from "../../../config/Swal.fire";
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../../../config/env.config";
import TableUserRow from "../../../components/table-user-row/TableUserRow";
import "./AdminUser.css";

function AdminUsers() {
  // ========================================
  // ESTADO PARA USUARIOS
  // ========================================
  const [users, setUsers] = useState([]);

  // useEffect: se ejecuta al montar el componente
  useEffect(() => {
    getUsers();
  }, []);

  // ========================================
  // OBTENER USUARIOS DE LA API
  // ========================================
  async function getUsers() {
    try {
      const response = await axios.get(`${API}/users`);

      console.log("Usuarios obtenidos:", response.data);

      setUsers(response.data);

    } catch (error) {
      console.log(error);

      ShowSwalToast("Error", "Error al obetener el usuario", "error");
    }
  }

  // ========================================
  // ELIMINAR USUARIO
  // ========================================

  function deleteUser(id, name) {
    Swal.fire({
      title: `Estás seguro de eliminar a ${name}`,
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f64504",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${API}/users/${id}`);

          ShowSwalToast("Eliminando", "Usuario eliminado.");

          //Actualizar la lista
          getUsers();

        } catch (error) {
          console.log(error);

          ShowSwalToast("Error", "No se pudo eliminar el usuario.", "error");
        }
      }
    });
  }


  return (
    <>
      <div className="admin-users-page">
        <div className="title-users">
          <h2>Panel de Administración de Usuarios</h2>
        </div>

        <div className="admin-users-container">
          <div className="table-wrapper">
            <table className="table">
              <thead>
                <tr>
                  <th className="imagen-user-cell">Imagen</th>
                  <th className="name-user-cell">Nombre</th>
                  <th className="email-user-cell">Email</th>
                  <th className="bornDate-user-cell">Fecha de Nacimiento</th>
                  <th className="country-user-cell">País</th>
                  <th className="date-user-cell">Fecha de registro</th>
                  <th className="buttons-user-cell">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <TableUserRow
                    key={user.id}
                    user={user}
                    deleteUser={deleteUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
