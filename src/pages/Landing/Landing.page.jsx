// import Box from '@mui/material/Box';
// import { alpha, useTheme } from '@mui/material/styles';

// import { useRouter } from 'src/routes/hooks';

// import { bgGradient } from 'src/theme/css';

import { Link } from 'react-router-dom';
import './styles.css';

// ----------------------------------------------------------------------

export default function LandingView() {
  //   const theme = useTheme();

  //   const router = useRouter();

  // const handleClick = () => {
  //   router.push('/dashboard');
  // };

  return (
    // <Box
    //   sx={{
    //     ...bgGradient({
    //       color: alpha(theme.palette.background.default, 0.9),
    //       imgUrl: '/assets/background/overlay_4.jpg',
    //     }),
    //     height: 1,
    //   }}
    // >
    //   <button type='submit' onClick={handleClick}>Iniciar sesión</button>
    // </Box>
    <div className="container">
      <header id="header" className="header">
        <div id="logo" className="logo">
          <img src="src/assets/images/logo (1).png" alt="logo" />
        </div>
        <nav id="navBar" className="navBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="">New</a>
            </li>
            <li>
              <a href="">Popular</a>
            </li>
            <li>
              <a href="">Trending</a>
            </li>
            <li>
              <a href="">Categories</a>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
            <li>
              <Link to="/login">Iniciar sesión</Link>
            </li>
          </ul>
        </nav>
      </header>

      <section id="showCase" className="showCase">
        <div id="divOne" className="divOne">
          <picture>
            <source
              media="(min-width: 768px)"
              srcSet="src/assets/images/3.png"
            />
            <img className="picture" src="src/assets/images/3.png" alt="" />
          </picture>
          <article id="articleOne" className="articleOne">
            <h1>Grupo Mil Soluciones S.A.S</h1>
            <div id="divTwo" className="divTwo">
              <p>
                Somos una empresa con más de 10 años de experiencia
                comercializando productos promocionales importados y nacionales.
                Nos especializamos en hacer realidad cualquier idea y concepto.
              </p>
              <button type="submit" className="button">
                More info
              </button>
            </div>
          </article>
        </div>

        <div id="divThree" className="divThree">
          <h2>NUEVO</h2>
          <article id="articleTwo" className="articleTwo">
            <h3>Canguro Muttler</h3>
            <p>
              Canguro para llevar tus artículos personales cuando estés de viaje
              o entrenando.
            </p>
          </article>
          <article id="articleThree" className="articleThree">
            <h3>Cooler San Salvatore</h3>
            <p>
              Nevera portátil con diseño moderno, cuenta el espacio necesario
              para llevar las bebidas y alimentos.
            </p>
          </article>
          <article id="articleFour" className="articleFour">
            <h3>Maleta Travel Mont Fort</h3>
            <p>
              Maleta con diseño elegante y moderna, cuenta con todo el espacio
              necesario.
            </p>
          </article>
        </div>
      </section>
      <div id="divFour" className="divFour">
        <article id="articleFive" className="services">
          <img src="src/assets/images/canguro-muttler.png" alt="" />
          <div id="divFive" className="divFive">
            <span>01</span>
            <h4>Canguro Muttler</h4>
            <p>
              Canguro para llevar tus artículos personales cuando estés de viaje
              o entrenando.
            </p>
          </div>
        </article>
        <article id="articleSix" className="services">
          <img
            src="src/assets/images/cooler-san-salvatore-300x300.png"
            alt=""
          />
          <div id="divSix" className="divFive">
            <span>02</span>
            <h4>Cooler San Salvatore</h4>
            <p>
              Nevera portátil con diseño moderno, cuenta el espacio necesario
              para llevar las bebidas y alimentos.
            </p>
          </div>
        </article>
        <article id="articleSeven" className="services">
          <img src="src/assets/images/maleta-travel-mont-fort.png" alt="" />
          <div id="divSeven" className="divFive">
            <span>03</span>
            <h4>Maleta Travel</h4>
            <p>
              Maleta con diseño elegante y moderna ideal para viajes cortos o ir
              al gimnasio.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
