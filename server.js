const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const http = require('http');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'build')));

// API routes (if you need any)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Portfolio server is running',
    timestamp: new Date().toISOString()
  });
});

// Handle client-side routing - return index.html for all routes
app.get('*', (req, res) => {
  // Check if the request is for a static file
  if (req.path.includes('.')) {
    const filePath = path.join(__dirname, 'build', req.path);
    
    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File doesn't exist, serve index.html for client-side routing
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      } else {
        // File exists, serve it
        res.sendFile(filePath);
      }
    });
  } else {
    // Not a file request, serve index.html for client-side routing
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Create server
const server = http.createServer(app);

// Start server
server.listen(PORT, '0.0.0.0', () => {
  console.log(`
  🚀 Portfolio Server Started!
  📍 Port: ${PORT}
  🌐 Environment: ${process.env.NODE_ENV || 'development'}
  🕒 Time: ${new Date().toLocaleString()}
  📊 Process ID: ${process.pid}
  `);
  
  // Log available routes in development
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n📋 Available Routes:');
    console.log('GET  /api/health     - Health check endpoint');
    console.log('GET  /*              - Serve React application');
  }
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n🔻 Received SIGINT. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed. Process terminated.');
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  console.log('\n🔻 Received SIGTERM. Shutting down gracefully...');
  server.close(() => {
    console.log('✅ Server closed. Process terminated.');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('💥 Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

module.exports = app;
