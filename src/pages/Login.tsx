// src/pages/Login.tsx
import React, { useState } from 'react';
import { loginUser } from '../services/UserService';
import { User } from '../models/User';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = new User(username, password);
        loginUser(user)
            .then(response => {
                console.log('Logged in successfully');
                onLogin();
            })
            .catch(error => {
                console.error('Error logging in: ', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>
            <input type="submit" value="Login" />
        </form>
    );
};

export default Login;