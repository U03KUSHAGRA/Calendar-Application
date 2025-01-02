// src/views/AdminDashboard.js
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication status and navigate to login page
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1>Admin Dashboard</h1>
      <div style={styles.dashboardContent}>
        <p>Manage your companies and communication methods here.</p>
        <div style={styles.buttonContainer}>
          {/* Button to navigate to manage companies page */}
          <Link to="/manage-companies">
            <button style={styles.linkButton}>Manage Companies</button>
          </Link>
          {/* Button to navigate to manage communication methods page */}
          <Link to="/manage-communication-methods">
            <button style={styles.linkButton}>Manage Communication Methods</button>
          </Link>
        </div>
        {/* Logout button to end the session */}
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  dashboardContent: {
    marginTop: '20px',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff5e5e',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  linkButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
    cursor: 'pointer',
  }
};

export default AdminDashboard;
