// HomePage.js
import React from 'react';
import './HomePage.css';

function HomePage() {
    return (
        <div className="home-page">
            <div className="container">
                <div className="header">Welcome to the Supermarket Management System</div>
                <div className="section">
                    <h2>About Us</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ac ligula nec velit interdum.</p>
                </div>
                <div className="section">
                    <h2>Our Services</h2>
                    <p>Vestibulum nec eros malesuada, venenatis velit ut, gravida mauris. Duis nec libero purus.</p>
                </div>
                <div className="section">
                    <h2>Contact Us</h2>
                    <p>Nullam eget orci sed odio dictum interdum. Sed ut turpis a augue iaculis dictum.</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
