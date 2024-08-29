import React, { useState, useEffect } from 'react';
import './SupplierPage.css';

function SupplierPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editForm, setEditForm] = useState(false); // New state for edit form
    const [newSupplier, setNewSupplier] = useState({
        supplierName: '',
        Contact: '',
        Address: '',
        Email: '',
    });
    const [editingSupplier, setEditingSupplier] = useState(null); // State for supplier being edited

    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch('http://localhost:5000/suppliers');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setSuppliers(data);
            } catch (error) {
                console.error('Error fetching supplier data:', error);
                window.alert('Error fetching supplier data: ' + error.message);
            }
        };

        fetchSuppliers();
    }, []);

    const handleAddSupplier = () => {
        setShowForm(true);
        setEditingSupplier(null); // Clear editing state when adding a new supplier
    };

    const handleEditSupplier = (supplier) => {
        setEditingSupplier(supplier);
        setNewSupplier({
            supplierName: supplier.supplierName,
            Contact: supplier.Contact,
            Address: supplier.Address,
            Email: supplier.Email,
        });
        setEditForm(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSupplier((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = editingSupplier
                ? `http://localhost:5000/suppliers/${editingSupplier.id}`
                : 'http://localhost:5000/suppliers';
            const method = editingSupplier ? 'PUT' : 'POST';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSupplier),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            if (editingSupplier) {
                setSuppliers((prev) =>
                    prev.map((supplier) =>
                        supplier.id === data.id ? data : supplier
                    )
                );
                setEditForm(false);
            } else {
                setSuppliers((prev) => [...prev, data]);
                setShowForm(false);
            }
            setNewSupplier({
                supplierName: '',
                Contact: '',
                Address: '',
                Email: '',
            });
        } catch (error) {
            console.error('Error adding or updating supplier:', error);
            window.alert('Error adding or updating supplier: ' + error.message);
        }
    };

    const handleRemove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/suppliers/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Network response was not ok');
            setSuppliers((prev) => prev.filter(supplier => supplier.id !== id));
        } catch (error) {
            console.error('Error removing supplier:', error);
            window.alert('Error removing supplier: ' + error.message);
        }
    };

    return (
        <div className="supplier-page">
            <h2>Suppliers</h2>
            <button className="add-supplier-button" onClick={handleAddSupplier}>
                Add Supplier
            </button>

            {(showForm || editForm) && (
                <form className="supplier-form" onSubmit={handleSubmit}>
                    <h3>{editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}</h3>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="supplierName"
                            value={newSupplier.supplierName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Contact:
                        <input
                            type="text"
                            name="Contact"
                            value={newSupplier.Contact}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Address:
                        <input
                            type="text"
                            name="Address"
                            value={newSupplier.Address}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="Email"
                            value={newSupplier.Email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit">{editingSupplier ? 'Update Supplier' : 'Add Supplier'}</button>
                    <button type="button" onClick={() => { setShowForm(false); setEditForm(false); }}>
                        Cancel
                    </button>
                </form>
            )}

            {suppliers.length > 0 ? (
                <ul className="supplier-list">
                    {suppliers.map(supplier => (
                        <li key={supplier.id} className="supplier-item">
                            <p><strong>ID:</strong> {supplier.id}</p>
                            <p><strong>Name:</strong> {supplier.supplierName}</p>
                            <p><strong>Contact:</strong> {supplier.Contact}</p>
                            <p><strong>Address:</strong> {supplier.Address}</p>
                            <p><strong>Email:</strong> {supplier.Email}</p>
                            <button className="edit-button" onClick={() => handleEditSupplier(supplier)}>Edit</button>
                            <button className="remove-button" onClick={() => handleRemove(supplier.id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No suppliers available</p>
            )}
        </div>
    );
}

export default SupplierPage;
