import { NavLink, useParams } from "react-router-dom";
import "./ProductDetail.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API } from "../../config/env.config";
import ShowSwalToast from "../../config/Swal.fire";

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  async function getProductById() {
    try {

      setLoading(true);
      
      const response = await axios.get(`${API}/products/${id}`);

      setProduct(response.data);

    } catch (error) {
      console.error("Error al obtener el producto:", error);

      ShowSwalToast("Error", "No se pudo cargar el producto.", "error");

    }finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProductById();
  }, [id]);

   if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando producto...</p>
      </div>
    );
  }


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

  const images = [
    product.image,
    product.image2,
    product.image3,
    product.image4,
  ].filter(Boolean); // Filtra las que existen

  return (
    <>
      <main className="product-detail-page">
        <div className="product-detail-wrapper">

          {/* IMÁGENES */}
          <div className="product-detail-images">
            <div className="images-scroll-container">

              {images.map((img, index) => (
                <div key={index} className="product-detail-image">
                  <img
                    src={img}
                    alt={`${product.name} - vista ${index + 1}`}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600?text=Sin+Imagen";
                    }}
                  />
                </div>
              ))}

            </div>
          </div>

         {/* INFORMACIÓN DEL PRODUCTO */}
          <div className="product-detail-info">
            {/* Categoría y tipo */}
            <div className="product-badges">
              {product.category && (
                <span className="badge badge-category">{product.category}</span>
              )}
              {product.sportType && (
                <span className="badge badge-sport">{product.sportType}</span>
              )}
              {product.gender && (
                <span className="badge badge-gender">{product.gender}</span>
              )}
            </div>

            <h1 className="product-name">{product.name}</h1>

            <div className="product-price-section">
              {product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price) ? (
                <>
                  <p className="current-price">
                    ${parseFloat(product.price).toLocaleString('es-AR')}
                  </p>

                  <p className="old-price-detail">
                    ${parseFloat(product.oldPrice).toLocaleString('es-AR')} Precio Original
                    <span className="discount-badge">
                      {Math.round(
                        ((product.oldPrice - product.price) /
                          product.oldPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </p>
                </>
              ) : (
                <p className="current-price">
                  ${parseFloat(product.price).toLocaleString('es-AR')}
                </p>
              )}
            </div>

            <div className="product-actions">
              <button type="button" className="btn-add-detail">
                Añadir al carrito
              </button>
              <button type="button" className="btn-buy-detail">
                Comprar
              </button>
            </div>

            {/* Información adicional */}
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
                    <strong>Categoría:</strong> {product.category}
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* DESCRIPCIÓN */}
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
