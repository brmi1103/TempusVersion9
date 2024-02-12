import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import FeaturesDemoPage from './pages/FeaturesDemoPage';
import ResourcesAboutContactUsPage from './pages/Resources_AboutContactUsPage';
import LoginSignupPage from './pages/LoginSignupPage';
import LoginSignupPage_Register from './pages/LoginSignupPage_Register'; // Import the new registration page component
import MyTempusDashboardPage from './pages/MyTempusDashboardPage';
import BookingPage from './pages/BookingPage';

import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/features-demo" element={<FeaturesDemoPage />} />
        <Route path="/about-contact-us" element={<ResourcesAboutContactUsPage />} />
        <Route path="/login-signup" element={<LoginSignupPage />} />
        <Route path="/register" element={<LoginSignupPage_Register />} /> {/* Add this line for the new registration route */}
        <Route path="/dashboard" element={<MyTempusDashboardPage />} />
        <Route path="/book-appointment" element={<BookingPage />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
