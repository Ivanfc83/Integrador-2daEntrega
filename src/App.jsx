import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./layout/header/Header";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import ProductDetail from "./pages/product-detail/ProductDetail";
import AboutUs from "./pages/about/AboutUs";
import Register from "./pages/register/Register";
import AdminProducts from "./pages/admin/products/AdminProducts";
import Footer from "./layout/footer/Footer";
import AdminUsers from "./pages/admin/users/AdminUsers";
import Login from "./pages/login/Login";
import Contact from "./pages/contact/Contact";
import ScrollToTop from "./config/ScrollToTop";
import AdminGuard from "./services/guard/AdminGuard";
import SidebarOrder from "./layout/sidebar-order/SidebarOrder";
import useUser from "./context/useUser";

function App() {

  // Necesito saber si hay usuario para decidir si mostrar el login
  const { user } = useUser();

  return (
    <>
      {/* Cada vez que cambio de página, vuelvo al tope del scroll */}
      <ScrollToTop />

      {/* El header y el sidebar están fuera de las rutas
          para que aparezcan en todas las páginas */}
      <Header />
      <SidebarOrder />

      {/* Acá van todas las páginas de la app */}
      <main className="main-container">
        <Routes>

          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          {/* Ruta dinámica — el :id cambia según el producto que se clickea */}
          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/register" element={<Register />} />

          <Route path="/contact" element={<Contact />} />

          {/* Rutas de admin protegidas — AdminGuard verifica el rol antes de entrar */}
          <Route path="/admin" element={<AdminGuard />}>
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          {/* Si el usuario ya está logueado y va al login, lo mando al home */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />

          {/* Cualquier ruta que no exista muestra el 404 */}
          <Route
            path="*"
            element={
              <h2 style={{ textAlign: "center", padding: "4rem" }}>
                404 - Página no encontrada
              </h2>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
