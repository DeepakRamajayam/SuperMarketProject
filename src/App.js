import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar'; // Import the Sidebar component
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import Customers from './pages/Customers';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminLoginPage from './pages/AdminLoginPage';
import SupplierPage from './pages/SupplierPage';
import Employees from './pages/Employees'; // Import the Employees component
import './App.css'; // Add this import for global styles

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Router>
            <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
            <Header onSidebarToggle={toggleSidebar} />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/sales" element={<div>Sales Page</div>} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/purchases" element={<div>Purchasing Page</div>} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/admin" element={<AdminLoginPage />} />
                    <Route path="/suppliers" element={<SupplierPage />} />
                    <Route path="/employees" element={<Employees />} /> {/* Add this line */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
