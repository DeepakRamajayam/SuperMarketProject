import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './Header.css';
import { logout } from '../redux/authSlice';

function Header({ onSidebarToggle }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate


    const handleLogout = () => {
        dispatch(logout());
        navigate('/login'); // Navigate to the login page after logout
    };

    return (
        <header>
            <div className="header-content">
                <button className="sidebar-toggle-button" onClick={onSidebarToggle}>
                    ☰
                </button>
                <div className="logo">Supermarket System</div>
                <div className="auth-buttons">
                    {isAuthenticated ? (
                        <>
                            <button onClick={handleLogout} className="bb" style={{ textDecoration: 'none'}}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="button" style={{ textDecoration: 'none' }}>Admin Login</Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
