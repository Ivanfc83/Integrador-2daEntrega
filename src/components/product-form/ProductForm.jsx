import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./ProductForm.css";
import ShowSwalToast from "../../config/Swal.fire";
import api from "../../config/api.config";

// Formulario para que el admin cargue o edite un producto
// Si recibe el prop editProduct significa que estamos en modo edición
function ProductForm({ getProducts, editProduct, setEditProduct, categories }) {

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Guardo las previsualizaciones de las imágenes que elige el admin
  const [imagePreviews, setImagePreviews] = useState([]);

  // Cuando el admin selecciona archivos, genero las URLs de previsualización
  function handleImagesChange(e) {
    const files = Array.from(e.target.files).slice(0, 4);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  }

  // Manejo el envío del formulario — puede ser creación o edición
  async function submitProduct(product) {
    try {
      // Armo el FormData para poder enviar archivos junto con los datos de texto
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      if (product.oldPrice) formData.append("oldPrice", product.oldPrice);
      formData.append("category", product.category);
      formData.append("gender", product.gender);
      formData.append("sportType", product.sportType);
      formData.append("description", product.description);

      // Agrego las imágenes con sus nombres correspondientes (image1, image2, etc.)
      const imageKeys = ["image1", "image2", "image3", "image4"];
      const files = product.images ? Array.from(product.images) : [];
      files.slice(0, 4).forEach((file, i) => {
        formData.append(imageKeys[i], file);
      });

      if (editProduct) {
        // Si hay un producto a editar, hago PUT con el ID
        const { _id } = editProduct;
        await api.put(`/products/${_id}`, formData);
        ShowSwalToast(
          "Producto actualizado",
          `El producto ${product.name} fue actualizado correctamente`
        );
        setEditProduct(null);
      } else {
        // Si es un producto nuevo, agrego la fecha y hago POST
        formData.append("createdAt", new Date().toISOString());
        const response = await api.post(`/products`, formData);
        ShowSwalToast(
          "Producto creado",
          `El producto ${response.data.name} se creó correctamente`
        );
      }

      // Limpio el formulario y las previsualizaciones
      reset();
      setImagePreviews([]);
      if (getProducts) getProducts();

    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "Revisá los campos e intentá de nuevo";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  // Cuando el admin elige un producto para editar, cargo sus datos en el formulario
  useEffect(() => {
    if (editProduct) {
      setValue("name", editProduct.name);
      setValue("price", editProduct.price);
      setValue("oldPrice", editProduct.oldPrice);
      // La categoría puede venir como objeto o como string, manejo los dos casos
      setValue("category", editProduct.category?._id || editProduct.category);
      setValue("gender", editProduct.gender);
      setValue("sportType", editProduct.sportType);
      setValue("description", editProduct.description);

      // Muestro las imágenes actuales del producto como previsualizaciones
      const existing = [
        editProduct.image,
        editProduct.image2,
        editProduct.image3,
        editProduct.image4,
      ].filter(Boolean);

      setImagePreviews(existing);
      
    } else {
      // Si se cancela la edición, limpio todo
      reset();
      setImagePreviews([]);
    }
  }, [editProduct, setValue, reset]);

  return (
    <>
      <form
        onSubmit={handleSubmit(submitProduct)}
        className="admin-product-form"
      >
        {/* Nombre del producto */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Nombre Producto
          </label>
          <input
            type="text"
            {...register("name", {
              minLength: { value: 2, message: "Mínimo 2 caracteres" },
              required: { value: true, message: "El nombre es obligatorio" },
            })}
            className="form-control"
            id="name"
          />
          {errors?.name && (
            <div className="text-danger text-sm">{errors.name?.message}</div>
          )}
        </div>

        {/* Precio actual */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="form-control"
            id="price"
            min={0}
            step={0.01}
          />
        </div>

        {/* Precio tachado (descuento) — es opcional */}
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

        {/* Categoría del producto */}
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Categoría
          </label>
          <select
            {...register("category", { required: true })}
            id="category"
            className="form-select"
          >
            <option value="">Seleccionar</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Género al que va dirigido el producto */}
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Género
          </label>
          <select
            {...register("gender", { required: true })}
            id="gender"
            className="form-select"
          >
            <option value="">Seleccionar</option>
            <option value="hombre">Hombre</option>
            <option value="mujer">Mujer</option>
            <option value="niño">Niño</option>
            <option value="niña">Niña</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        {/* Deporte relacionado al producto */}
        <div className="mb-3">
          <label htmlFor="sportType" className="form-label">
            Tipo de Deporte
          </label>
          <select
            {...register("sportType", { required: true })}
            id="sportType"
            className="form-select"
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

        {/* Descripción del producto */}
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            {...register("description", { required: true })}
            className="form-control"
            id="description"
            rows={4}
          ></textarea>
        </div>

        {/* Campo único para cargar hasta 4 imágenes del producto */}
        <div className="mb-3">
          <label htmlFor="images" className="form-label">
            Imágenes del producto (hasta 4)
          </label>
          <input
            type="file"
            {...register("images")}
            className="form-control"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            required={!editProduct}
          />
          <small className="images-hint">
            Seleccioná hasta 4 imágenes. La primera será la imagen principal.
          </small>

          {/* Previsualización de las imágenes seleccionadas */}
          {imagePreviews.length > 0 && (
            <div className="image-previews">
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Vista previa ${i + 1}`}
                  className="image-preview-thumb"
                />
              ))}
            </div>
          )}
        </div>

        {/* Botones de acción — el texto cambia según si es creación o edición */}
        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className={`btn ${editProduct ? "btn-success" : "btn-primary"}`}
          >
            {editProduct ? "Actualizar" : "Cargar"} Producto
          </button>

          {/* El botón cancelar solo aparece cuando se está editando */}
          {editProduct && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setEditProduct(null)}
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
