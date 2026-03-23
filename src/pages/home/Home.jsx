import { useEffect, useMemo, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/product-card/ProductCard";
import Banner from "../../components/banner/Banner";
import imagenPortada from "src/assets/images/portada.jpg";
import OurServices from "./our-services/OurServices";
import api from "../../config/api.config";
import ShowSwalToast from "../../config/Swal.fire";
import banner1 from "src/assets/images/Banner-1.png";
import banner2 from "src/assets/images/Banner-2.png";
import banner3 from "src/assets/images/Banner-3.png";
import useUser from "../../context/useUser";

function Home() {

  // Necesito saber si hay un usuario logueado para el saludo
  const { user } = useUser();

  // Acá voy a guardar todos los productos que trae la API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Las imágenes del banner principal
  const imagenesBanner = [banner1, banner2, banner3];

  // Traigo los productos del backend al abrir la página
  async function getProducts() {
    try {
      setLoading(true);

      const response = await api.get(`/products`);

      // El backend puede devolver array directo o { products: [...] }
      const rawData = response.data.products || response.data;

      // Me aseguro de que precio y precio anterior sean números
      const productsClean = rawData.map((prod) => ({
        ...prod,
        price: Number(prod.price),
        oldPrice:
          prod.oldPrice && prod.oldPrice !== "" ? Number(prod.oldPrice) : null,
      }));

      setProducts(productsClean);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo cargar los productos";
      ShowSwalToast("Error", mensaje, "error");
    } finally {
      setLoading(false);
    }
  }

  // Cuando se monta el componente (se abre la página) cargo los productos
  useEffect(() => {
    getProducts();
  }, []);

  // Filtro los productos destacados — si no hay ninguno con esa categoría,
  // muestro los últimos 4 que haya
  const productosAMostrar = useMemo(() => {
    const filtrados = products.filter((prod) => {
      const catName = (prod.category?.name || prod.category || "").toLowerCase();
      return catName === "destacados";
    });
    return filtrados.length > 0 ? filtrados.slice(0, 4) : products.slice(-4);
  }, [products]);

  // Filtro los productos en oferta — si no hay, muestro los primeros 4
  const ofertasAMostrar = useMemo(() => {
    const filtrados = products.filter((prod) => {
      const catName = (prod.category?.name || prod.category || "").toLowerCase();
      return catName === "ofertas";
    });
    return filtrados.length > 0 ? filtrados.slice(0, 4) : products.slice(0, 4);
  }, [products]);

  // Mientras carga muestro un mensaje de espera
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos....</p>
      </div>
    );
  }

  return (
    <>
      <main className="home-container">

        {/* Saludo personalizado si hay usuario logueado */}
        {user ? (
          <p>Bienvenido, {user.name}</p>
        ) : (
          <p>Bienvenido a nuestro sitio</p>
        )}

        {/* Carrusel de imágenes principales */}
        <Banner imagenes={imagenesBanner} />

        {/* Sección de texto con imagen de portada */}
        <section className="main-text-image">
          <div className="text-home">
            <h2>Eleva tu estilo, supera tus límites.</h2>
            <p>
              En Sportify, creemos que la confianza comienza con lo que llevas
              puesto. Por eso, te traemos una selección exclusiva de calzado,
              indumentaria y accesorios que fusionan el diseño moderno con la
              máxima comodidad. Desde las calles de la ciudad hasta el gimnasio
              y las canchas, te acompañamos en cada movimiento. Explora nuestras
              colecciones y encontrá lo que te impulsa.
            </p>
          </div>

          <div className="image-home">
            <img src={imagenPortada} alt="Imagen de Portada" />
          </div>
        </section>

        {/* Sección de productos destacados */}
        {productosAMostrar.length > 0 && (
          <>
            <h3 className="product-title">PRODUCTOS DESTACADOS</h3>
            <div className="product-grid">
              {productosAMostrar.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Sección de ofertas especiales */}
        {ofertasAMostrar.length > 0 && (
          <>
            <h3 className="product-title">OFERTAS ESPECIALES</h3>
            <div className="product-grid">
              {ofertasAMostrar.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* Sección de servicios que ofrece la tienda */}
        <OurServices />
      </main>
    </>
  );
}

export default Home;
