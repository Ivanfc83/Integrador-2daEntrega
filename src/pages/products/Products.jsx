import { useEffect, useState } from "react";
import "./Products.css";
import ProductCard from "../../components/product-card/ProductCard";
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../../config/env.config";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      setLoading(true);
      const response = await axios.get(`${API}/products`);

      setProducts(response.data);
    } catch (error) {
      console.log("Error al obtener los productos:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los productos.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos....</p>
      </div>
    );
  }

  return (
    <>
      <div className="products-page">
        <div className="products-header">
          <h1>Nuestros Productos</h1>
          <p>{products.length} productos disponibles</p>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

        </div>
      </div>
    </>
  );
}

export default Products;
