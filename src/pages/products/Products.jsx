import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Products.css";
import ProductCard from "../../components/product-card/ProductCard";
import ShowSwalToast from "../../config/Swal.fire";
import api from "../../config/api.config";

function Products() {

  // Lista de todos los productos que trae la API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Leo el parámetro de búsqueda de la URL, ej: /products?q=zapatillas
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Pido todos los productos al backend cuando se carga la página
  async function getProducts() {
    try {
      setLoading(true);

      const response = await api.get(`/products`);

      // El backend puede devolver los productos dentro de una propiedad
      // o directamente como array — manejo los dos casos
      const data = response.data.products || response.data;
      setProducts(data);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudieron cargar los productos";
      ShowSwalToast("Error", mensaje, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Mientras carga los productos muestro un mensaje de espera
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos....</p>
      </div>
    );
  }

  // Si hay un término de búsqueda, filtro los productos en el cliente
  // busco por nombre, descripción o categoría
  const filtered = query
    ? products.filter((p) => {
        const term = query.toLowerCase();
        const categoryName = p.category?.name || p.category || "";
        return (
          p.name?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term) ||
          categoryName.toLowerCase().includes(term)
        );
      })
    : products;

  return (
    <>
      <div className="products-page">
        <div className="products-header">
          <h1>Nuestros Productos</h1>

          {/* Muestro cuántos resultados aparecen según si hay búsqueda o no */}
          {query ? (
            <p>
              {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}{" "}
              para &quot;{query}&quot;
            </p>
          ) : (
            <p>{products.length} productos disponibles</p>
          )}
        </div>

        {/* Si la búsqueda no encontró nada, aviso al usuario */}
        {filtered.length === 0 ? (
          <p className="no-results">
            No se encontraron productos para &quot;{query}&quot;.
          </p>
        ) : (
          <div className="product-grid">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
