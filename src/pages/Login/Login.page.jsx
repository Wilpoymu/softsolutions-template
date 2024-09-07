import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

function LoginPage() {

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/clientes");
  }

  return (
    <div className="container">
      <div className="content">
        <div className="image-container">
          <img
            src="https://img.freepik.com/foto-gratis/coloridos-utiles-escolares-cesta-compra-pared-gris-espacio-texto-copia-pila-libros-coloridas-cubiertas-enmarcan-gafas-concepto-regresar-escuela-nuevo-ano-academico_73683-2221.jpg?t=st=1725750327~exp=1725753927~hmac=8ffda3406e99d6195c2b96fd15f09d75ce6f43cb443854646fb40dac82e2f0f3&w=740"
            alt="Login visual"
            className="login-image"
          />
        </div>

        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="form-title">Sign in to your account</h2>
            </div>
            <form className="login-form">
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="form-input"
                    placeholder="Email address"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="form-input"
                    placeholder="Password"
                  />
                </div>
              </div>

              <div className="form-links">
                <div className="form-link">
                  <Link to="/register" className="link-text">
                    Register
                  </Link>
                </div>
                <div className="form-link">
                  <Link to="/forgot-password" className="link-text">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div className="form-submit">
                <Button onClick={handleLogin} type="submit" className="submit-button">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;