// src/pages/Login.tsx
import React, { useState } from 'react';
import { loginUser } from '../services/UserService';
import { User } from '../models/User';
import '../styling/LoginStyle.css';
import { useNavigate, Link } from 'react-router-dom'; // Import Link

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = new User(username, password);
        loginUser(user)
            .then(response => {
                console.log('Logged in successfully');
                onLogin();
                navigate('/home');
            })
            .catch(error => {
                console.error('Error logging in: ', error);
            });
    };

    return (
        <div className='login-page-layout'>
            <h1 className='login-title'>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className='login-field'>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    <i className='bx bx-user'></i>
                </div>
                <div className='login-field'>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <i className='bx bx-lock-alt'></i>
                </div>
                <input type="submit" value="Login" />
            </form>
            <div>
                Don't have an account? <Link to="/register">Register now.</Link>
            </div>
        </div>
    );
};

export default Login;