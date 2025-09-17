#!/bin/bash

# Build script for Render deployment
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the React application
echo "Building React application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "Build completed successfully!"
    echo "Build files are in the 'build' directory"
else
    echo "Build failed!"
    exit 1
fi

# Create necessary directories for Express server
echo "Setting up server structure..."
mkdir -p server

# Copy server files to the build directory (if needed)
cp server.js build/
cp package.json build/

echo "Build script completed!"
