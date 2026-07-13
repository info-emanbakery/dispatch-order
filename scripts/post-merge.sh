#!/bin/bash
set -e

echo "=== post-merge: installing dependencies ==="
npm install --legacy-peer-deps

echo "=== post-merge: pushing to GitHub ==="
bash scripts/push-to-github.sh
