const mongoose = require('mongoose');
const MONGO_URI = 'mongodb+srv://Aditya:Aadi010.@cluster0.g0l9d0y.mongodb.net/?appName=Cluster0';

mongoose.connect(MONGO_URI);

const Product = mongoose.model('Product', new mongoose.Schema({
    name: String, price: Number, description: String, category: String
}));

const seedData = [
    { name: "MacBook Pro M3", price: 1999, description: "Next-gen Apple Silicon power.", category: "Electronics" },
    { name: "Sony XM5 Headphones", price: 399, description: "Industry leading noise cancellation.", category: "Audio" },
    { name: "Mechanical Keyboard", price: 129, description: "RGB Backlit with Cherry MX Switches.", category: "Accessories" },
    { name: "Gaming Mouse", price: 79, description: "Ultra-fast response with 25k DPI.", category: "Accessories" },
    { name: "Curved Monitor 34\"", price: 549, description: "4K Ultra-wide immersive display.", category: "Electronics" },
    { name: "Smart Watch", price: 299, description: "Track your health and fitness.", category: "Wearables" }
];

const seedDB = async () => {
    await Product.deleteMany({}); // Clears old data
    await Product.insertMany(seedData);
    console.log("✅ Database Seeded Successfully!");
    process.exit();
};

seedDB();