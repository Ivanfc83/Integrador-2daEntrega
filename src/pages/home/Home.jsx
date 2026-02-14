import { useEffect, useMemo, useState } from "react";
import "./Home.css";
import ProductCard from "../../components/product-card/ProductCard";
import Banner from "../../components/banner/Banner";
import  imagenPortada  from "src/assets/images/portada.jpg"
import axios from "axios";
import OurServices from "./our-services/OurServices";
import { API } from "../../config/env.config";
import ShowSwalToast from "../../config/Swal.fire";
import banner1 from "src/assets/images/Banner-1.png";
import banner2 from "src/assets/images/Banner-2.png";
import banner3 from "src/assets/images/Banner-3.png";

const URL = "https://694332dd69b12460f313f684.mockapi.io"

function Home() {
  const [ products, setProducts] = useState([]);
  const [ loading, setLoading ] = useState(true);

  const imagenesBanner = [ banner1, banner2, banner3 ]

  async function getProducts(){
    try{
      setLoading(true);

      const response = await axios.get(`${API}/products`);


      const productsClean = response.data.map((prod) => ({
        ...prod,
        price: Number(prod.price),
        oldPrice: (prod.oldPrice && prod.oldPrice !== ''  ) ? Number(prod.oldPrice) : null,
      }));

      setProducts(productsClean);

    }catch(error){
      console.error("Error al obtener el producto:", error);

      ShowSwalToast("Error", "No se pudo cargar el producto.", "error");

    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);



 // Memorizar destacados
  const productosAMostrar = useMemo(() => {
    const filtrados = products.filter( (prod) => prod.category?.toLowerCase() === "destacados" );
    return filtrados.length > 0 ? filtrados.slice(0, 4) : products.slice(-4);
  }, [products]);

  // Memorizar ofertas
  const ofertasAMostrar = useMemo(() => {
    const filtrados = products.filter( (prod) => prod.category?.toLowerCase() === "ofertas" );
    return filtrados.length > 0 ? filtrados.slice(0, 4) : products.slice(0, 4);
  }, [products]);


  if(loading) {
    return (
    <div className="loading-container">
      <p>Cargando productos....</p>
    </div>
    );
  }


  return (
    <>
      {/* MAIN */}
      <main className="home-container">
        <Banner imagenes={ imagenesBanner } />

        <section className="main-text-image">
          <div className="text-home">
            <h2>Eleva tu estilo, supera tus límites. </h2>
            <p>
                En Sportify, creemos que la confianza comienza con lo que llevas
                puesto. Por eso, te traemos una selección exclusiva de calzado,
                indumentaria y accesorios que fusionan el diseño moderno con la
                máxima comodidad. Desde las calles de la ciudad hasta el
                gimnasio y las canchas, te acompañamos en cada movimiento.
                Explora nuestras colecciones y encuentra lo que te impulsa.
              </p>
          </div>

          <div className="image-home">
            <img src={ imagenPortada } alt="Imagen de Portada" />
          </div>
        </section>

        {/* SECCIÓN DESTACADOS */}
        {productosAMostrar.length > 0 && (
          <>
            <h3 className="product-title">PRODUCTOS DESTACADOS</h3>
              <div className="product-grid">
                { productosAMostrar.map((product) => (
                  <ProductCard key={ product.id } product= { product } />
              ))}
              </div>
          </>
        )}


        {/* SECCIÓN OFERTAS */}
        {ofertasAMostrar.length > 0 && (
          <>
            <h3 className="product-title">OFERTAS ESPECIALES</h3>
              <div className="product-grid">
                { ofertasAMostrar.map((product) => (
                  <ProductCard key={ product.id } product= { product } />
              ))}
        </div>
          </>
        )}


        <OurServices />
      </main>
    </>
  );
}

export default Home;
