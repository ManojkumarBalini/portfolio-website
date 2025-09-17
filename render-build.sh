#!/bin/bash

# Build script for Render static deployment
echo "Starting build process..."

# Install dependencies
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Fix permissions
echo "Fixing permissions..."
chmod -R +x node_modules/.bin/

# Build the React application
echo "Building React application..."
npm run build

# Check if build was successful
if [ -d "build" ]; then
    echo "Build completed successfully!"
    echo "Build files are in the 'build' directory"
    
    # Create _redirects for client-side routing
    echo "/* /index.html 200" > build/_redirects
else
    echo "Build failed!"
    exit 1
fi

echo "Build script completed!"
