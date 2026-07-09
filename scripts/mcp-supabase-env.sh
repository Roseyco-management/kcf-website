#!/bin/sh
# Wrapper for the supabase MCP server: loads credentials from the local,
# gitignored .env.mcp file (never committed) instead of embedding them in
# the tracked .mcp.json. See CODEX-ESTATE-REVIEW-2026-07-09.md sec 1.1.
set -e
DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$DIR/.env.mcp"
if [ ! -f "$ENV_FILE" ]; then
  echo "mcp-supabase-env.sh: missing $ENV_FILE — copy the SUPABASE_URL / SUPABASE_SERVICE_KEY / SUPABASE_ANON_KEY values in locally (never commit this file)." >&2
  exit 1
fi
set -a
. "$ENV_FILE"
set +a
exec node /Users/baileybarry/.claude/mcp-servers/supabase/index.js "$@"
