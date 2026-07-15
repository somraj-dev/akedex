const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ─── Step 1: Kill any process hogging port 3002 (native Windows) ───
console.log('🧹 Clearing port 3002 to prevent address conflict...');
try {
  // Use native Windows netstat + taskkill instead of npx kill-port
  const result = execSync(
    'powershell -Command "Get-NetTCPConnection -LocalPort 3002 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess"',
    { encoding: 'utf8', timeout: 5000 }
  ).trim();
  if (result) {
    const pids = [...new Set(result.split(/\r?\n/).map(p => p.trim()).filter(Boolean))];
    for (const pid of pids) {
      try {
        execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore', timeout: 3000 });
        console.log(`   Killed PID ${pid}`);
      } catch (e) { /* process may already be gone */ }
    }
    // Small delay to let the OS release the port
    execSync('powershell -Command "Start-Sleep -Milliseconds 500"', { stdio: 'ignore' });
  }
} catch (err) {
  // Port is already free, nothing to kill
}

// ─── Step 2: Clear stale Electron GPU cache ───
console.log('🗑️  Clearing stale Electron GPU cache...');
const electronCacheDir = path.join(
  process.env.APPDATA || path.join(require('os').homedir(), 'AppData', 'Roaming'),
  'frontend' // Electron uses the package.json "name" field as the app name
);
const gpuCachePath = path.join(electronCacheDir, 'GPUCache');
const cachePath = path.join(electronCacheDir, 'Cache');
const codeCachePath = path.join(electronCacheDir, 'Code Cache');

for (const dir of [gpuCachePath, cachePath, codeCachePath]) {
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`   Cleared: ${path.basename(dir)}`);
    }
  } catch (e) { /* ignore if locked */ }
}

// ─── Step 3: Start Next.js dev server ───
console.log('🚀 Starting Acadex Next.js Development Server on port 3002...');

const nextDev = spawn('npx', ['next', 'dev', '-p', '3002'], {
  stdio: 'inherit',
  shell: true
});

console.log('⏳ Waiting for server to initialize...');

// ─── Step 4: Wait for compilation, then launch Electron ───
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
}, 5000);
