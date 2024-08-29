import React, { useState, useEffect } from 'react';
import './Customers.css';
import axios from 'axios';

function Customers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleRemoveCustomer = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:8000/users/${id}/`);

            if (response.status === 204) { // 204 No Content indicates successful deletion
                fetchCustomers(); // Refresh customer list
            } else {
                console.error('Error removing customer');
            }
        } catch (error) {
            console.error('Error removing customer:', error);
        }
    };

    return (
        <div className="customers-page">
            <div className="customer-list">
                <h2>Customer List</h2>
                <ul>
                    {customers.map((customer) => (
                        <li key={customer.id}>
                            <div className="customer-details">
                                <p><strong>Username: </strong>
                                {customer.username ? customer.username : customer.name}</p>
                                <p><strong>Email: </strong>
                                {customer.email}</p>
                            </div>
                            <button 
                                className="remove-button" 
                                onClick={() => handleRemoveCustomer(customer.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Customers;
