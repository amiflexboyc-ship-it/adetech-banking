import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(__dirname, 'AdeTche-banking');

console.log('Building AdeTech Banking from root...');
if (!fs.existsSync(path.join(frontendDir, 'node_modules'))) {
  console.log('Installing frontend dependencies...');
  execSync('npm install', { cwd: frontendDir, stdio: 'inherit' });
}
execSync('npm run build', { cwd: frontendDir, stdio: 'inherit' });
console.log('Root build complete.');
