import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import authService from '../services/authService';

const LoginSignupPage_Register = () => {
    const [userDetails, setUserDetails] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handles input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    // Handles the registration process
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.register(userDetails);
            if (response.token) {
                // Optionally store the token in local storage
                localStorage.setItem('userToken', response.token);
                navigate('/dashboard'); // Redirects to dashboard after successful registration
            }
        } catch (error) {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="content-center">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </main>
        </>
    );
};

export default LoginSignupPage_Register;
