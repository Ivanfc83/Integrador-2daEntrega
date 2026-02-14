import "./AdminProducts.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import ProductForm from "../../../components/product-form/ProductForm";
import { API } from "../../../config/env.config";
import TableProductRow from "../../../components/table-product-row/TableProductRow";
import ShowSwalToast from "../../../config/Swal.fire";


function AdminProducts() {
  // ========================================
  // ESTADO PARA PRODUCTOS
  // ========================================
  const [products, setProducts] = useState([]);

  const [editProduct, setEditProduct] = useState(null);

  // ========================================
  // OBTENER PRODUCTOS DE LA API
  // ========================================
  async function getProducts() {
    try {
      const response = await axios.get(`${API}/products`);
      setProducts(response.data);


    } catch (error) {
      ShowSwalToast("Error", "No se pudo cargar el producto.", "error",)

      console.log(error);
    }
  }

  // useEffect: se ejecuta al montar el componente
  useEffect(() => {
    getProducts();
  }, []);


  // ========================================
  // ELIMINAR PRODUCTO
  // ========================================
  function deleteProduct(id, name) {

    //Confirma antes de eliminar
    Swal.fire({
      title: `¿Estás seguro de querer eliminar ${name}?`,
      text: 'No se podrá revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: "#f64504",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then( async (result) => {

      if(result.isConfirmed){
        try {

          await axios.delete(`${API}/products/${id}`);

          ShowSwalToast("Elimando", "Producto eliminado.")

          //Actualizar la lista
        getProducts();

        } catch (error) {
        console.log(error);
        
        ShowSwalToast("Error", "No se pudo eliminar el producto.", "error")

        }
      }
    })
  }

  return (
    <>
      <div className="admin-products-page">
        <div className="title-admin">
          <h2 className="title">Panel de Administración de Productos</h2>
        </div>


        <div className="admin-products">
          {/* ========================================
            FORMULARIO (IZQUIERDA)
        ======================================== */}
          <div className="admin-form">
            <h4>Agregar Producto</h4>

            <ProductForm
              getProducts={getProducts}
              editProduct={editProduct}
              setEditProduct={setEditProduct}
            />
          </div>

          {/* ========================================
            TABLA (DERECHA)
        ======================================== */}
          <div className="products-table">
            <div className="table-wrapper">
              <table className="table table-striped table-hover">
                <thead className="head-container">
                  <tr className="cabecera">
                    <th className="imagen-icon">Producto</th>
                    <th className="name-cell">Nombre</th>
                    <th className="description-cell">Descripción</th>
                    <th className="date-cell">Fecha </th>
                    <th className="price-cell">Precio</th>
                    <th className="buttons-cell">Acciones</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (

                    <TableProductRow
                    key={product.id}
                    product={product}
                    deleteProduct={deleteProduct}
                    setEditProduct={setEditProduct}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default AdminProducts;
