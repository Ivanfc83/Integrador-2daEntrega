import { useForm } from "react-hook-form";
import ShowSwalToast from "../../../config/Swal.fire";
import api from "../../../config/api.config";
import "./ProductCategory.css";

// Formulario para crear nuevas categorías de productos
// Vive en la parte inferior del panel de administración de productos
function ProductCategory({ getCategories }) {

  const { handleSubmit, register, reset, formState: { errors } } = useForm();

  // Envío la nueva categoría al backend y actualizo la lista
  async function onSubmit(data) {
    try {
      await api.post("/categories", data);

      ShowSwalToast("Éxito", "Categoría creada con éxito");

      reset();
      getCategories();
    } catch (error) {
      const mensaje =
        error?.response?.data?.message || "No se pudo crear la categoría";
      ShowSwalToast("Error", mensaje, "error");
    }
  }

  return (
    <div className="category-form-wrapper">
      <div className="category-form-container">
        <h4>Nueva Categoría</h4>

        <form onSubmit={handleSubmit(onSubmit)} className="admin-category-form">

          {/* Nombre de la categoría */}
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              className="form-control"
              type="text"
              placeholder="Ej: Calzado, Indumentaria..."
              {...register("name", {
                required: { value: true, message: "El nombre es obligatorio" },
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
            />
            {errors.name && (
              <div className="cat-error">{errors.name.message}</div>
            )}
          </div>

          {/* Descripción opcional */}
          <div className="mb-3">
            <label className="form-label">Descripción (opcional)</label>
            <textarea
              className="form-control"
              placeholder="Breve descripción de la categoría..."
              rows={3}
              {...register("description")}
            />
          </div>

          <button className="btn-cat-submit" type="submit">
            Crear categoría
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductCategory;
