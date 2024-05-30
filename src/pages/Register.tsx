// src/pages/Register.tsx
import React, { useState } from 'react';
import { registerUser } from '../services/UserService';
import { User } from '../models/User';
import '../styling/LoginStyle.css'; // Import LoginStyle.css
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = new User(username, password, email);
        registerUser(user)
            .then(response => {
                console.log('Registered successfully');
                navigate('/'); // Navigate to the Login page
            })
            .catch(error => {
                console.error('Error registering: ', error);
            });
    };

    return (
        <div className='login-page-layout'>
            <h1 className='login-title'>Register</h1>
            <form onSubmit={handleSubmit}>
                <div className='login-field'>
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required />
                    <i className='bx bx-user'></i>
                </div>
                <div className='login-field'>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                    <i className='bx bx-lock-alt'></i>
                </div>
                <div className='login-field'>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    <i className='bx bx-envelope'></i>
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    );
};

export default Register;