// src/views/UserLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'user' && password === 'password') { 
      localStorage.setItem('isAuthenticated', true); // Set login status
      navigate('/user-dashboard'); // Redirect to user dashboard
    } else {
      alert('Invalid credentials'); // Show alert for invalid login
    }
  };

  return (
    <div>
      <h1>User Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)} // Update username on change
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password on change
      />
      <button onClick={handleLogin}>Login</button> {/* Trigger login on click */}
    </div>
  );
};

export default UserLogin;
