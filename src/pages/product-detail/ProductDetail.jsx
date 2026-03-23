import { NavLink, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import ShowSwalToast from "../../config/Swal.fire";
import userOrder from "../../context/userOrder";
import api from "../../config/api.config";

function ProductDetail() {

  // El producto que voy a mostrar
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Traigo el ID del producto desde la URL (ej: /product/123)
  const { id } = useParams();

  // Del carrito necesito la función para agregar y para abrir el sidebar
  const { addItem, toggleSidebar } = userOrder();

  // Pido el producto al backend usando el ID de la URL
  async function getProductById() {
    try {
      setLoading(true);

      const response = await api.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo cargar el producto";
      ShowSwalToast("Error", mensaje, "error");
    } finally {
      setLoading(false);
    }
  }

  // Cada vez que cambia el ID en la URL, busco el producto nuevo
  useEffect(() => {
    getProductById();
  }, [id]);

  // Mientras carga el producto muestro un mensaje de espera
  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando producto...</p>
      </div>
    );
  }

  // Si no se encontró el producto, muestro un mensaje con botón para volver
  if (!product) {
    return (
      <div className="loading-container">
        <p>Producto no encontrado</p>
        <NavLink to="/products" className="btn btn-primary">
          Volver a productos
        </NavLink>
      </div>
    );
  }

  // Junto todas las imágenes del producto y filtro las que no existan
  const images = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean);

  return (
    <>
      <main className="product-detail-page">
        <div className="product-detail-wrapper">

          {/* Galería de imágenes del producto */}
          <div className="product-detail-images">
            <div className="images-scroll-container">
              {images.map((img, index) => (
                <div key={index} className="product-detail-image">
                  <img
                    src={img}
                    alt={`${product.name} - vista ${index + 1}`}
                    onError={(e) => {
                      // Si la imagen no carga, muestro una imagen de reemplazo
                      e.target.src =
                        "https://placehold.co/600x600?text=Sin+Imagen";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Información principal del producto */}
          <div className="product-detail-info">

            {/* Badges con categoría, deporte y género */}
            <div className="product-badges">
              {product.category && (
                <span className="badge badge-category">
                  {product.category?.name || product.category}
                </span>
              )}
              {product.sportType && (
                <span className="badge badge-sport">{product.sportType}</span>
              )}
              {product.gender && (
                <span className="badge badge-gender">{product.gender}</span>
              )}
            </div>

            <h1 className="product-name">{product.name}</h1>

            {/* Precio — si tiene precio anterior, muestro el descuento */}
            <div className="product-price-section">
              {product.oldPrice &&
              parseFloat(product.oldPrice) > parseFloat(product.price) ? (
                <>
                  <p className="current-price">
                    ${parseFloat(product.price).toLocaleString("es-AR")}
                  </p>
                  <p className="old-price-detail">
                    ${parseFloat(product.oldPrice).toLocaleString("es-AR")}{" "}
                    Precio Original
                    <span className="discount-badge">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100,
                      )}
                      % OFF
                    </span>
                  </p>
                </>
              ) : (
                <p className="current-price">
                  ${parseFloat(product.price).toLocaleString("es-AR")}
                </p>
              )}
            </div>

            {/* Botones para agregar al carrito o comprar directo */}
            <div className="product-actions">
              <button
                type="button"
                className="btn-add-detail"
                onClick={() => {
                  addItem(product);
                  toggleSidebar();
                }}
              >
                Añadir al carrito
              </button>
              <button
                type="button"
                className="btn-buy-detail"
                onClick={() => {
                  addItem(product);
                  toggleSidebar();
                }}
              >
                Comprar
              </button>
            </div>

            {/* Detalles adicionales del producto */}
            <div className="product-extra-info">
              <h3>Detalles del producto</h3>
              <ul>
                {product.gender && (
                  <li>
                    <strong>Género:</strong> {product.gender}
                  </li>
                )}
                {product.sportType && (
                  <li>
                    <strong>Deporte:</strong> {product.sportType}
                  </li>
                )}
                {product.category && (
                  <li>
                    <strong>Categoría:</strong>{" "}
                    {product.category?.name || product.category}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Descripción larga al pie de la página */}
        {product.description && (
          <section className="product-description-section">
            <h3>Descripción del producto</h3>
            <p>{product.description}</p>
          </section>
        )}
      </main>
    </>
  );
}

export default ProductDetail;
