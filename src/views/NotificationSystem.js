// src/views/NotificationSystem.js
import React from 'react';

const NotificationSystem = ({ communications }) => {
  // Filter the communications that are overdue and not completed
  const overdue = communications.filter((com) => new Date(com.date) < new Date() && !com.completed);

  // Filter the communications that are due today and not completed
  const dueToday = communications.filter(
    (com) => new Date(com.date).toDateString() === new Date().toDateString() && !com.completed
  );

  // Calculate the counts of overdue and due today communications
  const overdueCount = overdue.length;
  const dueTodayCount = dueToday.length;

  return (
    <div style={styles.container}>
      {/* Header section */}
      <h2 style={styles.header}>Notifications</h2>
      
      {/* Summary section showing the count of overdue and due today communications */}
      <div style={styles.summary}>
        <span style={styles.count}>Overdue: {overdueCount}</span>
        <span style={styles.count}>Due Today: {dueTodayCount}</span>
      </div>
      
      {/* Overdue communications list */}
      <div style={styles.section}>
        <h3 style={styles.subHeader}>Overdue Communications</h3>
        <ul style={styles.list}>
          {/* List each overdue communication */}
          {overdue.map((com, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.listItemText}>{com.companyName} - {com.type}</span>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Today's due communications list */}
      <div style={styles.section}>
        <h3 style={styles.subHeader}>Today's Communications</h3>
        <ul style={styles.list}>
          {/* List each communication that is due today */}
          {dueToday.map((com, index) => (
            <li key={index} style={styles.listItem}>
              <span style={styles.listItemText}>{com.companyName} - {com.type}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Notification icon with a badge indicating the total number of overdue or due today communications */}
      <div style={styles.notificationIcon}>
        <span style={styles.badge}>{overdueCount + dueTodayCount}</span>
      </div>
    </div>
  );
};

// Styles for the notification system
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '600px',
    margin: '20px auto',
  },
  header: {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    marginBottom: '20px',
  },
  summary: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  count: {
    backgroundColor: '#f0f0f0',
    padding: '8px 16px',
    borderRadius: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  section: {
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '18px',
    color: '#555',
    borderBottom: '2px solid #e0e0e0',
    paddingBottom: '10px',
  },
  list: {
    paddingLeft: '20px',
  },
  listItem: {
    backgroundColor: '#f9f9f9',
    padding: '10px',
    marginBottom: '8px',
    borderRadius: '4px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  listItemText: {
    color: '#333',
  },
  notificationIcon: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: '#ff0000',
    color: '#fff',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  badge: {
    fontSize: '18px',
  },
};

export default NotificationSystem;
