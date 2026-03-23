import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ShowSwalToast from "../../../config/Swal.fire";
import api from "../../../config/api.config";
import Swal from "sweetalert2";
import TableUserRow from "../../../components/table-user-row/TableUserRow";
import "./AdminUser.css";

function AdminUsers() {

  // Lista de usuarios que voy a mostrar en la tabla
  const [users, setUsers] = useState([]);

  // Si editUser tiene un objeto, el form está en modo edición
  // Si es null, estamos creando un usuario nuevo
  const [editUser, setEditUser] = useState(null);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Cuando se abre esta página, cargo los usuarios automáticamente
  useEffect(() => {
    getUsers();
  }, []);

  // Cuando cambia el usuario a editar, cargo sus datos en el formulario
  useEffect(() => {
    if (editUser) {
      setValue("name", editUser.name);
      setValue("email", editUser.email);
      setValue("bornDate", editUser.bornDate || "");
      setValue("country", editUser.country || "");
      setValue("role", editUser.role || "client");
      // La contraseña no la pre-cargo por seguridad
    } else {
      // Si se cancela la edición, limpio el formulario
      reset();
    }
  }, [editUser, setValue, reset]);

  // Pido la lista de usuarios al backend
  async function getUsers() {
    try {
      const response = await api.get(`/users`);
      setUsers(response.data);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo cargar la lista de usuarios";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Manejo el envío del formulario — puede ser creación o edición
  async function submitUser(data) {
    try {
      if (editUser) {
        // Modo edición: armo el objeto solo con los campos que cambiaron
        // Si no ingresó contraseña, no la mando (para no pisarla)
        const updatedData = {
          name: data.name,
          email: data.email,
          bornDate: data.bornDate,
          country: data.country,
          role: data.role,
        };
        if (data.password) {
          updatedData.password = data.password;
        }

        await api.put(`/users/${editUser._id}`, updatedData);

        ShowSwalToast("Actualizado", `El usuario ${data.name} fue actualizado`);
        setEditUser(null);
      } else {
        // Modo creación: mando todos los datos
        // Si no puso foto, genero un avatar automático
        const newUser = {
          ...data,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
          createdAt: new Date().toISOString(),
        };

        await api.post(`/users`, newUser);

        ShowSwalToast("Creado", `El usuario ${data.name} fue creado correctamente`);
        reset();
      }

      // Recargo la tabla después de cualquier cambio
      getUsers();
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo guardar el usuario";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Antes de eliminar un usuario le pregunto al admin si está seguro
  function deleteUser(id, name) {
    Swal.fire({
      title: `¿Estás seguro de eliminar a ${name}?`,
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
          await api.delete(`/users/${id}`);

          ShowSwalToast("Eliminado", "Usuario eliminado.");

          // Si estaba editando ese usuario, cancelo la edición
          if (editUser?._id === id) setEditUser(null);

          // Recargo la lista para que desaparezca el usuario borrado
          getUsers();
        } catch (error) {
          const mensaje =
            error?.response?.data?.message || "No se pudo eliminar el usuario";
          ShowSwalToast("Error", mensaje, "error");
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

        {/* Layout principal: formulario a la izquierda, tabla a la derecha */}
        <div className="admin-users-layout">

          {/* Formulario para crear o editar usuario */}
          <div className="user-form-container">
            <h4>{editUser ? "Editar Usuario" : "Nuevo Usuario"}</h4>

            <form
              onSubmit={handleSubmit(submitUser)}
              className="admin-user-form"
            >
              {/* Nombre completo */}
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre completo"
                  {...register("name", {
                    required: { value: true, message: "El nombre es obligatorio" },
                    minLength: { value: 6, message: "Mínimo 6 caracteres" },
                  })}
                />
                {errors.name && (
                  <div className="user-form-error">{errors.name.message}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="correo@ejemplo.com"
                  {...register("email", {
                    required: { value: true, message: "El email es obligatorio" },
                    pattern: {
                      value: /^[A-Za-z0-9._+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: "Email inválido",
                    },
                  })}
                />
                {errors.email && (
                  <div className="user-form-error">{errors.email.message}</div>
                )}
              </div>

              {/* Contraseña — obligatoria al crear, opcional al editar */}
              <div className="mb-3">
                <label className="form-label">
                  Contraseña {editUser && "(dejá vacío para no cambiarla)"}
                </label>
                <input
                  type="password"
                  className="form-control"
                  placeholder={editUser ? "Nueva contraseña (opcional)" : "Contraseña"}
                  {...register("password", {
                    required: editUser
                      ? false
                      : { value: true, message: "La contraseña es obligatoria" },
                    minLength: editUser
                      ? undefined
                      : { value: 8, message: "Mínimo 8 caracteres" },
                  })}
                />
                {errors.password && (
                  <div className="user-form-error">{errors.password.message}</div>
                )}
              </div>

              {/* Fecha de nacimiento */}
              <div className="mb-3">
                <label className="form-label">Fecha de Nacimiento</label>
                <input
                  type="date"
                  className="form-control"
                  {...register("bornDate")}
                />
              </div>

              {/* País */}
              <div className="mb-3">
                <label className="form-label">País</label>
                <select
                  className="form-select"
                  {...register("country")}
                >
                  <option value="">Seleccioná un país</option>
                  <option value="AR">Argentina</option>
                  <option value="BR">Brasil</option>
                  <option value="UY">Uruguay</option>
                  <option value="CL">Chile</option>
                  <option value="CO">Colombia</option>
                  <option value="PY">Paraguay</option>
                  <option value="BO">Bolivia</option>
                  <option value="PE">Perú</option>
                </select>
              </div>

              {/* Rol: user o admin */}
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  {...register("role", { required: true })}
                >
                  <option value="client">Cliente</option>
                  <option value="admin">Administrador</option>
                </select>
              </div>

              {/* Botones: guardar y cancelar (el cancelar solo aparece al editar) */}
              <div className="user-form-actions">
                <button
                  type="submit"
                  className={`btn-user-submit ${editUser ? "btn-user-update" : ""}`}
                >
                  {editUser ? "Actualizar" : "Crear"} Usuario
                </button>

                {editUser && (
                  <button
                    type="button"
                    className="btn-user-cancel"
                    onClick={() => setEditUser(null)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tabla con todos los usuarios registrados */}
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
                      key={user._id}
                      user={user}
                      deleteUser={deleteUser}
                      setEditUser={setEditUser}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminUsers;
