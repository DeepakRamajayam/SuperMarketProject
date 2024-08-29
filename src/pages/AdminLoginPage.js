import React, { useState } from 'react';
import './AdminLoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get('http://localhost:8000/admins/');
            const admins = response.data;

            const admin = admins.find(a => a.username === username && a.password === password);

            if (admin) {
                window.alert('Admin login successful');
                navigate("/admin/dashboard");
            } else {
                window.alert('Invalid admin credentials');
            }
        } catch (error) {
            console.error('Error during admin login:', error);
            window.alert('An error occurred during login. Please try again.');
        }
    };

    return (
        <main>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </main>
    );
}

export default AdminLoginPage;
