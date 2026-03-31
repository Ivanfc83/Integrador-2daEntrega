import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Products.css";
import ProductCard from "../../components/product-card/ProductCard";
import ShowSwalToast from "../../config/Swal.fire";
import api from "../../config/api.config";

// Cuántas cards cargo por cada llamada al backend
const ITEMS_POR_PAGINA = 8;

function Products() {

  // Lista de productos que voy mostrando (se va acumulando con cada "ver más")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Página actual que ya se cargó
  const [currentPage, setCurrentPage] = useState(1);

  // Total de productos que hay en el backend (para saber si quedan más)
  const [totalItems, setTotalItems] = useState(0);

  // Leo el parámetro de búsqueda de la URL, ej: /products?q=zapatillas
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Cargo la primera página al abrir la pantalla o al cambiar la búsqueda
  useEffect(() => {
    setProducts([]);
    setCurrentPage(1);
    setTotalItems(0);
    fetchProducts(1, true);
  }, [query]);

  // Hace el llamado al backend y agrega los productos al estado
  // Si es la primera carga (reset=true) reemplaza la lista, si no la agrega
  async function fetchProducts(pagina, reset = false) {
    try {
      if (reset) setLoading(true);
      else setLoadingMore(true);

      // Si hay búsqueda traigo todos los productos para filtrar en el cliente
      // Si no hay búsqueda uso paginación del backend
      const url = query
        ? `/products?page=1&limit=1000`
        : `/products?page=${pagina}&limit=${ITEMS_POR_PAGINA}`;

      const response = await api.get(url);
      const data = response.data.products || response.data;
      const total = response.data.totalItems ?? data.length;

      setTotalItems(total);

      if (reset) {
        setProducts(data);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }

      setCurrentPage(pagina);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudieron cargar los productos";
      ShowSwalToast("Error", mensaje, "error");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }

  // Mientras carga los productos muestro un mensaje de espera
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando productos....</p>
      </div>
    );
  }

  // Si hay un término de búsqueda, filtro los productos en el cliente
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

  // Todavía hay más si los que cargué son menos que el total del backend
  const hayMas = !query && products.length < totalItems;

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
            <p>{totalItems} productos disponibles</p>
          )}
        </div>

        {/* Si la búsqueda no encontró nada, aviso al usuario */}
        {filtered.length === 0 ? (
          <p className="no-results">
            No se encontraron productos para &quot;{query}&quot;.
          </p>
        ) : (
          <>
            {/* Grid de 4 cards por fila en desktop */}
            <div className="product-grid">
              {filtered.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Botón "ver más" que aparece si quedan productos por cargar */}
            {hayMas && (
              <div className="load-more-container">
                <button
                  className="btn-load-more"
                  disabled={loadingMore}
                  onClick={() => fetchProducts(currentPage + 1)}
                >
                  {loadingMore
                    ? "Cargando..."
                    : `Ver más productos (${totalItems - products.length} restantes)`}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Products;
