import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRoutes from './routes/authRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import dojahRoutes from './routes/dojahRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Logging & Parsing Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

// Root Test Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to AdeTech Banking API'
  });
});

// System Health Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'AdeTech Digital Banking Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Primary Banking API Routes
app.use('/api/auth', authRoutes);
app.use('/api/account', accountRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/dojah', dojahRoutes);

// 404 Fallback Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.originalUrl} not found on AdeTech API server.`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server on 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(' AdeTech Digital Banking Backend API Server Running ');
  console.log(` Environment : ${process.env.NODE_ENV || 'development'}`);
  console.log(` Port        : ${PORT}`);
  console.log(` Root URL    : http://localhost:${PORT}/`);
  console.log(` Health URL  : http://localhost:${PORT}/api/health`);
  console.log(` Client URL  : ${process.env.CLIENT_URL || 'http://localhost:5173'}`);
  console.log('====================================================');
});

export default app;