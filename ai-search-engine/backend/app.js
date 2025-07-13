const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const aiContentRoutes = require('./routes/aiContentRoutes');
const indexRoutes = require('./routes/indexRoutes');
require('dotenv').config();

const app = express();

// ✅ Dynamic Allowed frontend origins based on environment
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? ['https://ai-search-engine-gules.vercel.app'] // Production Frontend URL
  : ['http://localhost:3000', 'https://ai-search-engine-sand.vercel.app']; // Localhost and dev URLs

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin ' + origin), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Enable cookies for cross-origin requests
  preflightContinue: false,
  optionsSuccessStatus: 204, // For legacy browsers (IE11, etc.)
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

// ✅ Error Handling Middleware for CORS
app.use((err, req, res, next) => {
  if (err.name === 'CorsError') {
    return res.status(403).json({ message: 'CORS error: Origin not allowed' });
  }
  next(err);
});

// ✅ General Error Handler for unexpected errors
app.use((err, req, res, next) => {
  console.error('Unexpected Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
