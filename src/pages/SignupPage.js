import React, { useState } from 'react';
import './SignupPage.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import axios from 'axios';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post('http://localhost:8000/users/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      dispatch(login(data)); // Log in the user after successful signup
      window.alert('Signup successful');
      navigate('/'); // Redirect to the home page or dashboard
    } catch (error) {
      console.error('Error during signup:', error);
      window.alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <main>
      <h2>Signup</h2>
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
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Signup</button>
        <a href="/login">Already have an account? Login</a>
      </form>
    </main>
  );
}

export default SignupPage;
