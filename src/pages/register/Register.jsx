import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import ShowSwalToast from "../../config/Swal.fire";
import axios from "axios";
import { API } from "../../config/env.config";

function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    repeatPassword: "",
    bornDate: "",
    country: "",
    image:""
  });

  // Estado para almacenar los errores de validación
  const [ errors, setErrors ] = useState({});

  // Hook para navegar programáticamente
  const navigate = useNavigate();

  // Función para manejar los cambios en los campos del formulario
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Limpia el error para el campo que se está editando
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "", // Limpia el error para este campo
      });
    }
  }

  //Generar avatar aleatorio por defecto
  function generateDefaultAvatar (name, email) {
    const seed = name || email || Date.now();
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
  }

  //Función para manejar la carga de imagen
  function handleImageChange(e) {
    const file = e.target.files[0];

    if(file){

      if(!file.type.starsWith('image/')) {
        setErrors({
          ...errors,
          image: "Por favor selecciona un archivo de imagen válido"
        });
        return;
      }

      // Para validar tamaño (máximo 2MB)
      if(file > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          image: "La imagen no debe superar los 2MB"
        });
        return;
    }

    // Convertir la imagen a base 64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result // Aca guarda la imagen en base 64
      });

      //Limpiar error en caso de que lo haya habido
      if(errors.image){
        setErrors({
          ...errors,
          image:""
        });
      }
    };
    reader.readAsDataURL(file);
  }
  }

   // Función para validar el formulario
  function validateForm() {
    const newErrors = {}; // Objeto para almacenar los errores

    // Validación del nombre
    if (formData.fullname.trim().length < 6 || formData.fullname.trim().length > 50) {
      newErrors.fullname =
        "El nombre completo debe tener entre 6 y 50 caracteres.";
    }

    // Validación del email
    const emailPattern = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }

    // Validación de la contraseña
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una letra una mayúscula, una minúscula y un número.";
    }

    // Validación de la repetición de la contraseña
    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword =
        "Las contraseñas no coinciden, por favor verifica.";
    }

    if (formData.bornDate) {
      const bornDate = new Date(formData.bornDate);
      const today = new Date();
      const age = today.getFullYear() - bornDate.getFullYear();

      if (age < 18) {
        newErrors.bornDate = "Debes ser mayor de 18 años para registrarte.";
      }
    } else {
      newErrors.bornDate = "La fecha de nacimiento es obligatoria.";
    }


    setErrors(newErrors); // Actualiza el estado de errores

    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  }

  // Función para manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    if (validateForm()) {
      // Lógica para enviar los datos al servidor o realizar otras acciones necesarias

        try{

          // Si no hay imagen cargada, usar avatar automático
          const userData = {
            ...formData,
            image: formData.image || generateDefaultAvatar(formData.fullname, formData.email),
            createdAt: new Date().toISOString()
          };

          // Eliminar repeatPassword
          delete userData.repeatPassword;

          const response = await axios.post(`${API}/users`, formData);
          console.log('Respuesta de la API', response.data);

          ShowSwalToast('Usuario registrado', 'Registro exitoso')

          navigate('/login');

        }catch(error){
          console.log('Error en el registro de usuario', error);

          ShowSwalToast('Error', 'Error en el registro', 'error')

        }
  }
}

  return (
    <>
      <main>
        <section className="form-section">
          <form className="register-form" onSubmit={ handleSubmit }>
            <h2>Crear una cuenta</h2>

            <div className="input-group">
              <label htmlFor="name">Nombre Completo</label>

              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Nombre Completo"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
              {errors.fullname && (<span className="error"> { errors.fullname } </span>)}
            </div>

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
              {errors.email && ( <span className="error"> { errors.email } </span> )}
            </div>

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
                {errors.password && ( <span className="error"> { errors.password } </span>)}
            </div>

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
              {errors.repeatPassword && ( <span className="error"> { errors.repeatPassword }</span>)}
            </div>

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
              {errors.bornDate && ( <span className="error"> { errors.bornDate } </span> )}
            </div>

            <div className="input-group">
              <label htmlFor="country">Seleccione su país</label>
              <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              >
                <option value="" disabled>Seleccione un país</option>
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


            <div className="input-group">
              <label htmlFor="image">Foto de Perfil (Opcional)</label>
              <input
                type="file"
                id="image-avatar"
                name="imageFile"
                accept="image/*"
                onChange={handleImageChange}
              />
              {errors.image && (<span className="error">{errors.image}</span>)}
              <small className="input-help">
                Si no subes una foto, se generará un avatar automáticamente
              </small>
            </div>

            <div className="input-group">
              <button type="submit">Registrarse</button>
            </div>

            <div className="login-link">
              <p>
                Ya tienes una cuenta?{" "}
                <Link to="/login">Inicia sesión aquí</Link>
              </p>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Register;
