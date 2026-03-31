import "./AdminProducts.css";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProductForm from "../../../components/product-form/ProductForm";
import TableProductRow from "../../../components/table-product-row/TableProductRow";
import ShowSwalToast from "../../../config/Swal.fire";
import Pagination from "../../../components/pagination/Pagination";
import api from "../../../config/api.config";
import ProductCategory from "../../../components/table-product-row/product-category/ProductCategory";

function AdminProducts() {

  // Lista de productos que se muestra en la tabla
  const [products, setProducts] = useState([]);

  // Guardo acá el producto que el admin quiere editar
  // Si es null significa que se está creando uno nuevo
  const [editProduct, setEditProduct] = useState(null);

  // Para la paginación necesito saber cuántos productos hay en total
  const [totalItems, setTotalItems] = useState(0);

  // Página actual — para resaltar el botón activo en la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Lista de categorías para el selector del formulario
  const [categories, setCategories] = useState([]);

  // Cuántos productos muestro por página
  const limit = 5;

  // Al abrir la página cargo las categorías disponibles
  useEffect(() => {
    getCategories();
  }, []);

  // Traigo las categorías del backend para usarlas en el formulario
  async function getCategories() {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudieron cargar las categorías";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Traigo los productos paginados — por defecto cargo la primera página
  async function getProducts(pagina = 1) {
    try {
      const response = await api.get(
        `/products?page=${pagina}&limit=${limit}`
      );

      setProducts(response.data.products);
      setTotalItems(response.data.totalItems);
      setCurrentPage(pagina);
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo cargar la lista de productos";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Cargo los productos cuando se abre esta página
  useEffect(() => {
    getProducts();
  }, []);

  // Antes de borrar le pregunto al admin si está seguro
  // así evito borrados accidentales
  function deleteProduct(idBorrar, name) {
    Swal.fire({
      title: `¿Estás seguro de querer eliminar ${name}?`,
      text: "No se podrá revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f64504",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/products/${idBorrar}`);

          ShowSwalToast("Eliminado", "Producto eliminado.");

          // Recargo la lista para que desaparezca el producto borrado
          getProducts();
        } catch (error) {
          const mensaje =
            error?.response?.data?.message || "No se pudo eliminar el producto";
          ShowSwalToast("Error", mensaje, "error");
        }
      }
    });
  }

  return (
    <>
      <div className="admin-products-page">
        <div className="title-admin">
          <h2 className="title">Panel de Administración de Productos</h2>
        </div>

        <div className="admin-products">

          {/* Columna izquierda: form de producto y form de categoría apilados */}
          <div className="admin-left-col">

            <div className="admin-form">
              <h4>{editProduct ? "Editar Producto" : "Agregar Producto"}</h4>
              <ProductForm
                getProducts={getProducts}
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                categories={categories}
              />
            </div>

            {/* Formulario de categorías debajo del de productos */}
            <ProductCategory getCategories={getCategories} />

          </div>

          {/* Tabla con todos los productos (columna derecha) */}
          <div className="products-table">
            <div className="table-wrapper">
              <table className="table table-striped table-hover">
                <thead className="head-container">
                  <tr className="cabecera">
                    <th className="imagen-icon">Producto</th>
                    <th className="name-cell">Nombre</th>
                    <th className="description-cell">Descripción</th>
                    <th className="date-cell">Fecha</th>
                    <th className="category-cell">Categorías</th>
                    <th className="price-cell">Precio</th>
                    <th className="buttons-cell">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <TableProductRow
                      key={product._id}
                      product={product}
                      deleteProduct={deleteProduct}
                      setEditProduct={setEditProduct}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación debajo de la tabla */}
            <div className="pagination-wrapper">
              <Pagination
                getProducts={getProducts}
                totalItems={totalItems}
                itemsPerPage={limit}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default AdminProducts;
