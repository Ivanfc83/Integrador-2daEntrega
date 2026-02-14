import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <>
      <ScrollToTop />

      <Header />

      <main className="main-container">

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/products" element={<Products />} />

          <Route path="/product/:id" element={<ProductDetail />} />

          <Route path="/about" element={<AboutUs />} />

          <Route path="/register" element={<Register />} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/admin/products" element={<AdminProducts />} />

          <Route path="/admin/users" element={<AdminUsers />} />

          <Route path="/login" element={<Login />} />

        </Routes>

      </main>

      <Footer />
    </>
  );
}

export default App;
