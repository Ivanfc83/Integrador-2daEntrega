// Componente de paginación — recibe la función para buscar productos,
// la cantidad total de productos y cuántos mostrar por página
function Pagination({ getProducts, totalItems, itemsPerPage }) {

  // Calculo cuántas páginas necesito en total
  // Math.ceil redondea para arriba, así si sobran items igual los muestro
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Armo el array de botones dinámicamente, uno por cada página
  const paginationButtons = [];

  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <li className="page-item" key={i}>
        {/* Al clickear un número, llamo a getProducts con ese número de página */}
        <button className="page-link" onClick={() => getProducts(i)}>
          {i}
        </button>
      </li>
    );
  }

  return (
    <div className="pagination-container pt-3">
      <nav aria-label="Page Navigation">
        <ul className="pagination ml-auto">
          {paginationButtons}
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
