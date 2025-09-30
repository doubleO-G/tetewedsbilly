const { spawn } = require('child_process');

// Start backend server
const backend = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env }
});

// Start frontend dev server  
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  env: { ...process.env }
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down servers...');
  backend.kill();
  frontend.kill();
  process.exit();
});

// Handle backend exit
backend.on('exit', (code) => {
  console.log(`Backend exited with code ${code}`);
  frontend.kill();
  process.exit(code);
});

// Handle frontend exit  
frontend.on('exit', (code) => {
  console.log(`Frontend exited with code ${code}`);
  backend.kill();
  process.exit(code);
});

console.log('Starting backend and frontend servers...');