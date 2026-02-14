import "./Header.css";
import { LINKS } from "src/config/HeaderOptions";
import { Link, NavLink } from "react-router-dom";
import logo from "src/assets/images/Avatar.jpg";

function Header() {
  return (
    <>

      <header className="main-header">
        <nav className="navbar navbar-expand-lg ">
          <div className="container-header">

            {/* BOTÓN HAMBURGUESA (Para Mobile/Tablet) */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo */}
            <div className="header-logo">
              <Link to="/">
                <img src={logo} alt="Sportify" />
                <span className="brand-name">Sportify</span>
              </Link>
            </div>

            {/* MENÚ DINÁMICO */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {LINKS.map((item, indice) => {
                  return (
                    <li className="nav-item" key={indice}>
                      <NavLink className="nav-link" to={item.path}>
                        {item.text}
                      </NavLink>
                    </li>
                  );
                })}

                {/* DESPLEGABLE DE ADMINISTRACIÓN */}
                <li className="nav-item dropdown admin-dropdown">
                  <span className="nav-link dropdown-toggle" role="button">
                    Administrar
                  </span>
                  <ul className="dropdown-menu">
                    <li>
                      <Link className="dropdown-item" to="admin/products">Administrar Productos</Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="admin/users">Administrar Usuarios</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            {/* ICONOS DE USUARIO */}
            <div className="header-icons">
              <Link to="/search" className="icon-link">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M14.0909 6C9.62242 6 6 9.62242 6 14.0909C6 18.5594 9.62242 22.1818 14.0909 22.1818C16.3253 22.1818 18.3473 21.2768 19.812 19.812C21.2768 18.3473 22.1818 16.3253 22.1818 14.0909C22.1818 9.62242 18.5594 6 14.0909 6ZM5 14.0909C5 9.07014 9.07014 5 14.0909 5C19.1117 5 23.1818 9.07014 23.1818 14.0909C23.1818 16.4212 22.3045 18.5474 20.863 20.1559L27.3536 26.6464L26.6464 27.3536L20.1559 20.863C18.5474 22.3045 16.4212 23.1818 14.0909 23.1818C9.07014 23.1818 5 19.1117 5 14.0909Z"
                    fill="black"
                  />
                </svg>
              </Link>

              <Link to="/login" className="icon-link">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M9.22548 20H22.7744L26.4218 25.7316L25.5781 26.2684L22.2255 21H9.77443L6.42179 26.2684L5.57812 25.7316L9.22548 20Z"
                    fill="black"
                  />
                  <path
                    d="M16 17C18.761 17 21 14.761 21 12C21 9.23895 18.761 7 16 7C13.2377 7 11 9.23881 11 12C11 14.7612 13.2377 17 16 17ZM16 18C19.3133 18 22 15.3133 22 12C22 8.68667 19.3133 6 16 6C12.6853 6 9.99996 8.68667 9.99996 12C9.99996 15.3133 12.6853 18 16 18Z"
                    fill="black"
                  />
                </svg>
              </Link>

              <Link to="/cart" className="icon-link">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z"
                    fill="black"
                  />
                </svg>
              </Link>
            </div>

          </div>
        </nav>
      </header>

    </>
  );
}

export default Header;
