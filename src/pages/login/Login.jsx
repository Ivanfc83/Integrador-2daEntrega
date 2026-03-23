import { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import useUser from "../../context/useUser";

function Login() {

  // Traigo la función de login del contexto de usuario
  const { login } = useUser();

  // Campos del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mensajes de error de validación para cada campo
  const [errors, setErrors] = useState({});

  async function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    // Solo verifico que el email tenga un formato básico válido
    const emailPattern = /^[A-Za-z0-9._+'.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Por favor, ingresá un email válido.";
    }

    // En el login NO valido el formato de la contraseña —
    // solo me aseguro de que no esté vacía.
    // Es el backend quien decide si las credenciales son correctas o no.
    if (!password.trim()) {
      newErrors.password = "Ingresá tu contraseña.";
    }

    if (Object.keys(newErrors).length === 0) {
      // Si los campos están bien, mando las credenciales al contexto
      await login({ email, password });
    } else {
      setErrors(newErrors);
    }
  }

  return (
    <main className="login-main-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          {/* Campo de email */}
          <div className="input-group">
            <label>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({ ...errors, email: "" });
              }}
              placeholder="Correo electrónico"
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Campo de contraseña */}
          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: "" });
              }}
              placeholder="Contraseña"
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn-ingresar">
            INGRESAR
          </button>

          {/* Link para ir a registrarse si no tiene cuenta */}
          <p className="bottom-text">
            ¿No tenés cuenta? <Link to="/register">REGISTRATE AQUÍ</Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default Login;
