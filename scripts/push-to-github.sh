#!/bin/bash
set -e

REPO_URL="https://x-access-token:${GITHUB_PAT}@github.com/info-emanbakery/dispatch-order.git"

git config user.email "replit-agent@replit.com" 2>/dev/null || true
git config user.name "Replit Agent" 2>/dev/null || true

# Remove stale lock files left by Replit's background git process
find .git -name "*.lock" -delete 2>/dev/null || true

git remote set-url origin "$REPO_URL"

BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Pushing branch '${BRANCH}' to GitHub..."

# Try a fast-forward push first; if the remote has diverged (e.g. after a
# rebase), fetch to refresh tracking refs and force-push so GitHub stays in
# sync with Replit's canonical history.
if git push origin "${BRANCH}"; then
  echo "Done — Vercel will pick up the changes shortly."
else
  echo "Fast-forward push rejected; refreshing remote tracking refs and force-pushing..."
  git fetch origin "${BRANCH}" 2>/dev/null || true
  git push --force-with-lease origin "${BRANCH}"
  echo "Done (force-pushed) — Vercel will pick up the changes shortly."
fi
