import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './InventoryPage.css';
import axios from 'axios';

function InventoryPage() {
    const [products, setProducts] = useState([]);
    const [barcode, setBarcode] = useState('');
    const [filteredProduct, setFilteredProduct] = useState(null);
    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        barcode: '',
        product_name: '',
        product_price: '',
        current_stock: '',
    });

    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseProducts = await axios.get('http://127.0.0.1:8000/products/');
                setProducts(responseProducts.data);
            } catch (error) {
                window.alert('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleBarcodeChange = (e) => {
        setBarcode(e.target.value);
        const product = products.find(p => p.barcode === e.target.value);
        setFilteredProduct(product || null);
    };

    const formatPrice = (price) => {
        const numPrice = parseFloat(price);
        return isNaN(numPrice) ? 'N/A' : numPrice.toFixed(2);
    };

    const handleAddProduct = () => {
        setShowAddProductForm(!showAddProductForm);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/products/', newProduct, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.status === 201) {
                setProducts(prevProducts => [...prevProducts, response.data]);
                setShowAddProductForm(false);
                setNewProduct({
                    barcode: '',
                    product_name: '',
                    product_price: '',
                    current_stock: '',
                });
            } else {
                window.alert('Error adding product');
            }
        } catch (error) {
            window.alert('Error:', error);
        }
    };

    return (
        <div className="inventory-page">
            <h2>Inventory</h2>
            <div className="barcode-search">
                <input
                    type="text"
                    value={barcode}
                    onChange={handleBarcodeChange}
                    placeholder="Scan or enter barcode"
                />
            </div>

            {filteredProduct && (
                <div className="product-details">
                    <h3>Product Details</h3>
                    <p><strong>Barcode:</strong> {filteredProduct.barcode}</p>
                    <p><strong>Name:</strong> {filteredProduct.product_name}</p>
                    <p><strong>Price:</strong> ${formatPrice(filteredProduct.product_price)}</p>
                    <p><strong>Current Stock:</strong> {filteredProduct.current_stock || 'N/A'}</p>
                </div>
            )}

            <div className="product-list">
                <h3>All Products</h3>
                {isAuthenticated && (
                    <div className="action-buttons">
                        <button className="add-product-button" onClick={handleAddProduct}>
                            Add Product
                        </button>
                    </div>
                )}
                {showAddProductForm && (
                    <form className="add-product-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="barcode"
                            value={newProduct.barcode}
                            onChange={handleInputChange}
                            placeholder="Barcode"
                            required
                        />
                        <input
                            type="text"
                            name="product_name"
                            value={newProduct.product_name}
                            onChange={handleInputChange}
                            placeholder="Product Name"
                            required
                        />
                        <input
                            type="number"
                            name="product_price"
                            value={newProduct.product_price}
                            onChange={handleInputChange}
                            placeholder="Product Price"
                            required
                        />
                        <input
                            type="number"
                            name="current_stock"
                            value={newProduct.current_stock}
                            onChange={handleInputChange}
                            placeholder="Current Stock"
                            required
                        />
                        <button type="submit" className="submit-button">Add Product</button>
                    </form>
                )}
                {products.length > 0 ? (
                    <ul>
                        {products.map(product => (
                            <li key={product.barcode} className="product-item">
                                <p><strong>Barcode:</strong> {product.barcode}</p>
                                <p><strong>Name:</strong> {product.product_name}</p>
                                <p><strong>Price:</strong> ${formatPrice(product.product_price)}</p>
                                <p><strong>Current Stock:</strong> {product.current_stock || 'N/A'}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </div>
    );
}

export default InventoryPage;
