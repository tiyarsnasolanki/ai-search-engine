const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const aiContentRoutes = require('./routes/aiContentRoutes');
const indexRoutes = require('./routes/indexRoutes');
require('dotenv').config();

const app = express();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'https://ai-search-engine-gules.vercel.app' // ✅ Your current frontend deployment
];

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable cookies for cross-origin requests
  preflightContinue: false, 
  optionsSuccessStatus: 204 // For legacy browsers (IE11, etc.)
};

// ✅ Enable CORS for all routes
app.use(cors(corsOptions));

// ✅ Preflight support (OPTIONS requests for preflight)
app.options('*', cors());

// ✅ Middleware to handle JSON and URL-encoded data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api/ai-content', aiContentRoutes);
app.use('/api/users', indexRoutes);

// ✅ Health check route (to check if server is alive)
app.get('/', (req, res) => {
  res.send('Welcome to My API');
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
