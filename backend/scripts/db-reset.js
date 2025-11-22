
// db-reset.js (Node.js version)
// Drops, recreates, migrates and seeds the local database for development.
// WARNING: This is destructive. Use only for local/dev setups.

const fs = require('fs');
const path = require('path');
const { execSync, spawnSync } = require('child_process');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const ROOT_DIR = path.resolve(__dirname, '..');
process.chdir(ROOT_DIR);

const args = process.argv.slice(2);
const SEED = args.includes('--seed') || process.env.SEED === 'true';
const CI = process.env.CI === 'true';
const FORCE = process.env.FORCE === 'true';

function promptConfirm() {
  if (CI || FORCE) return true;
  const readline = require('readline-sync');
  const ans = readline.question('This will DESTROY and RESET the local database. Continue? [y/N] ');
  if (/^y(es)?$/i.test(ans)) return true;
  console.log('Aborting.');
  process.exit(1);
}

function fileExists(p) {
  try { return fs.existsSync(p); } catch { return false; }
}

function run(cmd, opts = {}) {
  try {
    execSync(cmd, { stdio: 'inherit', ...opts });
    return true;
  } catch (e) {
    return false;
  }
}

function resetWithDockerCompose() {
  const composePath = path.join(ROOT_DIR, 'docker', 'docker-compose.yml');
  if (!fileExists(composePath)) {
    console.log('docker/docker-compose.yml not found. Skipping docker reset.');
    return false;
  }
  console.log('Found docker/docker-compose.yml - using docker-compose to reset DB');
  run(`docker-compose -f docker/docker-compose.yml down -v --remove-orphans`);
  run(`docker-compose -f docker/docker-compose.yml up -d`);

  // Wait for Postgres to be ready
  process.stdout.write('Waiting for Postgres to be ready...');
  let ready = false;
  for (let i = 0; i < 60; i++) {
    const res = spawnSync('docker-compose', ['-f', 'docker/docker-compose.yml', 'exec', '-T', 'db', 'pg_isready', '-U', process.env.POSTGRES_USER || 'postgres'], { stdio: 'ignore' });
    if (res.status === 0) { ready = true; break; }
    process.stdout.write('.');
    require('child_process').execSync('timeout 1');
  }
  process.stdout.write('\n');
  if (!ready) {
    console.log('Postgres did not become ready in time.');
    return false;
  }

  console.log('Running migrations inside container');
  run('docker-compose -f docker/docker-compose.yml exec -T backend npx prisma migrate deploy');

  if (SEED) {
    console.log('Running seed inside container');
    run('docker-compose -f docker/docker-compose.yml exec -T backend node prisma/seed.js');
  }
  console.log('Docker compose reset completed.');
  return true;
}

function resetLocalPostgres() {
  console.log('Attempting local Postgres reset using prisma');
  if (!run('npx --version')) {
    console.error('npx not found. Please install Node.js and ensure npx is in PATH.');
    process.exit(1);
  }
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set in the environment. Cannot reset local DB.');
    process.exit(1);
  }
  console.log('Running: npx prisma migrate reset --skip-seed --force');
  run('npx prisma migrate reset --skip-seed --force');

  if (SEED) {
    console.log('Running seed script');
    if (fileExists('prisma/seed.ts')) {
      if (run('ts-node --version')) {
        run('ts-node prisma/seed.ts');
      } else {
        run('npx ts-node prisma/seed.ts');
      }
    } else if (fileExists('prisma/seed.js')) {
      run('node prisma/seed.js');
    } else {
      console.log('No seed script found at prisma/seed.ts or prisma/seed.js; skipping seed.');
    }
  }
  console.log('Local Postgres reset completed.');
}

// Main
promptConfirm();
if (!resetWithDockerCompose()) {
  console.log('Falling back to local Postgres reset.');
  resetLocalPostgres();
} else {
  console.log('Reset via docker-compose succeeded.');
}
console.log('DB reset finished.');

console.log(`\nNotes:\n- This script is destructive. Use only for local development.\n- To run without prompt in CI, set CI=true or FORCE=true in environment.\n- To include seeding, pass --seed or set SEED=true.\n`);
