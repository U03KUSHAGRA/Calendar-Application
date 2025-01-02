# Company Communications Calendar App

## Overview

A comprehensive web application built with React and Redux for managing company communications, scheduling, and tracking interactions. The app provides robust features for both administrators and users to effectively manage communication workflows.

## Features

### Authentication
- Secure login system
- Role-based access control
- User authentication and authorization

### Admin Dashboard
- Company management
- Communication method configuration
- Detailed analytics and reporting
- User activity tracking

### User Dashboard
- Upcoming communication tracking
- Notification management
- Personal activity overview

### Key Capabilities
- Interactive calendar view
- Communication tracking
- Notification system
- Reporting and export functionality

## Technology Stack

### Frontend
- React
- Redux
- React Router
- TailwindCSS

### Libraries and Integrations
- FullCalendar (Scheduling)
- Chart.js (Data Visualization)
- jsPDF (PDF Generation)

### Testing
- Jest
- React Testing Library

## Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/company-communications-app.git
cd company-communications-app
```

### 2. Install dependencies
Navigate to the project directory and install the required packages:
```bash
cd company-app
npm install
```

### 3. Run the app
Start the development server:
```bash
npm start
```
Open http://localhost:3000 in your browser to view the application.

## TailwindCSS Configuration
### tailwind.config.js
```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### index.css
TailwindCSS is imported here alongside any custom styles:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  background-color: #f7f9fc;
  line-height: 1.6;
  color: #4a4a4a;
}

code {
  font-family: 'Fira Code', Menlo, Monaco, Consolas, 'Courier New', monospace;
  font-size: 14px;
  color: #0077cc;
}
```

## Running Tests
To run tests for your app:
```bash
npm test
```
This will run all the unit and integration tests, including the ones set up in App.test.js.

## Available Scripts
In the project directory, you can run:

#### npm start
Runs the app in development mode. Open http://localhost:3000 to view it in the browser.

#### npm build
Builds the app for production to the build folder.

#### npm test
Launches the test runner in the interactive watch mode.

#### npm eject
Removes the single build dependency from the project. This is a one-way operation.

## Contributing
Feel free to fork the repository and submit pull requests with your improvements or bug fixes.

## Installation

### Project Link
```bash
git clone https://github.com/your-username/company-app.git
```
