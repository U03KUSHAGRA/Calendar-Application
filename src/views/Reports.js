// src/views/Reports.js
import React, { useState, useEffect } from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Styles for the reports page
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterSection: {
    display: 'flex',
    gap: '15px',
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  input: {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  chartContainer: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  button: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  activityLog: {
    maxHeight: '300px',
    overflowY: 'auto',
    padding: '15px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  logItem: {
    padding: '10px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
  },
  metricsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    marginBottom: '20px',
  },
  metricCard: {
    backgroundColor: 'white',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
};

const Reports = () => {
  // State variables to hold the date range, selected company, method, and communications data
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  const [communications, setCommunications] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Load communications data and company list from localStorage
  useEffect(() => {
    const storedCommunications = JSON.parse(localStorage.getItem('communications')) || [];
    const storedCompanies = [...new Set(storedCommunications.map(com => com.companyName))];
    setCommunications(storedCommunications);
    setCompanies(storedCompanies);
  }, []);

  // Function to filter communications based on the selected filters
  const getFilteredData = () => {
    return communications.filter(com => {
      const dateInRange = (!dateRange.start || com.date >= dateRange.start) &&
                         (!dateRange.end || com.date <= dateRange.end);
      const companyMatch = selectedCompany === 'all' || com.companyName === selectedCompany;
      const methodMatch = selectedMethod === 'all' || com.type === selectedMethod;
      return dateInRange && companyMatch && methodMatch;
    });
  };

  // Function to generate data for the frequency chart (Pie chart)
  const generateFrequencyData = () => {
    const frequency = getFilteredData().reduce((acc, com) => {
      acc[com.type] = (acc[com.type] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(frequency),
      datasets: [{
        data: Object.values(frequency),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      }],
    };
  };

  // Function to generate data for the effectiveness chart (Bar chart)
  const generateEffectivenessData = () => {
    const effectiveness = getFilteredData().reduce((acc, com) => {
      if (!acc[com.type]) {
        acc[com.type] = { total: 0, successful: 0 };
      }
      acc[com.type].total++;
      if (com.successful) {
        acc[com.type].successful++;
      }
      return acc;
    }, {});

    const labels = Object.keys(effectiveness);
    const data = labels.map(type => 
      (effectiveness[type].successful / effectiveness[type].total) * 100 || 0
    );

    return {
      labels,
      datasets: [{
        label: 'Success Rate (%)',
        data,
        backgroundColor: '#36A2EB',
      }],
    };
  };

  // Function to generate data for overdue trend chart (Line chart)
  const generateOverdueTrendData = () => {
    const overdueTrend = getFilteredData()
      .filter(com => new Date(com.date) < new Date() && !com.completed)
      .reduce((acc, com) => {
        const month = new Date(com.date).toLocaleString('default', { month: 'short' });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

    return {
      labels: Object.keys(overdueTrend),
      datasets: [{
        label: 'Overdue Communications',
        data: Object.values(overdueTrend),
        borderColor: '#FF6384',
        tension: 0.1,
      }],
    };
  };

  // Function to download the filtered data as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    const filteredData = getFilteredData();

    doc.text('Communication Report', 20, 10);
    
    const tableData = filteredData.map(com => [
      com.date,
      com.companyName,
      com.type,
      com.successful ? 'Yes' : 'No',
    ]);

    // Create a table in the PDF document
    doc.autoTable({
      head: [['Date', 'Company', 'Type', 'Successful']],
      body: tableData,
      startY: 20,
    });

    // Save the PDF
    doc.save('communication-report.pdf');
  };

  // Function to download the filtered data as a CSV
  const downloadCSV = () => {
    const filteredData = getFilteredData();
    const csvContent = [
      ['Date', 'Company', 'Type', 'Successful'].join(','),
      ...filteredData.map(com => [
        com.date,
        com.companyName,
        com.type,
        com.successful ? 'Yes' : 'No',
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'communication-report.csv';
    link.click();
  };

  return (
    <div style={styles.container}>
      {/* Header section with download buttons */}
      <div style={styles.header}>
        <h2>Reports & Analytics</h2>
        <div>
          <button style={styles.button} onClick={downloadPDF}>Download PDF</button>
          <button style={{...styles.button, marginLeft: '10px'}} onClick={downloadCSV}>
            Download CSV
          </button>
        </div>
      </div>

      {/* Filter section for date range, company, and communication method */}
      <div style={styles.filterSection}>
        <input
          type="date"
          style={styles.input}
          value={dateRange.start}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
        />
        <input
          type="date"
          style={styles.input}
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />
        <select
          style={styles.input}
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="all">All Companies</option>
          {companies.map(company => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
        <select
          style={styles.input}
          value={selectedMethod}
          onChange={(e) => setSelectedMethod(e.target.value)}
        >
          <option value="all">All Methods</option>
          <option value="Email">Email</option>
          <option value="Phone Call">Phone Call</option>
          <option value="LinkedIn Post">LinkedIn Post</option>
          <option value="Meeting">Meeting</option>
        </select>
      </div>

      {/* Metrics cards displaying total communications, success rate, and overdue communications */}
      <div style={styles.metricsGrid}>
        <div style={styles.metricCard}>
          <h3>Total Communications</h3>
          <h2>{getFilteredData().length}</h2>
        </div>
        <div style={styles.metricCard}>
          <h3>Success Rate</h3>
          <h2>
            {Math.round(
              (getFilteredData().filter(com => com.successful).length / 
               getFilteredData().length) * 100
            )}%
          </h2>
        </div>
        <div style={styles.metricCard}>
          <h3>Overdue</h3>
          <h2>
            {getFilteredData().filter(
              com => new Date(com.date) < new Date() && !com.completed
            ).length}
          </h2>
        </div>
      </div>

      {/* Charts showing communication frequency, engagement effectiveness, and overdue trends */}
      <div style={styles.chartContainer}>
        <h3>Communication Frequency</h3>
        <Pie data={generateFrequencyData()} />
      </div>

      <div style={styles.chartContainer}>
        <h3>Engagement Effectiveness</h3>
        <Bar data={generateEffectivenessData()} />
      </div>

      <div style={styles.chartContainer}>
        <h3>Overdue Communication Trends</h3>
        <Line data={generateOverdueTrendData()} />
      </div>

      {/* Activity log showing the most recent communications */}
      <div style={styles.activityLog}>
        <h3>Recent Activity Log</h3>
        {getFilteredData()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 10)
          .map((com, index) => (
            <div key={index} style={styles.logItem}>
              <span>{com.companyName} - {com.type}</span>
              <span>{new Date(com.date).toLocaleDateString()}</span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Reports;
