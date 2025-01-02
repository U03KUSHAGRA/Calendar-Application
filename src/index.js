// src/index.js

import React from 'react';  // Import React for JSX
import ReactDOM from 'react-dom/client';  // Import ReactDOM for rendering
import './index.css';  // Import global styles
import App from './App';  // Import the main App component
import reportWebVitals from './reportWebVitals';  // Import web vitals reporting
import { Provider } from 'react-redux';  // Import Provider to hook Redux store
import { store } from './redux/store';  // Import Redux store
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter for routing

// Create a root element and render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provide Redux store to the App using Provider */}
    <Provider store={store}>
      {/* BrowserRouter wraps App to enable routing */}
      <BrowserRouter>  
        <App />  {/* Render the main application */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// Start tracking web vitals
reportWebVitals();
