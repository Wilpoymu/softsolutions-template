import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Aquí puedes añadir la lógica para manejar el registro
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <div className="content">
        <div className="image-container">
          <img
            src="/src/assets/images/login-image.jpg"
            alt="Register visual"
            className="login-image"
          />
        </div>

        <div className="form-container">
          <div className="form-content">
            <div className="form-header">
              <h2 className="form-title">Create a new account</h2>
            </div>
            <form className="login-form">
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="form-input"
                    placeholder="Full Name"
                  />
                </div>
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
                    autoComplete="new-password"
                    required
                    className="form-input"
                    placeholder="Password"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="form-input"
                    placeholder="Confirm Password"
                  />
                </div>
              </div>

              <div className="form-links">
                <div className="form-link">
                  <Link to="/login" className="link-text">
                    Already have an account? Sign in
                  </Link>
                </div>
              </div>

              <div className="form-submit">
                <Button
                  onClick={handleRegister}
                  type="submit"
                  className="submit-button"
                >
                  Register
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;