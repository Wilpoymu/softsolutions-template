import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { useState } from 'react';
import axios from '../../utils/axiosConfig';
import Cookies from 'js-cookie';

function LoginPage() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5117/api/Account/login', {
        userName, // Changed from email to userName
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        }
      });
      const token = response.data.token;
      Cookies.set('token', token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
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
            <form className="login-form" onSubmit={handleLogin}>
              <div className="form-fields">
                <div className="form-field">
                  <label htmlFor="userName" className="form-label">
                    Username
                  </label>
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    autoComplete="text"
                    required
                    className="form-input"
                    placeholder="Username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  type="button" // Changed from "submit" to "button"
                  className="submit-button"
                  onClick={handleLogin} // Moved onClick handler here
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
