import Carousel from 'react-bootstrap/Carousel';

function HomeCarousel() {
  return (
    <Carousel className='w-full h-400 m-auto'>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www.kia.com/content/dam/kwcms/gt/en/images/discover-kia/voice-search/parts-80-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Variedad de refacciones</h3>
          <p>Gran variedad para tu auto</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://www.topgear.es/sites/navi.axelspringer.es/public/media/image/2022/02/audi-r8-spyder-quattro-v10-performance-2609233.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Marcas de reconocimiento global</h3>
          <p>Adquiere el auto de sus sueños</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
          className="d-block w-100"
          src="https://assets.volkswagen.com/is/image/volkswagenag/diferencias-carros-sedan-hatchback-suv?Zml0PWNyb3AlMkMxJndpZD0xMjgwJmhlaT03MjAmZm10PWpwZWcmcWx0PTc5JmJmYz1vZmYmMmI5ZQ=="
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Servicios para autos</h3>
          <p>
            Mantenlo limpio y con la mejor calidad
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeCarousel;