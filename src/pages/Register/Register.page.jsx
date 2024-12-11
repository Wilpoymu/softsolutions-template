import { Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import './styles.css';

function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    const { username, email, password } = event.target.elements;

    try {
      const response = await axiosInstance.post('/Account/register', {
        userName: username.value,
        email: email.value,
        password: password.value,
      });

      if (response.status === 200) {
        message.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      message.error('Registration failed. Please try again.');
    }
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
            <form className="login-form" onSubmit={handleRegister}>
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    className="form-input"
                    placeholder="Username"
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
                <button
                  type="submit"
                  className="submit-button"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
