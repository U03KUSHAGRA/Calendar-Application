// Admin.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div style={styles.adminDashboard}>
      <h2>Admin Dashboard</h2>
      <div style={styles.dashboardActions}>
        <button onClick={() => navigate('/manage-companies')} style={styles.actionBtn}>Manage Companies</button>
        <button onClick={() => navigate('/manage-communication-methods')} style={styles.actionBtn}>Manage Communication Methods</button>
      </div>
    </div>
  );
};

const styles = {
  adminDashboard: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
  },
  dashboardActions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  actionBtn: {
    padding: '12px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default Admin;
