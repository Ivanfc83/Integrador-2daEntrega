import "./Banner.css";

// Carrusel de imágenes para el home
// Recibe un array de imágenes y las muestra una por una, rotando cada 4 segundos
function Banner({ imagenes }) {
  return (
    <section className="banner-container">
      {/* Componente carousel de Bootstrap — el id tiene que coincidir
          con los data-bs-target de los botones de anterior/siguiente */}
      <div
        id="carouselExampleInterval"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          {/* Mapeo el array de imágenes — la primera siempre es la activa */}
          {imagenes.map((imagen, index) => (
            <div
              key={index}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              data-bs-interval={4000}
            >
              <img
                src={imagen}
                className="d-block w-100"
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Botón para ir a la imagen anterior */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Anterior</span>
        </button>

        {/* Botón para ir a la imagen siguiente */}
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Siguiente</span>
        </button>
      </div>
    </section>
  );
}

export default Banner;
