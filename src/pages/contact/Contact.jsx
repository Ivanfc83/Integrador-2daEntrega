import { useState } from "react";
import "./Contact.css";
import ShowSwalToast from "../../config/Swal.fire";

function Contact() {

  // Estado con los campos del formulario de contacto
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  // Actualizo el campo que el usuario está escribiendo
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  // Al enviar el formulario muestro un mensaje de confirmación
  // y limpio los campos para el próximo mensaje
  function handleSubmit(e) {
    e.preventDefault();

    // Por ahora no hay backend para el formulario de contacto,
    // pero cuando se conecte se haría el api.post acá
    ShowSwalToast("Enviado", "Gracias por contactarnos, te responderemos pronto");

    setFormData({ fullname: "", email: "", subject: "", message: "" });
  }

  return (
    <>
      <main className="form-container">

        {/* Formulario centrado con el mismo estilo que login y registro */}
        <section className="register-form contact-form">
          <h2>Contacto</h2>

          <form onSubmit={handleSubmit} className="contact-form-container">

            {/* Nombre del remitente */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className="form-control"
                placeholder="Nombre Completo"
                required
              />
            </div>

            {/* Email para responderle */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
                required
              />
            </div>

            {/* Asunto del mensaje */}
            <div className="mb-3">
              <label htmlFor="subject" className="form-label">
                Asunto
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                placeholder="Asunto"
                required
              />
            </div>

            {/* Mensaje principal */}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Descripción
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                className="form-control"
                onChange={handleChange}
                rows={4}
                required
              ></textarea>

              <button type="submit" className="btn btn-dark w-100 mt-2">
                Enviar mensaje
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Contact;
