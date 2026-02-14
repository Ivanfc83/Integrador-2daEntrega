import "./Banner.css";


function Banner ({ imagenes }) {
  return (
    <section className="banner-container">
      <div id='carouselExampleInterval' className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {imagenes.map((imagen, index) => (
            <div
            key={index}
            className={ `carousel-item ${ index === 0 ? 'active' : ''}` }
            data-bs-interval={4000}
            >
              <img src={ imagen } className='d-block w-100' alt={`Banner ${index + 1}`} />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>
    </section>
  )
}

export default Banner;
