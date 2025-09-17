#!/bin/bash

# Custom build script for Render
echo "Starting custom build process..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Fix permissions for react-scripts
echo "Fixing permissions..."
find node_modules/.bin -name "react-scripts" -exec chmod +x {} \; || true

# Build the React app
echo "Building application..."
npm run build

echo "Build completed successfully!"
