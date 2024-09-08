import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/clientes');
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="image-container">
          <img
            src="/src/assets/images/login-image.jpg"
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
                <Button
                  onClick={handleLogin}
                  type="submit"
                  className="submit-button"
                >
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
