import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../assets/css/TempusStyles.css';
import '../assets/css/flipCardStyles.css';
import authService from '../services/authService'; // Ensure authService correctly implements register and login functions


const LoginSignupPage = () => {
    const [isLoginView, setIsLoginView] = useState(true); // Manages view toggle between login and signup
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handles input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Toggles between login and signup view
    const handleToggleView = () => {
        setIsLoginView(!isLoginView);
        setError(''); // Clears error when view is toggled
    };

    // Handles the registration process
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.register(userDetails);
            console.log(response); // Consider logging response or using it to manage application state
            navigate('/dashboard'); // Redirects to dashboard after successful registration
        } catch (error) {
            console.error("Registration error:", error.response?.data?.message || "An error occurred");
            setError('Registration failed. Please try again.');
        }
    };

    // Handles the login process
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(userDetails.email, userDetails.password);
            console.log(response); // Consider logging response or using it to manage application state
            navigate('/dashboard'); // Redirects to dashboard after successful login
        } catch (error) {
            console.error("Login error:", error.response?.data?.message || "An error occurred");
            setError('Login failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="content-center">
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="wrapper">
                    <div className="card-switch">
                        <label className="switch">
                            <input type="checkbox" className="toggle" onChange={handleToggleView} checked={!isLoginView} />
                            <span className="slider"></span>
                            <span className="card-side"></span>
                            <div className="flip-card__inner" style={{ transform: isLoginView ? 'rotateY(0)' : 'rotateY(180deg)' }}>
                                <div className="flip-card__front">
                                    {/* Login Form */}
                                    <div className="title">Log in</div>
                                    <form className="flip-card__form" onSubmit={handleLogin}>
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" value={userDetails.email} onChange={handleChange} />
                                        <input className="flip-card__input" name="password" placeholder="Password" type="password" autoComplete="current-password" value={userDetails.password} onChange={handleChange} />
                                        <button className="flip-card__btn" type="submit">Let's go!</button>
                                    </form>
                                </div>
                                <div className="flip-card__back">
                                    {/* Signup Form */}
                                    <div className="title">Sign up</div>
                                    <form className="flip-card__form" onSubmit={handleRegister}>
                                        <input className="flip-card__input" name="name" placeholder="Name" type="text" value={userDetails.name} onChange={handleChange} />
                                        <input className="flip-card__input" name="email" placeholder="Email" type="email" value={userDetails.email} onChange={handleChange} />
                                        <input className="flip-card__input" name="password" placeholder="Password" type="password" autoComplete="new-password" value={userDetails.password} onChange={handleChange} />
                                        <button className="flip-card__btn" type="submit">Confirm!</button>
                                    </form>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>
            </main>
            <footer>
                <div className="container">
                    <p>&copy; 2024 Tempus. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default LoginSignupPage;
