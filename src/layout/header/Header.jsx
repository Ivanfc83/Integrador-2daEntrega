import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "src/assets/images/Avatar.jpg";
import NAV_ITEMS from "../../config/Header.Nav.Options";
import useUser from "../../context/useUser";
import { useRef, useEffect, useState } from "react";
import userOrder from "../../context/userOrder";

function Header() {

  const { user, isAdmin, logout } = useUser();
  const { toggleSidebar, totalItems } = userOrder();
  const navigate = useNavigate();

  // Controlo si la barra de búsqueda está abierta
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Controlo si el menú del usuario está abierto
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Referencia para detectar clicks fuera del dropdown de usuario
  const userMenuRef = useRef(null);

  // Si el usuario clickea fuera del dropdown, lo cierro
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Logout y vuelvo al home
  function handleLogout() {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  }

  // Al buscar navego a la página de productos con el término en la URL
  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  // Si hay usuario: abre el dropdown
  // Si no hay usuario: va directo al login
  function handleUserIconClick() {
    if (!user) {
      navigate("/login");
    } else {
      setUserMenuOpen((prev) => !prev);
    }
  }

  return (
    <>
      <header className="main-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container-header">

            {/* Botón de menú para pantallas chicas (mobile) */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Logo con link al home */}
            <div className="header-logo">
              <Link to="/">
                <img src={logo} alt="Sportify" />
                <span className="brand-name">Sportify</span>
              </Link>
            </div>

            {/* Links de navegación — los de admin solo aparecen si es admin */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {NAV_ITEMS.map((item, index) => {
                  if (item.adminOnly && !isAdmin) return null;

                  // Si el item tiene sub-links, muestro un dropdown
                  if (item.dropdown) {
                    return (
                      <li className="nav-item nav-dropdown" key={index}>
                        <span className="nav-link nav-dropdown-toggle">
                          {item.text}
                        </span>
                        <ul className="nav-dropdown-menu">
                          {item.dropdown.map((sub, i) => (
                            <li key={i}>
                              <NavLink to={sub.path} className="nav-dropdown-item">
                                {sub.text}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  }

                  return (
                    <li className="nav-item" key={index}>
                      <NavLink to={item.path} className="nav-link">
                        {item.text}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Iconos de la derecha: búsqueda, usuario y carrito */}
            <div className="header-icons">

              {/* Icono lupa — abre/cierra la barra de búsqueda */}
              <button
                className="icon-btn"
                onClick={() => setSearchOpen((prev) => !prev)}
                aria-label="Buscar"
              >
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M14.0909 6C9.62242 6 6 9.62242 6 14.0909C6 18.5594 9.62242 22.1818 14.0909 22.1818C16.3253 22.1818 18.3473 21.2768 19.812 19.812C21.2768 18.3473 22.1818 16.3253 22.1818 14.0909C22.1818 9.62242 18.5594 6 14.0909 6ZM5 14.0909C5 9.07014 9.07014 5 14.0909 5C19.1117 5 23.1818 9.07014 23.1818 14.0909C23.1818 16.4212 22.3045 18.5474 20.863 20.1559L27.3536 26.6464L26.6464 27.3536L20.1559 20.863C18.5474 22.3045 16.4212 23.1818 14.0909 23.1818C9.07014 23.1818 5 19.1117 5 14.0909Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

              {/* Icono persona — abre dropdown si hay sesión, o va al login */}
              <div className="user-icon-wrapper" ref={userMenuRef}>
                <button
                  className="icon-btn"
                  onClick={handleUserIconClick}
                  aria-label="Usuario"
                >
                  <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                    <path
                      d="M9.22548 20H22.7744L26.4218 25.7316L25.5781 26.2684L22.2255 21H9.77443L6.42179 26.2684L5.57812 25.7316L9.22548 20Z"
                      fill="currentColor"
                    />
                    <path
                      d="M16 17C18.761 17 21 14.761 21 12C21 9.23895 18.761 7 16 7C13.2377 7 11 9.23881 11 12C11 14.7612 13.2377 17 16 17ZM16 18C19.3133 18 22 15.3133 22 12C22 8.68667 19.3133 6 16 6C12.6853 6 9.99996 8.68667 9.99996 12C9.99996 15.3133 12.6853 18 16 18Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>

                {/* Dropdown con nombre, rol y botón de logout */}
                {user && userMenuOpen && (
                  <div className="user-dropdown">
                    <p className="user-dropdown-name">{user.name}</p>
                    <p className="user-dropdown-role">
                      {isAdmin ? "Administrador" : "Usuario"}
                    </p>
                    <button
                      className="user-dropdown-logout"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>

              {/* Icono bolsa — abre/cierra el sidebar del carrito
                  El badge rojo muestra cuántos items hay */}
              <button
                className="icon-btn cart-btn"
                onClick={toggleSidebar}
                aria-label="Carrito de compras"
              >
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
                <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M21 4H11V8H6V28H26V8H21V4ZM20 9V12H21V9H25V27H7V9H11V12H12V9H20ZM20 8V5H12V8H20Z"
                    fill="currentColor"
                  />
                </svg>
              </button>

            </div>
          </div>
        </nav>

        {/* Barra de búsqueda que se despliega al clickear la lupa */}
        {searchOpen && (
          <div className="search-bar-wrapper">
            <form onSubmit={handleSearchSubmit} className="search-form">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="search-submit-btn">
                Buscar
              </button>
              <button
                type="button"
                className="search-close-btn"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery("");
                }}
              >
                ✕
              </button>
            </form>
          </div>
        )}
      </header>
    </>
  );
}

export default Header;
