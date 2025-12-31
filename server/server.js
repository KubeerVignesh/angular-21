const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Debug middleware - logs requests and adds debug headers
app.use((req, res, next) => {
  // Log request details
  if (req.path.includes('/api/auth/login')) {
    console.log(`\n📥 ${req.method} ${req.path}`);
    console.log('Request body:', JSON.stringify(req.body, null, 2));
  }

  // Add debug headers to response (visible in browser Network tab)
  res.setHeader('X-Debug-Request-Path', req.path);
  res.setHeader('X-Debug-Request-Method', req.method);

  next();
});

// Enable CORS
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running...',
    endpoints: {
      auth: {
        signup: 'POST /api/auth/signup',
        login: 'POST /api/auth/login',
        getMe: 'GET /api/auth/me (Protected)',
      },
      products: {
        getAll: 'GET /api/products',
        getOne: 'GET /api/products/:id',
        create: 'POST /api/products (Protected)',
        update: 'PUT /api/products/:id (Protected)',
        delete: 'DELETE /api/products/:id (Protected)',
      },
    },
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error',
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;
