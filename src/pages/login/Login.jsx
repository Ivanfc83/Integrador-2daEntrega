import { useState } from "react";
import ShowSwalToast from "../../config/Swal.fire";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // Hook para navegar programáticamente
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    let newErrors = {};

    // Validación del email
    const emailPattern = /^[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/;
    if (!emailPattern.test(email)) {
      newErrors.email = "Por favor, ingresa un email válido.";
    }

    // Validación de la contraseña
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(password)) {
      newErrors.password =
        "La contraseña no es correcta.";
      }

    if(Object.keys(newErrors).length === 0){

      ShowSwalToast('Login exitoso', `Bienvenido ${email}`);

      navigate('/');

    }else{
      setErrors(newErrors);
    }

  }

  return (
  <main className="login-main-container">
    <div className="login-card">
      
      <form onSubmit={handleSubmit}>
        <h2>Iniciar Sesión</h2>

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

          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if(errors.password) setErrors({...errors, password: ""});
            }}
            placeholder="Contraseña"
          />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-ingresar">INGRESAR</button>

        <p className="bottom-text">
          ¿No tienes cuenta? <Link to="/register">REGÍSTRATE AQUÍ</Link>
        </p>
      </form>
    </div>
  </main>
  );
}

export default Login;
