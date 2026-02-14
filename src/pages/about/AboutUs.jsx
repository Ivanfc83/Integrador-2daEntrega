import "./AboutUs.css";
import imageAbout from "src/assets/images/about-us.jpg";

function AboutUs() {
  return (
    <>
      <main>
        <div className="title-about-us">
          <h2>Quiénes Somos</h2>
        </div>
        <div className="about-us-container">
          <img src={imageAbout} alt="Sportify Logo" />
          <p>
            Desde 2020, en Sportify hemos estado impulsados por una pasión:
            ofrecer la mejor selección de moda deportiva para que te sientas
            cómodo, seguro y con estilo en cada momento. Creemos que la ropa, el
            calzado y los accesorios que eliges son una extensión de tu
            personalidad y motivación. Por eso, nos dedicamos a curar un
            catálogo con productos de la más alta calidad y de las mejores
            marcas. Cada artículo en nuestra tienda es seleccionado con el
            máximo cuidado, garantizando que cumpla con los estándares más
            exigentes de calidad y diseño. Nuestro objetivo es que nada te
            detenga, para que puedas rendir al máximo y disfrutar de tu vida
            activa. Además, nos comprometemos con la ética y la sostenibilidad.
            Colaboramos exclusivamente con marcas que comparten nuestra visión
            de un comercio justo y responsable. En Sportify, no solo te vistes
            para el deporte, te vistes para un futuro mejor. Gracias por ser
            parte de nuestra comunidad. Estamos aquí para acompañarte en tu
            camino hacia un estilo de vida más activo y saludable.
          </p>
          <div className="box-container">
            <div className="box-one">
              <p>Envíos a todo el país</p>
            </div>
            <div className="box-two">
              <p>Pagá en 3, 6 y 12 cuotas en todo el sitio</p>
            </div>
            <div className="box-three">
              <p>Envíos gratis desde $100</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default AboutUs;
