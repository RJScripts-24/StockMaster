#!/usr/bin/env bash
# scripts/start.sh
# Start script for StockMaster backend
# Usage:
#   ./scripts/start.sh [dev|prod|migrate-only] [--seed]
# Examples:
#   ./scripts/start.sh dev           # start in development (ts-node-dev if available)
#   ./scripts/start.sh prod          # run migrations and start production server
#   ./scripts/start.sh migrate-only --seed  # run migrations and seed DB, then exit

set -euo pipefail
IFS=$'\n\t'

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

MODE=${1:-dev}
SEED=false
if [[ "${2:-}" == "--seed" || "${3:-}" == "--seed" ]]; then
  SEED=true
fi

# Load .env if present
if [ -f ".env" ]; then
  echo "Loading .env"
  # shellcheck disable=SC1091
  set -a
  source .env
  set +a
fi

echo "Starting StockMaster backend (mode=$MODE)"

# Helpers
function run_migrations() {
  echo "-> Running database migrations"
  if command -v npx >/dev/null 2>&1; then
    # Production friendly: use deploy when running against a production-grade DB
    if [[ "$MODE" == "prod" ]]; then
      npx prisma migrate deploy
    else
      # For local/dev: apply migrations (create if not present)
      npx prisma migrate dev --name "auto-migrate" --skip-generate || true
    fi
  else
    echo "npx not found. Ensure Node.js is installed and available in PATH." >&2
    exit 1
  fi
}

function run_seed() {
  if [ "$SEED" = true ]; then
    echo "-> Running seed script"
    if command -v node >/dev/null 2>&1; then
      # try common paths
      if [ -f "prisma/seed.ts" ]; then
        # prefer ts-node for TypeScript seed if available
        if command -v ts-node >/dev/null 2>&1; then
          ts-node prisma/seed.ts
        elif command -v npx >/dev/null 2>&1; then
          npx ts-node prisma/seed.ts
        else
          echo "ts-node not found; cannot run TypeScript seed. Compile or provide JS seed." >&2
        fi
      elif [ -f "prisma/seed.js" ]; then
        node prisma/seed.js
      else
        echo "No seed script found at prisma/seed.ts or prisma/seed.js; skipping." 
      fi
    else
      echo "node not found. Cannot run seed." >&2
    fi
  fi
}

case "$MODE" in
  dev)
    echo "-> Development mode: using ts-node-dev or nodemon if available"

    # Run migrations in dev to keep schema up-to-date (non-destructive)
    run_migrations || true

    # Start dev server
    if command -v ts-node-dev >/dev/null 2>&1; then
      ts-node-dev --respawn --transpile-only src/index.ts
    elif command -v nodemon >/dev/null 2>&1 && [ -f package.json ]; then
      nodemon --watch "src" --exec "npx ts-node src/index.ts"
    elif command -v npx >/dev/null 2>&1; then
      npx ts-node src/index.ts
    else
      echo "No TypeScript dev runner found. Attempting to run built JS (node dist/index.js)"
      node dist/index.js
    fi
    ;;

  prod)
    echo "-> Production mode: run migrations and start via pm2 or node"
    run_migrations
    run_seed

    # Prefer pm2 if available
    if command -v pm2 >/dev/null 2>&1; then
      echo "Starting with pm2"
      pm2 start --name stockmaster dist/index.js --watch --update-env
    else
      echo "Starting with plain node (ensure you built the project to dist/)"
      if [ -f "dist/index.js" ]; then
        node dist/index.js
      else
        echo "dist/index.js not found. Build the project (e.g. tsc) before using prod mode." >&2
        exit 1
      fi
    fi
    ;;

  migrate-only)
    echo "-> Running migrations only"
    run_migrations
    run_seed
    echo "Migrations/seed completed. Exiting."
    ;;

  *)
    echo "Unknown mode: $MODE" >&2
    echo "Usage: $0 [dev|prod|migrate-only] [--seed]" >&2
    exit 2
    ;;
esac
