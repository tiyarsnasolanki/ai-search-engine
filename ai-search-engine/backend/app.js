const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./db');
const aiContentRoutes = require('./routes/aiContentRoutes');
const indexRoutes = require('./routes/indexRoutes');
require('dotenv').config();

const app = express();

// ✅ Allowed frontend origins (include all trusted URLs)
const allowedOrigins = [
  'https://ai-search-engine-gules.vercel.app',
  'https://ai-search-engine-sand.vercel.app',
  'http://localhost:3000'
];

// ✅ CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow no origin (e.g., curl, mobile apps) or allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin: ' + origin));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// ✅ Enable CORS for all routes with custom options
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Preflight requests support

// ✅ Middleware to handle JSON and URL-encoded data
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// ✅ Connect to MongoDB
connectDB();

// ✅ API Routes
app.use('/api/ai-content', aiContentRoutes);
app.use('/api/users', indexRoutes);

// ✅ Health check route
app.get('/', (req, res) => {
  res.send('Welcome to My API');
});

// ✅ Error handler for CORS errors
app.use((err, req, res, next) => {
  if (err.message && err.message.includes('CORS')) {
    return res.status(403).json({ message: 'CORS error: Origin not allowed' });
  }
  next(err);
});

// ✅ General error handler
app.use((err, req, res, next) => {
  console.error('Unexpected Error:', err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// ✅ Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Allowed Origins:', allowedOrigins);
  console.log('Environment:', process.env.NODE_ENV);
});
