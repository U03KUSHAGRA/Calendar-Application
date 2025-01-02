// src/views/Login.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('role', 'admin');
      navigate('/admin-dashboard');
    } else if (email === 'user@example.com' && password === 'user123') {
      localStorage.setItem('isAuthenticated', true);
      localStorage.setItem('role', 'user');
      navigate('/user-dashboard');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleLogin} style={styles.loginButton}>Login</button>
    </div>
  );
};

const styles = {
  loginContainer: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  loginButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#0077cc',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
};

export default Login;
