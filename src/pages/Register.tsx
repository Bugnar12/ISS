import React, { useState } from 'react';
import { registerUser } from '../services/UserService';
import { User } from '../models/User';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user = new User(username, password, email);
        registerUser(user)
            .then(response => {
                console.log('Registered successfully');
            })
            .catch(error => {
                console.error('Error registering: ', error);
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
            <label>
                Email:
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>
            <input type="submit" value="Register" />
        </form>
    );
};

export default Register;