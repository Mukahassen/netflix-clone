// Import necessary modules and components
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

// Define a protected route component
const ProtectedRoute = ({ children }) => {
    // Get the user from the authentication context
    const { user } = UserAuth();

    // If the user is not authenticated, navigate to the home page
    if (!user) {
        return <Navigate to='/' />;
    } else {
        // Otherwise, render the children (nested components)
        return children;
    }
};

export default ProtectedRoute;
