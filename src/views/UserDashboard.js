// src/views/UserDashboard.js
import { Link, useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated'); // Clear authentication status
    navigate('/'); // Redirect to login page
  };

  return (
    <div style={styles.container}>
      <h1>User Dashboard</h1>
      <div style={styles.dashboardContent}>
        <p>View and manage communications with your companies here.</p>
        <div style={styles.buttonContainer}>
          <Link to="/notifications">
            <button style={styles.linkButton}>Notifications</button>
          </Link>
          <Link to="/calendar-view">
            <button style={styles.linkButton}>Calendar View</button>
          </Link>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button> {/* Logout button */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Card-like container style
  },
  dashboardContent: {
    marginTop: '20px',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff5e5e', // Red logout button
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
    backgroundColor: '#007bff', // Blue button color
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    marginRight: '10px',
    cursor: 'pointer',
  }
};

export default UserDashboard;
