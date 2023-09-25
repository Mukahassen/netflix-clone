// Import necessary modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Render the root component using ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
    // Wrap the App component with BrowserRouter for routing
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
