const { execSync } = require('child_process');
const fs = require('fs');

console.log('Starting Render build process...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Fix permissions
  console.log('Fixing permissions...');
  if (fs.existsSync('node_modules/.bin/react-scripts')) {
    fs.chmodSync('node_modules/.bin/react-scripts', '755');
  }
  
  // Build the app
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
