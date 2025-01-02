// src/App.js

import { Routes, Route, Link, useNavigate } from 'react-router-dom';  // Import routing components
import { useEffect } from 'react';  // Import useEffect for lifecycle logic
import AdminDashboard from './views/AdminDashboard';  // Import AdminDashboard component
import ManageCompanies from './views/ManageCompanies';  // Import ManageCompanies component
import ManageCommunicationMethods from './views/ManageCommunicationMethods';  // Import ManageCommunicationMethods component
import Login from './views/Login';  // Import Login component
import UserDashboard from './views/UserDashboard';  // Import UserDashboard component
import NotificationSystem from './views/NotificationSystem';  // Import NotificationSystem component
import CalendarView from './views/CalendarView';  // Import CalendarView component
import ErrorBoundary from './components/ErrorBoundary';  // Import ErrorBoundary component

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/');  // Navigate to login if not authenticated
    }
  }, [navigate]);

  return (
    <ErrorBoundary>  {/* Wrap the app with ErrorBoundary for error handling */}
      <div style={styles.app}>
        {/* Navigation */}
        <nav>
          <ul style={styles.navList}>
            <li><Link to="/">Login</Link></li>  {/* Link to login page */}
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>  {/* Link to Admin Dashboard */}
            <li><Link to="/manage-companies">Manage Companies</Link></li>  {/* Link to Manage Companies */}
            <li><Link to="/manage-communication-methods">Manage Communication Methods</Link></li>  {/* Link to Manage Communication Methods */}
            <li><Link to="/user-dashboard">User Dashboard</Link></li>  {/* Link to User Dashboard */}
            <li><Link to="/notifications">Notifications</Link></li>  {/* Link to Notifications */}
            <li><Link to="/calendar-view">Calendar View</Link></li>  {/* Link to Calendar View */}
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />  {/* Route for Login page */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />  {/* Route for Admin Dashboard */}
          <Route path="/manage-companies" element={<ManageCompanies />} />  {/* Route for Manage Companies */}
          <Route path="/manage-communication-methods" element={<ManageCommunicationMethods />} />  {/* Route for Manage Communication Methods */}
          <Route path="/user-dashboard" element={<UserDashboard />} />  {/* Route for User Dashboard */}
          <Route path="/notifications" element={<NotificationSystem communications={[]} />} />  {/* Route for Notifications */}
          <Route path="/calendar-view" element={<CalendarView />} />  {/* Route for Calendar View */}
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

// Inline styles for the app layout
const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',  // Set global font family
    backgroundColor: '#f0f0f0',  // Set background color
    color: '#333',  // Set text color
  },
  navList: {
    display: 'flex',  // Use flexbox for navigation list
    justifyContent: 'space-around',  // Distribute items evenly
    listStyleType: 'none',  // Remove default list styles
    padding: '10px',  // Add padding
    backgroundColor: '#333',  // Set background color of the navigation
  },
};

export default App;
