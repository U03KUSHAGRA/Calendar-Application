// src/App.test.js

import { render, screen, fireEvent } from '@testing-library/react';  // Import testing utilities
import { MemoryRouter } from 'react-router-dom';  // Import MemoryRouter for routing in tests
import App from './App';  // Import the App component to test

// Test to check if all navigation links are rendered
test('renders navigation links', () => {
  render(
    <MemoryRouter>  {/* Wrap the App in MemoryRouter for routing */}
      <App />
    </MemoryRouter>
  );

  // Get navigation links by their text content
  const loginLink = screen.getByText(/Login/i);
  const adminDashboardLink = screen.getByText(/Admin Dashboard/i);
  const manageCompaniesLink = screen.getByText(/Manage Companies/i);
  const manageCommunicationMethodsLink = screen.getByText(/Manage Communication Methods/i);
  const userDashboardLink = screen.getByText(/User Dashboard/i);
  const calendarViewLink = screen.getByText(/Calendar View/i);
  const reportsLink = screen.getByText(/Reports/i);

  // Assert that each navigation link is present in the document
  expect(loginLink).toBeInTheDocument();
  expect(adminDashboardLink).toBeInTheDocument();
  expect(manageCompaniesLink).toBeInTheDocument();
  expect(manageCommunicationMethodsLink).toBeInTheDocument();
  expect(userDashboardLink).toBeInTheDocument();
  expect(calendarViewLink).toBeInTheDocument();
  expect(reportsLink).toBeInTheDocument();
});

// Test to check if the logout button works correctly
test('logout button works', () => {
  render(
    <MemoryRouter initialEntries={['/admin-dashboard']}>  {/* Start at /admin-dashboard route */}
      <App />
    </MemoryRouter>
  );

  // Get the logout button by its text
  const logoutButton = screen.getByText(/Logout/i);
  fireEvent.click(logoutButton);  // Simulate a click on the logout button

  // After clicking logout, expect to see the Login page again
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
});
