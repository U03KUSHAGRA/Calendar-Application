// User.js
import React from 'react';

const User = () => {
  return (
    <div style={styles.userDashboard}>
      <h2>User Dashboard</h2> {/* Title of the User Dashboard */}
      <p>Welcome to the User section! Explore your personalized content here.</p> {/* Description */}
    </div>
  );
};

const styles = {
  userDashboard: {
    padding: '20px',
    backgroundColor: '#f9f9f9', // Light background color for the dashboard
    textAlign: 'center', // Centered text alignment
  },
};

export default User;
