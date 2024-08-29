import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Log the isAuthenticated state whenever it changes
  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:8000/users/');
      const users = response.data;

      const user = users.find(u => u.username === username && u.password === password);

      if (user) {
        // Increment visit count
        const updatedUser = { ...user, visitCount: (user.visitCount || 0) + 1 };

        await axios.put(`http://localhost:8000/users/${user.id}/`, updatedUser, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Dispatch login action
        dispatch(login(user));
        window.alert('Login successful');
        navigate('/'); // Redirect to the home page or dashboard
      } else {
        window.alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      window.alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <main>
      <h2>Login</h2>
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
        <a href="/signup">Add New Admin. click here!</a>
      </form>
    </main>
  );
}

export default LoginPage;
