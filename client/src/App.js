import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Using your specific Render URL
        axios.get('https://experiment-2-3-1.onrender.com/api/products')
            .then(res => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', paddingBottom: '50px' }}>
            <nav className="navbar navbar-dark bg-dark shadow-sm mb-5">
                <div className="container">
                    <span className="navbar-brand fw-bold">✨ Aditya's Digital Store</span>
                </div>
            </nav>

            <div className="container">
                {loading ? (
                    <div className="text-center mt-5">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p className="mt-3 fw-bold">Loading Premium Catalog...</p>
                    </div>
                ) : (
                    <div className="row">
                        {products.map(p => (
                            <div className="col-md-4 mb-4" key={p._id}>
                                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                                    <div className="card-body p-4">
                                        <span className="badge bg-primary-soft text-primary mb-2" style={{ backgroundColor: '#e7f1ff' }}>{p.category || 'New Arrival'}</span>
                                        <h4 className="card-title fw-bold">{p.name}</h4>
                                        <p className="text-muted small">{p.description}</p>
                                        <div className="d-flex justify-content-between align-items-center mt-4">
                                            <h3 className="text-success mb-0">${p.price}</h3>
                                            <button className="btn btn-dark px-4" style={{ borderRadius: '10px' }}>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;