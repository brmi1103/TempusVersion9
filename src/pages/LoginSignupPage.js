import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import authService from '../services/authService';

const LoginSignupPage = () => {
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input changes for form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails({ ...loginDetails, [name]: value });
    };

    // Handle the login process
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await authService.login(loginDetails.email, loginDetails.password);
            if (response.token) {
                // Optionally store the token in local storage
                localStorage.setItem('userToken', response.token);
                navigate('/dashboard'); // Redirects to dashboard after successful login
            }
        } catch (error) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <>
            <Navbar />
            <main className="content-center">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleLogin} className="login-form">
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={loginDetails.email}
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
                            value={loginDetails.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </main>
        </>
    );
};

export default LoginSignupPage;
