import { useState } from "react";
import "./Contact.css";
import ShowSwalToast from "../../config/Swal.fire";

function Contact() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    try {
      ShowSwalToast(
        "Enviado",
        "Gracias por contactarnos, te responderemos pronto",
      );

      setFormData({ fullname: "", email: "", subject: "", message: "" });

    } catch (error) {
      console.log(error);

      ShowSwalToast("Error", "No se pudo realizar el envío", "error");
    }
  }

  return (
    <>
      <main className="form-container">
      
        {/* Contenedor que centra todo */}
        <section className="register-form contact-form">
          <h2>Contacto</h2>

          <form onSubmit={handleSubmit} className="contact-form-container">
            {/* NOMBRE */}
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

            {/* EMAIL */}
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

            {/* ASUNTO */}
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

            {/* MENSAJE */}
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
                rows={6}
                required
              ></textarea>

              <button type="submit" className="btn btn-dark w-100">
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
