const { execSync } = require('child_process');
const fs = require('fs');

console.log('Running pre-build script...');

try {
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  // Fix permissions for react-scripts
  console.log('Fixing permissions...');
  const reactScriptsPath = 'node_modules/.bin/react-scripts';
  if (fs.existsSync(reactScriptsPath)) {
    fs.chmodSync(reactScriptsPath, '755');
    console.log('Fixed permissions for react-scripts');
  }
  
  // Build the app
  console.log('Building application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Pre-build script completed successfully!');
} catch (error) {
  console.error('Pre-build script failed:', error);
  process.exit(1);
}
