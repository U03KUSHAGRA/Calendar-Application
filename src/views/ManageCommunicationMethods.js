import React, { useState, useEffect } from 'react';

// Move styles to the top of the file for better organization
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    maxWidth: '900px',
    margin: '20px auto',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    fontSize: '2rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  checkboxLabel: {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  },
  checkbox: {
    marginLeft: '8px',
  },
  button: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
  },
  list: {
    listStyle: 'none',
    padding: '0',
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '12px',
    borderRadius: '8px',
    boxShadow: '0 1px 5px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    fontSize: '16px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  noData: {
    color: '#888',
    fontSize: '16px',
    marginTop: '10px',
  },
};

const ManageCommunicationMethods = () => {
  // Default communication methods with predefined sequence
  const DEFAULT_METHODS = [
    { name: 'LinkedIn Post', description: 'Post on LinkedIn', sequence: 1, mandatory: true },
    { name: 'LinkedIn Message', description: 'Direct message on LinkedIn', sequence: 2, mandatory: true },
    { name: 'Email', description: 'Email communication', sequence: 3, mandatory: true },
    { name: 'Phone Call', description: 'Direct phone call', sequence: 4, mandatory: false },
    { name: 'Other', description: 'Alternative communication method', sequence: 5, mandatory: false },
  ];

  // State variables to hold communication methods and the current method being added
  const [methods, setMethods] = useState(
    JSON.parse(localStorage.getItem('communicationMethods')) || []
  );
  const [method, setMethod] = useState({
    name: '',
    description: '',
    sequence: methods.length + 1, // Default to the next available sequence
    mandatory: false,
  });

  // Effect to initialize methods from localStorage or set defaults if empty
  useEffect(() => {
    if (methods.length === 0) {
      setMethods(DEFAULT_METHODS);
      localStorage.setItem('communicationMethods', JSON.stringify(DEFAULT_METHODS));
    }
  }, [methods.length]); // Only run if methods are empty initially

  // Handle changes in the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMethod((prevMethod) => ({
      ...prevMethod,
      [name]: name === 'sequence' ? parseInt(value) : value,
    }));
  };

  // Handle changes in the "mandatory" checkbox
  const handleCheckboxChange = (e) => {
    setMethod((prevMethod) => ({
      ...prevMethod,
      mandatory: e.target.checked,
    }));
  };

  // Add a new communication method to the list
  const handleAddMethod = () => {
    // Validate sequence to avoid duplicates
    const isSequenceValid = !methods.some(m => m.sequence === method.sequence);
    
    if (!isSequenceValid) {
      alert('A method with this sequence already exists. Please choose a unique sequence.');
      return;
    }

    // Add the new method and sort the methods by their sequence number
    const updatedMethods = [...methods, method].sort((a, b) => a.sequence - b.sequence);
    
    setMethods(updatedMethods);
    localStorage.setItem('communicationMethods', JSON.stringify(updatedMethods));

    // Reset input state after adding the method
    setMethod({
      name: '',
      description: '',
      sequence: updatedMethods.length + 1, // Update the sequence for the next method
      mandatory: false,
    });
  };

  // Delete a communication method by its index
  const handleDeleteMethod = (index) => {
    const updatedMethods = methods.filter((_, i) => i !== index);
    
    // Recalculate sequence numbers to maintain order
    const reorderedMethods = updatedMethods.map((method, idx) => ({
      ...method,
      sequence: idx + 1,
    }));

    setMethods(reorderedMethods);
    localStorage.setItem('communicationMethods', JSON.stringify(reorderedMethods));
  };

  // Helper function to check if a method is mandatory
  const isMandatoryMethod = (name) => {
    return ['LinkedIn Post', 'LinkedIn Message', 'Email'].includes(name);
  };

  // Handle form submission (ensuring mandatory methods are checked)
  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure mandatory methods (LinkedIn Post, LinkedIn Message, Email) are checked
    if (isMandatoryMethod(method.name) && !method.mandatory) {
      alert(`${method.name} must be mandatory.`);
      return;
    }

    handleAddMethod();
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Manage Communication Methods</h1>
      
      {/* Form to add new communication methods */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Method Name"
          value={method.name}
          onChange={handleInputChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={method.description}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="sequence"
          placeholder="Sequence"
          value={method.sequence}
          onChange={handleInputChange}
          style={styles.input}
          min="1"
          required
        />
        <label style={styles.checkboxLabel}>
          Mandatory:
          <input
            type="checkbox"
            checked={method.mandatory}
            onChange={handleCheckboxChange}
            style={styles.checkbox}
          />
        </label>
        <button type="submit" style={styles.button}>
          Add Method
        </button>
      </form>

      {/* List of communication methods */}
      <ul style={styles.list}>
        {methods.length === 0 ? (
          <li style={styles.noData}>No communication methods available</li>
        ) : (
          methods.map((m, index) => (
            <li key={index} style={styles.listItem}>
              <strong>{m.name}</strong> ({m.description}) - Sequence: {m.sequence} - Mandatory: {m.mandatory ? 'Yes' : 'No'}
              
              {/* Delete button for each communication method */}
              <button
                onClick={() => handleDeleteMethod(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ManageCommunicationMethods;
