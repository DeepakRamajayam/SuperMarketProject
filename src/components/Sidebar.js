import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Sidebar.css';

function Sidebar({ isOpen, onClose }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return (
        <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-content">
                <div className="logo">Mart</div>
                <nav className="nav-links">
                    <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/customers" style={{ textDecoration: 'none' }}>Customers</Link>
                            <Link to="/employees" style={{ textDecoration: 'none' }}>Employees</Link>
                        </>
                    )}
                    <Link to="/inventory" style={{ textDecoration: 'none' }}>Inventory</Link>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;
