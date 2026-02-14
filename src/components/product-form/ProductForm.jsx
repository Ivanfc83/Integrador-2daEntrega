import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { API } from "../../config/env.config";
import { useForm } from "react-hook-form";
import "./ProductForm.css"
import ShowSwalToast from "../../config/Swal.fire";

function ProductForm({ getProducts, editProduct, setEditProduct }) {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  async function submitProduct(product) {
    try {
      if (editProduct) {

        const { id } = editProduct;
        await axios.put(`${API}/products/${id}`, product);

        ShowSwalToast("Producto actualizado", `El producto ${product.name} fue actualizado correctamente`)

        setEditProduct(null);
      } else {


        product.createdAt = new Date().toISOString();

        const response = await axios.post(`${API}/products`, product);

        ShowSwalToast('Producto creado', `El producto ${response.data.name} se creó correctamente`);

      }

      reset();

      if (getProducts) {
        getProducts();
      }
    } catch (error) {
      console.log(error);
      ShowSwalToast("Error", "No se pudo crear el producto.", "error")
    }
  }

  useEffect(() => {

    if (editProduct) {

      setValue("name", editProduct.name);
      setValue("price", editProduct.price);
      setValue("oldPrice", editProduct.oldPrice);
      setValue("category", editProduct.category);
      setValue("gender", editProduct.gender);
      setValue("sportType", editProduct.sportType);
      setValue("description", editProduct.description);
      setValue("image", editProduct.image);
      setValue("image2", editProduct.image2);
      setValue("image3", editProduct.image3);
      setValue("image4", editProduct.image4);
    } else {
      reset();
    }
  }, [editProduct, setValue, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(submitProduct)} className="admin-product-form">
        {/* NOMBRE */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre Producto
          </label>
          <input
            type="text"
            {...register("name", {
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
              required: { value: true, message: "El nombre es obligatorio" },
            })}
            className="form-control"
            id="name"
          />
          {errors?.name && (
            <div className="text-danger text-sm">{errors.name?.message}</div>
          )}
        </div>

        {/* PRECIO */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            {...register("price")}
            className="form-control"
            id="price"
            required
            min={0}
            step={0.01}
          />
        </div>

        {/* PRECIO ANTERIOR (OPCIONAL) */}
        <div className="mb-3">
          <label htmlFor="oldPrice" className="form-label">
            Precio Anterior
          </label>
          <input
            type="number"
            {...register("oldPrice")}
            className="form-control"
            id="oldPrice"
            min={0}
            step={0.01}
            placeholder="Dejá vacío si no hay descuento"
          />
        </div>

        {/* CATEGORÍA */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
            required
          >
            <option value="">Seleccionar</option>
            <option value="destacados">Destacados</option>
            <option value="ofertas">Ofertas</option>
            <option value="calzado">Calzado</option>
            <option value="indumentaria">Indumentaria</option>
            <option value="accesorios">Accesorios</option>
          </select>
        </div>

        {/* GÉNERO */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Género
          </label>
          <select
            {...register("gender")}
            id="gender"
            className="form-select"
            required
          >
            <option value="">Seleccionar</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="niño">Niño</option>
            <option value="niña">Niña</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* TIPO DE DEPORTE */}
        <div className="mb-3">
          <label htmlFor="sportType" className="form-label">
            Tipo de Deporte
          </label>
          <select
            {...register("sportType")}
            id="sportType"
            className="form-select"
            required
          >
            <option value="">Seleccionar</option>
            <option value="running">Running</option>
            <option value="futbol">Fútbol</option>
            <option value="basquet">Basquet</option>
            <option value="tenis">Tenis</option>
            <option value="training">Training</option>
            <option value="casual">Casual</option>
            <option value="outdoor">Outdoor</option>
            <option value="natacion">Natación</option>
            <option value="gym">Gym</option>
          </select>
        </div>

        {/* DESCRIPCIÓN */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            {...register("description")}
            className="form-control"
            id="description"
            rows={4}
            required
          ></textarea>
        </div>

        {/* IMAGEN PRINCIPAL */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Imagen Principal
          </label>
          <input
            type="url"
            {...register("image")}
            className="form-control"
            id="image"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* IMAGEN 2 */}
        <div className="mb-3">
          <label htmlFor="image2" className="form-label">
            Imagen 2
          </label>
          <input
            type="url"
            {...register("image2")}
            className="form-control"
            id="image2"
            placeholder="https://example.com/image2.jpg"
          />
        </div>

        {/* IMAGEN 3 */}
        <div className="mb-3">
          <label htmlFor="image3" className="form-label">
            Imagen 3
          </label>
          <input
            type="url"
            {...register("image3")}
            className="form-control"
            id="image3"
            placeholder="https://example.com/image3.jpg"
          />
        </div>

        {/* IMAGEN 4 */}
        <div className="mb-3">
          <label htmlFor="image4" className="form-label">
            Imagen 4
          </label>
          <input
            type="url"
            {...register("image4")}
            className="form-control"
            id="image4"
            placeholder="https://example.com/image4.jpg"
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className={`btn ${editProduct ? "btn-success" : "btn-primary"}`}
          >
            {editProduct !== null && editProduct !== undefined ? "Actualizar" : "Cargar"} Producto
          </button>

          {editProduct && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                console.log("❌ FORM: Cancelando edición");
                setEditProduct(null)}}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ProductForm;
