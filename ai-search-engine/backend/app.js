const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require("body-parser");
const connectDB = require('./db'); 
const aiContentRoutes = require("./routes/aiContentRoutes");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/indexRoutes");

dotenv.config();
const app = express();

// ✅ Configure CORS to allow BOTH localhost and Vercel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://ai-search-engine-8w9s-kx4535plp-tiyarsnasolankis-projects.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Increase the JSON payload limit to 10MB
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

connectDB();

// Route prefixes
app.use("/api/ai-content", aiContentRoutes);  
app.use("/api/users", indexRoutes); 

app.get("/", (req, res) => {
  res.send("Welcome to My API");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
