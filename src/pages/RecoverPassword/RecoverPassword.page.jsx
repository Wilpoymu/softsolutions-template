import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function RecoverPasswordPage() {
  const navigate = useNavigate();

  const handleRecoverPassword = () => {
    // Aquí puedes añadir la lógica para manejar la recuperación de contraseña
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="image-container">
          <img
            src="/src/assets/images/login-image.jpg"
            alt="Recover Password visual"
            className="login-image"
          />
        </div>

        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="form-title">Recupera tu contraseña</h2>
            </div>
            <form className="login-form">
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="email" className="form-label">
                    Email
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
              </div>

              <div className="form-links">
                <div className="form-link">
                  <Link to="/login" className="link-text">
                    ¿Recordaste tu contraseña? Inicia sesión
                  </Link>
                </div>
              </div>

              <div className="form-submit">
                <Button
                  onClick={handleRecoverPassword}
                  type="submit"
                  className="submit-button"
                >
                  Recuperar Contraseña
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecoverPasswordPage;
