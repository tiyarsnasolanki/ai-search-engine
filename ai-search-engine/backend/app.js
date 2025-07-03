// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const aiContentRoutes = require('./routes/aiContentRoutes');
const indexRoutes = require('./routes/indexRoutes');
require('dotenv').config();

const app = express();

// ✅ Dynamic CORS whitelist
const allowedOrigins = [
  'http://localhost:5173',
  'https://ai-search-engine-8w9s-kx4535plp-tiyarsnasolankis-projects.vercel.app',
  'https://ai-search-engine-hwdi.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin ' + origin));
    }
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Handle pre-flights
app.options('*', cors());

// Increase JSON payload limit
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// DB & Routes
connectDB();
app.use('/api/ai-content', aiContentRoutes);
app.use('/api/users', indexRoutes);

app.get('/', (req, res) => res.send('Welcome to My API'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
