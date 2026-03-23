import { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import ShowSwalToast from "../../config/Swal.fire";
import api from "../../config/api.config";

function Register() {

  // Estado con todos los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    bornDate: "",
    country: "",
    image: "",
  });

  // Acá guardo los mensajes de error de cada campo
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Actualizo el campo correspondiente cada vez que el usuario escribe
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpio el error de ese campo si ya lo había
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  }

  // Si el usuario no sube foto, genero un avatar automático con su nombre
  function generateDefaultAvatar(name, email) {
    const seed = name || email || Date.now();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  // Manejo la carga de la foto de perfil
  // La convierto a base64 para enviarla como texto
  function handleImageChange(e) {
    const file = e.target.files[0];

    if (file) {
      // Solo acepto archivos de imagen
      if (!file.type.startsWith("image/")) {
        setErrors({
          ...errors,
          image: "Por favor seleccioná un archivo de imagen válido",
        });
        return;
      }

      // El límite es 2MB para que no sea muy pesado
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "La imagen no debe superar los 2MB" });
        return;
      }

      // Leo el archivo y lo guardo como base64 en el estado
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        if (errors.image) {
          setErrors({ ...errors, image: "" });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // Valido todos los campos antes de enviar el formulario
  function validateForm() {
    const newErrors = {};

    // El nombre tiene que tener entre 6 y 50 caracteres
    if (
      formData.name.trim().length < 6 ||
      formData.name.trim().length > 50
    ) {
      newErrors.name =
        "El nombre completo debe tener entre 6 y 50 caracteres.";
    }

    // Verifico que sea un email válido con una expresión regular
    const emailPattern = /^[A-Za-z0-9._+'.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Por favor, ingresá un email válido.";
    }

    // La contraseña debe tener al menos 8 chars, mayúscula, minúscula y número
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.";
    }

    // Las dos contraseñas tienen que ser iguales
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword =
        "Las contraseñas no coinciden, por favor verificá.";
    }

    // Verifico que sea mayor de 18 años
    // Tengo en cuenta el mes y día exacto para que no haya errores
    if (formData.bornDate) {
      const bornDate = new Date(formData.bornDate);
      const today = new Date();
      let age = today.getFullYear() - bornDate.getFullYear();
      const cumpleaniosEsteAnio = new Date(
        today.getFullYear(),
        bornDate.getMonth(),
        bornDate.getDate()
      );
      if (today < cumpleaniosEsteAnio) age -= 1;

      if (age < 18) {
        newErrors.bornDate = "Debés ser mayor de 18 años para registrarte.";
      }
    } else {
      newErrors.bornDate = "La fecha de nacimiento es obligatoria.";
    }

    setErrors(newErrors);

    // Si el objeto está vacío es que no hay errores, puedo enviar
    return Object.keys(newErrors).length === 0;
  }

  // Cuando el usuario envía el formulario, valido y mando los datos a la API
  async function handleSubmit(e) {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Armo el objeto con los datos del usuario
        // Si no subió foto, le asigno un avatar automático
        const userData = {
          ...formData,
          image:
            formData.image ||
            generateDefaultAvatar(formData.name, formData.email),
          createdAt: new Date().toISOString(),
        };

        // No mando la repetición de contraseña al backend
        delete userData.repeatPassword;

        await api.post(`/users`, userData);

        ShowSwalToast("Usuario registrado", "Registro exitoso");

        // Después del registro mando al login para que inicie sesión
        navigate("/login");
      } catch (error) {
        const mensaje =
          error?.response?.data?.message || "Por favor intentá nuevamente";
        ShowSwalToast("Error en el registro", mensaje, "error");
      }
    }
  }

  return (
    <>
      <main>
        <section className="form-section">
          <form className="register-form" onSubmit={handleSubmit}>
            <h2>Crear una cuenta</h2>

            {/* Nombre completo */}
            <div className="input-group">
              <label htmlFor="name">Nombre Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Nombre Completo"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && (
                <span className="error"> {errors.name} </span>
              )}
            </div>

            {/* Email */}
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email-register"
                name="email"
                placeholder="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <span className="error"> {errors.email} </span>
              )}
            </div>

            {/* Contraseña */}
            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                name="password"
                id="password-register"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              {errors.password && (
                <span className="error"> {errors.password} </span>
              )}
            </div>

            {/* Repetir contraseña */}
            <div className="input-group">
              <label htmlFor="repeatPassword">Repetir Contraseña</label>
              <input
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                value={formData.repeatPassword}
                onChange={handleChange}
                placeholder="Repetir Contraseña"
                required
              />
              {errors.repeatPassword && (
                <span className="error"> {errors.repeatPassword}</span>
              )}
            </div>

            {/* Fecha de nacimiento */}
            <div className="input-group">
              <label htmlFor="bornDate">Fecha de Nacimiento</label>
              <input
                type="date"
                name="bornDate"
                id="bornDate"
                value={formData.bornDate}
                onChange={handleChange}
                required
              />
              {errors.bornDate && (
                <span className="error"> {errors.bornDate} </span>
              )}
            </div>

            {/* País */}
            <div className="input-group">
              <label htmlFor="country">Seleccioná tu país</label>
              <select
                name="country"
                id="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Seleccioná un país
                </option>
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

            {/* Foto de perfil opcional */}
            <div className="input-group">
              <label htmlFor="image">Foto de Perfil (Opcional)</label>
              <input
                type="file"
                id="image-avatar"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.image && (
                <span className="error">{errors.image}</span>
              )}
              <small className="input-help">
                Si no subís una foto, se generará un avatar automáticamente
              </small>
            </div>

            {/* Botón de envío */}
            <div className="input-group">
              <button type="submit">Registrarse</button>
            </div>

            <div className="login-link">
              <p>
                ¿Ya tenés una cuenta?{" "}
                <Link to="/login">Iniciá sesión aquí</Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Register;
