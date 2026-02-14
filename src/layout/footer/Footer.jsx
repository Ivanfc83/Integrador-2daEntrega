import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "src/assets/images/Avatar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <>

      <footer className="main-footer">
        <section className="footer-social">
          <h4>SIGUENOS EN NUESTRAS REDES</h4>
          <ul className="social-list">
            <li className="social-item">
              <Link to="#">
                <FontAwesomeIcon icon={ faFacebookSquare } />
              </Link>
            </li>
            <li className="social-item">
              <Link to="#">
                <FontAwesomeIcon icon={ faInstagram } />

              </Link>
            </li>
            <li className="social-item">
              <Link to="#">
                <FontAwesomeIcon icon={ faLinkedin } />
              </Link>
            </li>
          </ul>
        </section>


        <section className="footer-about">
          <h4>INFORMACION</h4>
          <Link to="/about">Acerca de Sportify</Link>
          <Link to="/terms">Términos y condiciones</Link>
          <Link to="/privacy-policy">Política de privacidad</Link>
          <Link to="/news">Noticias</Link>
        </section>


        <section className="footer-info">
          <h4>ATENCION AL CLIENTE</h4>
          <p>Av. Las Baleares 1021, Santa Fe, Argentina</p>
          <p>Teléfono: +54 342 4568475</p>
          <p>
            <Link to="mailto:email@sportify.com">email@sportify.com</Link>
          </p>
        </section>

        <section className="footer-brand">
          <h4>NOSOTROS</h4>
          <div className="brand-logo">
            <img src={logo} alt="LOGO" />
          </div>
          <p>All right reserved 2020</p>
        </section>
      </footer>

    </>
  );
}

export default Footer;
