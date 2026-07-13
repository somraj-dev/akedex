const { spawn } = require('child_process');

console.log('🚀 Starting Acadex Next.js Development Server on port 3002...');

// Start Next.js dev server on port 3002
const nextDev = spawn('npx', ['next', 'dev', '-p', '3002'], {
  stdio: 'inherit',
  shell: true
});

console.log('⏳ Waiting for server to initialize...');

// Wait 4 seconds for Next.js compilation, then launch Electron window
setTimeout(() => {
  console.log('🖥️ Spawning Electron window shell...');
  const electronProc = spawn('npx', ['electron', '.'], {
    stdio: 'inherit',
    shell: true
  });

  // When Electron is closed, terminate Next.js dev server as well
  electronProc.on('exit', () => {
    console.log('👋 Electron closed. Shutting down servers...');
    nextDev.kill('SIGINT');
    process.exit(0);
  });
}, 4500);
