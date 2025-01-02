// src/views/ManageCompanies.js
import { useState } from 'react';

const ManageCompanies = () => {
  // State to store the list of companies and a new company object
  const [companies, setCompanies] = useState(JSON.parse(localStorage.getItem('companies')) || []);
  const [company, setCompany] = useState({ 
    name: '', 
    location: '', 
    linkedin: '', 
    emails: '', 
    phoneNumbers: '', 
    comments: '', 
    periodicity: '' 
  });

  // Function to add a new company
  const handleAddCompany = () => {
    // Check if all fields are filled out
    if (!company.name || !company.location || !company.linkedin || !company.emails || !company.phoneNumbers || !company.periodicity) {
      alert('All fields must be filled out.');
      return;
    }

    // Add the new company to the list and update localStorage
    const updatedCompanies = [...companies, company];
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));

    // Clear the input fields after adding the company
    setCompany({ name: '', location: '', linkedin: '', emails: '', phoneNumbers: '', comments: '', periodicity: '' });
  };

  // Function to delete a company by its index
  const handleDeleteCompany = (index) => {
    const updatedCompanies = companies.filter((_, i) => i !== index);
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
  };

  return (
    <div style={styles.container}>
      {/* Header for the page */}
      <h1 style={styles.heading}>Manage Companies</h1>

      {/* Form to input company details */}
      <div style={styles.formContainer}>
        <input 
          type="text" 
          placeholder="Company Name" 
          value={company.name} 
          onChange={(e) => setCompany({ ...company, name: e.target.value })} 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Location" 
          value={company.location} 
          onChange={(e) => setCompany({ ...company, location: e.target.value })} 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="LinkedIn Profile" 
          value={company.linkedin} 
          onChange={(e) => setCompany({ ...company, linkedin: e.target.value })} 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Emails" 
          value={company.emails} 
          onChange={(e) => setCompany({ ...company, emails: e.target.value })} 
          style={styles.input}
        />
        <input 
          type="text" 
          placeholder="Phone Numbers" 
          value={company.phoneNumbers} 
          onChange={(e) => setCompany({ ...company, phoneNumbers: e.target.value })} 
          style={styles.input}
        />
        <textarea 
          placeholder="Comments" 
          value={company.comments} 
          onChange={(e) => setCompany({ ...company, comments: e.target.value })} 
          style={styles.textarea}
        />
        <input 
          type="text" 
          placeholder="Communication Periodicity" 
          value={company.periodicity} 
          onChange={(e) => setCompany({ ...company, periodicity: e.target.value })} 
          style={styles.input}
        />
        <button onClick={handleAddCompany} style={styles.button}>Add Company</button>
      </div>

      {/* List of companies */}
      <ul style={styles.companyList}>
        {companies.map((comp, index) => (
          <li key={index} style={styles.companyItem}>
            <h3>{comp.name}</h3>
            <p><strong>Location:</strong> {comp.location}</p>
            <p><strong>LinkedIn:</strong> <a href={comp.linkedin} target="_blank" rel="noopener noreferrer" style={styles.link}>View Profile</a></p>
            <p><strong>Emails:</strong> {comp.emails}</p>
            <p><strong>Phone Numbers:</strong> {comp.phoneNumbers}</p>
            <p><strong>Comments:</strong> {comp.comments}</p>
            <p><strong>Communication Periodicity:</strong> {comp.periodicity}</p>
            {/* Button to delete the company */}
            <button onClick={() => handleDeleteCompany(index)} style={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styling for the components
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f7fa',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  textarea: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    resize: 'vertical',
    minHeight: '80px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  companyList: {
    listStyle: 'none',
    padding: '0',
  },
  companyItem: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  link: {
    color: '#0066cc',
    textDecoration: 'none',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default ManageCompanies;
