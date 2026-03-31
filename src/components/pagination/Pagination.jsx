import "./Pagination.css";

// Componente de paginación — recibe la función para cambiar de página,
// la cantidad total de items y cuántos se muestran por página
function Pagination({ getProducts, totalItems, itemsPerPage, currentPage = 1 }) {

  // Calculo cuántas páginas necesito en total
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Si solo hay una página no tiene sentido mostrar la paginación
  if (totalPages <= 1) return null;

  return (
    <div className="pag-container">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className={`pag-btn ${currentPage === num ? "pag-btn--active" : ""}`}
          onClick={() => getProducts(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
