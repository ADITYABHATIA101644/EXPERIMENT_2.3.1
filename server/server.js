const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Aditya:Aadi010.@cluster0.g0l9d0y.mongodb.net/?appName=Cluster0';
mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("DB Error: ", err));

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    category: String
});
const Product = mongoose.model('Product', productSchema);

// --- ROUTES ---

// 1. Root Route (What you see when you click the Render link)
app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.send(`
            <div style="font-family: sans-serif; padding: 20px; line-height: 1.6;">
                <h1 style="color: #0d6efd;">🚀 Backend API is Live</h1>
                <p><strong>Database:</strong> Connected to Cluster0</p>
                <p><strong>Total Products:</strong> ${products.length}</p>
                <hr>
                <h3>Raw JSON Data Preview:</h3>
                <pre style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${JSON.stringify(products, null, 2)}</pre>
            </div>
        `);
    } catch (err) {
        res.send("Server is live, but check MongoDB connection.");
    }
});

// 2. API Route (Used by React)
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));