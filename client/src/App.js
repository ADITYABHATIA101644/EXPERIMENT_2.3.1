import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetching from your live Render URL
        const fetchData = async () => {
            try {
                const response = await axios.get('https://experiment-2-3-1.onrender.com/api/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to connect to the API. Please check if the server is up.");
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}></div>
            <h5 className="mt-3 text-secondary animate-pulse">Synchronizing Data...</h5>
        </div>
    );

    if (error) return (
        <div className="container mt-5">
            <div className="alert alert-danger shadow-lg border-0" role="alert">
                <h4 className="alert-heading">⚠️ Connection Error</h4>
                <p>{error}</p>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#f4f7fe', minHeight: '100vh' }}>
            {/* Professional Header */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-gradient shadow-sm" style={{ background: 'linear-gradient(90deg, #4e73df 0%, #224abe 100%)' }}>
                <div className="container">
                    <span className="navbar-brand fw-bold fs-3">🚀 Inventory Dashboard</span>
                    <span className="badge bg-light text-primary py-2 px-3">Live Integration</span>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    {products.map((product) => (
                        <div className="col-12 mb-5" key={product._id}>
                            <div className="card border-0 shadow-lg" style={{ borderRadius: '20px' }}>
                                <div className="card-header bg-white border-0 py-4 px-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h2 className="fw-bold text-dark mb-1">{product.name}</h2>
                                            <span className="badge rounded-pill bg-info text-white px-3">{product.category}</span>
                                        </div>
                                        <div className="text-end text-muted">
                                            <small>Product ID: {product._id.substring(0, 8)}...</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-4 pb-4">
                                    <h5 className="text-secondary mb-3 fw-bold">Available Variants</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover align-middle">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>SKU</th>
                                                    <th>Color</th>
                                                    <th>Price</th>
                                                    <th>Stock Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {product.variants.map((variant) => (
                                                    <tr key={variant._id}>
                                                        <td className="fw-mono text-primary">{variant.sku}</td>
                                                        <td>
                                                            <span className={`badge border text-dark bg-light px-3`}>
                                                                {variant.color}
                                                            </span>
                                                        </td>
                                                        <td className="fw-bold text-success">${variant.price}</td>
                                                        <td>
                                                            {variant.stock > 10 ? (
                                                                <span className="text-success">● In Stock ({variant.stock})</span>
                                                            ) : (
                                                                <span className="text-warning">● Low Stock ({variant.stock})</span>
                                                            )}
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-outline-primary btn-sm rounded-pill px-3">Order</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;